import { mnemonicToSeedSync } from 'ethereum-cryptography/bip39'
import * as secp from 'ethereum-cryptography/secp256k1'
import { hexToBytes } from 'ethereum-cryptography/utils'
import { HDKey } from 'ethereum-cryptography/hdkey'
import  * as ethers from 'ethers';
import keccak256 from 'keccak256';

import {
    base64ToBytes,
    bytesToBase64,
    toCanonicalJSONBytes
} from '@tendermint/belt';

import {
    encode as bech32Encode,
    toWords as bech32ToWords
} from 'bech32';

import {
    ADDRESS_PREFIX,
    DERIVATION_PATH,
    BROADCAST_MODE_SYNC
} from './constants';

import {
    sha256
} from './hash';


/**
 * Create a {@link Wallet|`Wallet`} from a known mnemonic.
 *
 * @param   mnemonic - BIP39 mnemonic seed
 * @param   password - optional password from {@link https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed|the BIP39 spec}
 * @param   prefix   - Bech32 human readable part, defaulting to {@link ADDRESS_PREFIX|`ADDRESS_PREFIX`}
 * @param   path     - BIP32 derivation path, defaulting to {@link DERIVATION_PATH|`DERIVATION_PATH`}
 *
 * @returns a keypair and address derived from the provided mnemonic
 * @throws  will throw if the provided mnemonic is invalid
 */
export function createWalletFromMnemonic (mnemonic, password, prefix = ADDRESS_PREFIX, path = DERIVATION_PATH) {
    const masterKey = createMasterKeyFromMnemonic(mnemonic, password);

    return createWalletFromMasterKey(masterKey, prefix, path);
}

/**
 * Derive a BIP32 master key from a mnemonic.
 *
 * @param   mnemonic - BIP39 mnemonic seed
 * @param   password - optional password from {@link https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed|the BIP39 spec}
 *
 * @returns BIP32 master key
 * @throws  will throw if the provided mnemonic is invalid
 */
export function createMasterKeyFromMnemonic (mnemonic, password) {
    const seed = mnemonicToSeedSync(mnemonic,  password)
    return HDKey.fromMasterSeed(seed);
}

/**
 * Create a {@link Wallet|`Wallet`} from a BIP32 master key.
 *
 * @param   masterKey - BIP32 master key
 * @param   prefix    - Bech32 human readable part, defaulting to {@link ADDRESS_PREFIX|`ADDRESS_PREFIX`}
 * @param   path      - BIP32 derivation path, defaulting to {@link DERIVATION_PATH|`DERIVATION_PATH`}
 *
 * @returns a keypair and address derived from the provided master key
 */
export function createWalletFromMasterKey (masterKey, prefix = ADDRESS_PREFIX, path = DERIVATION_PATH) {
    const { privateKey, publicKey } = createKeyPairFromMasterKey(masterKey, path);

    const address = createAddress(privateKey, prefix);
    const ethAddress = createEthAddress(privateKey)

    return {
        privateKey,
        publicKey,
        address,
        ethAddress
    };
}

/**
 * Derive a keypair from a BIP32 master key.
 *
 * @param   masterKey - BIP32 master key
 * @param   path      - BIP32 derivation path, defaulting to {@link DERIVATION_PATH|`DERIVATION_PATH`}
 *
 * @returns derived public and private key pair
 * @throws  will throw if a private key cannot be derived
 */
export function createKeyPairFromMasterKey (masterKey, path = DERIVATION_PATH) {
    const { privateKey } = masterKey.derive(path);
    if (!privateKey) {
        throw new Error('could not derive private key');
    }

    const publicKey = secp.getPublicKey(privateKey, true);
    return {
        privateKey,
        publicKey
    };
}

/**
 * Derive a Bech32 address from a public key.
 *
 * @param   privateKey - private key bytes
 * @param   prefix    - Bech32 human readable part, defaulting to {@link ADDRESS_PREFIX|`ADDRESS_PREFIX`}
 *
 * @returns Bech32-encoded address
 */
export function createAddress (privateKey, prefix = ADDRESS_PREFIX) {
    const address = createEthAddress(privateKey)
    const hexTBytesAddress = hexToBytes(address.slice(2))

    const words = bech32ToWords(hexTBytesAddress);

    return bech32Encode(prefix, words);
}

/**
 * create ethAddress.
 * @param   privateKey - private key bytes
*/
export function createEthAddress(privateKey) {
    const wallet = new ethers.Wallet(privateKey);
    return wallet.address
}

/**
 * Sign a transaction.
 *
 * This combines the {@link Tx|`Tx`} and {@link SignMeta|`SignMeta`} into a {@link StdSignMsg|`StdSignMsg`}, signs it,
 * and attaches the signature to the transaction. If the transaction is already signed, the signature will be
 * added to the existing signatures.
 *
 * @param   tx      - transaction (signed or unsigned)
 * @param   meta    - metadata for signing
 * @param   keyPair - public and private key pair (or {@link Wallet|`Wallet`})
 *
 * @returns a signed transaction
 */
export function signTx (tx, meta, keyPair){
    const signMsg    = createSignMsg(tx, meta);
    const signature  = createSignature(signMsg, keyPair);
    const signatures = ('signatures' in tx) ? [...tx.signatures, signature] : [signature];

    return {
        ...tx,
        signatures
    };
}

/**
 * Create a transaction with metadata for signing.
 *
 * @param   tx   - unsigned transaction
 * @param   meta - metadata for signing
 *
 * @returns a transaction with metadata for signing
 */
export function createSignMsg (tx, meta) {
    return {
        account_number: meta.account_number,
        chain_id:       meta.chain_id,
        fee:            tx.fee,
        memo:           tx.memo,
        msgs:           tx.msg,
        sequence:       meta.sequence
    };
}

/**
 * Create a signature from a {@link StdSignMsg|`StdSignMsg`}.
 *
 * @param   signMsg - transaction with metadata for signing
 * @param   keyPair - public and private key pair (or {@link Wallet|`Wallet`})
 *
 * @returns a signature and corresponding public key
 */
export function createSignature (signMsg, { privateKey, publicKey } ) {
    const signatureObj = createSignatureBytes(signMsg, privateKey);
    return {
        signature: bytesToBase64(signatureObj.signature),
        pub_key:   {
            type:  'tendermint/PubKeySecp256k1',
            value: bytesToBase64(publicKey)
        }
    };
}

/**
 * Create signature bytes from a {@link StdSignMsg|`StdSignMsg`}.
 *
 * @param   signMsg    - transaction with metadata for signing
 * @param   privateKey - private key bytes
 *
 * @returns signature bytes
 */
export function createSignatureBytes (signMsg, privateKey) {
    const bytes = toCanonicalJSONBytes(signMsg);

    return sign(bytes, privateKey);
}

/**
 * Sign the sha256 hash of `bytes` with a secp256k1 private key.
 *
 * @param   bytes      - bytes to hash and sign
 * @param   privateKey - private key bytes
 *
 * @returns signed hash of the bytes
 * @throws  will throw if the provided private key is invalid
 */
export function sign (bytes, privateKey) {
    const hash = keccak256(Buffer.from(bytes))
    const [signature] = secp.signSync(hash, Buffer.from(privateKey), {
        recovered: true,
        der: false
    })
    return signature;
}

/**
 * Verify a signed transaction's signatures.
 *
 * @param   tx   - signed transaction
 * @param   meta - metadata for signing
 *
 * @returns `true` if all signatures are valid and match, `false` otherwise or if no signatures were provided
 */
export function verifyTx (tx, meta) {
    const signMsg = createSignMsg(tx, meta);

    return verifySignatures(signMsg, tx.signatures);
}

/**
 * Verify a {@link StdSignMsg|`StdSignMsg`} against multiple {@link StdSignature|`StdSignature`}s.
 *
 * @param   signMsg    - transaction with metadata for signing
 * @param   signatures - signatures
 *
 * @returns `true` if all signatures are valid and match, `false` otherwise or if no signatures were provided
 */
export function verifySignatures (signMsg, signatures) {
    if (signatures.length > 0) {
        return signatures.every(function (signature) {
            return verifySignature(signMsg, signature);
        });
    }
    else {
        return false;
    }
}

/**
 * Verify a {@link StdSignMsg|`StdSignMsg`} against a {@link StdSignature|`StdSignature`}.
 *
 * @param   signMsg   - transaction with metadata for signing
 * @param   signature - signature
 *
 * @returns `true` if the signature is valid and matches, `false` otherwise
 */
export function verifySignature (signMsg, signature) {
    const signatureBytes = base64ToBytes(signature.signature);
    const publicKey      = base64ToBytes(signature.pub_key.value);

    return verifySignatureBytes(signMsg, signatureBytes, publicKey);
}

/**
 * Verify a signature against a {@link StdSignMsg|`StdSignMsg`}.
 *
 * @param   signMsg   - transaction with metadata for signing
 * @param   signature - signature bytes
 * @param   publicKey - public key bytes
 *
 * @returns `true` if the signature is valid and matches, `false` otherwise
 */
export function verifySignatureBytes (signMsg, signature, publicKey) {
    const bytes = toCanonicalJSONBytes(signMsg);
    const hash = keccak256(Buffer.from(bytes))

    return secp256k1Verify(hash, Buffer.from(signature), Buffer.from(publicKey));
}

/**
 * Prepare a signed transaction for broadcast.
 *
 * @param   tx   - signed transaction
 * @param   mode - broadcast mode
 *
 * @returns a transaction broadcast
 */
export function createBroadcastTx (tx, mode = BROADCAST_MODE_SYNC) {
    return {
        tx,
        mode
    };
}
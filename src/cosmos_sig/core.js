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
    fromSeed as bip32FromSeed
} from 'bip32';

import { mnemonicToSeedSync as bip39MnemonicToSeed } from 'bip39';

import {
    publicKeyCreate as secp256k1PublicKeyCreate,
    ecdsaSign as secp256k1Sign,
    esdsaVerify as secp256k1Verify
} from 'secp256k1';

import {
    COSMOS_PREFIX,
    COSMOS_PATH,
    BROADCAST_MODE_SYNC
} from './constants';

import {
    ripemd160,
    sha256
} from './hash';


/**
 * Create a {@link Wallet|`Wallet`} from a known mnemonic.
 *
 * @param   mnemonic - BIP39 mnemonic seed
 * @param   password - optional password from {@link https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed|the BIP39 spec}
 * @param   prefix   - Bech32 human readable part, defaulting to {@link COSMOS_PREFIX|`COSMOS_PREFIX`}
 * @param   path     - BIP32 derivation path, defaulting to {@link COSMOS_PATH|`COSMOS_PATH`}
 *
 * @returns a keypair and address derived from the provided mnemonic
 * @throws  will throw if the provided mnemonic is invalid
 */
export function createWalletFromMnemonic (mnemonic, password, prefix = COSMOS_PREFIX, path = COSMOS_PATH) {
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
    const seed = bip39MnemonicToSeed(mnemonic, password);

    return bip32FromSeed(seed);
}

/**
 * Create a {@link Wallet|`Wallet`} from a BIP32 master key.
 *
 * @param   masterKey - BIP32 master key
 * @param   prefix    - Bech32 human readable part, defaulting to {@link COSMOS_PREFIX|`COSMOS_PREFIX`}
 * @param   path      - BIP32 derivation path, defaulting to {@link COSMOS_PATH|`COSMOS_PATH`}
 *
 * @returns a keypair and address derived from the provided master key
 */
export function createWalletFromMasterKey (masterKey, prefix = COSMOS_PREFIX, path = COSMOS_PATH) {
    const { privateKey, publicKey } = createKeyPairFromMasterKey(masterKey, path);

    const address = createAddress(publicKey, prefix);

    return {
        privateKey,
        publicKey,
        address
    };
}

/**
 * Derive a keypair from a BIP32 master key.
 *
 * @param   masterKey - BIP32 master key
 * @param   path      - BIP32 derivation path, defaulting to {@link COSMOS_PATH|`COSMOS_PATH`}
 *
 * @returns derived public and private key pair
 * @throws  will throw if a private key cannot be derived
 */
export function createKeyPairFromMasterKey (masterKey, path = COSMOS_PATH) {
    const { privateKey } = masterKey.derivePath(path);
    if (!privateKey) {
        throw new Error('could not derive private key');
    }

    const publicKey = secp256k1PublicKeyCreate(privateKey, true);

    return {
        privateKey,
        publicKey
    };
}

/**
 * Derive a Bech32 address from a public key.
 *
 * @param   publicKey - public key bytes
 * @param   prefix    - Bech32 human readable part, defaulting to {@link COSMOS_PREFIX|`COSMOS_PREFIX`}
 *
 * @returns Bech32-encoded address
 */
export function createAddress (publicKey, prefix = COSMOS_PREFIX) {
    const hash1 = sha256(publicKey);
    const hash2 = ripemd160(hash1);
    const words = bech32ToWords(hash2);

    return bech32Encode(prefix, words);
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
    const hash = sha256(bytes);
    const signature  = secp256k1Sign(hash, Buffer.from(privateKey));
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
    const hash  = sha256(bytes);

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

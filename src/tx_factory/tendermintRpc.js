
// import axios from 'axios'
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import * as crypto from '@cosmjs/crypto'
import * as amino from '@cosmjs/amino'
import * as encoding from "@cosmjs/encoding";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx.js";
import { encodeSecp256k1Pubkey } from "@cosmjs/amino";
import { encodePubkey } from "./pubkey.js"
import { Int53 } from "@cosmjs/math";
import { restGet } from '../../src/rest_lib.js'
import {
    makeAuthInfoBytes,
    makeSignDoc,
    makeSignBytes
} from "@cosmjs/proto-signing";
import {
    defaultRegistryTypes as defaultStargateTypes,
} from '@cosmjs/stargate'

import { Registry } from "@cosmjs/proto-signing";

const myRegistry = new Registry(defaultStargateTypes);

export function registryMessageType(url, value) {
    myRegistry.register(url, value)
}


export async function connectTendermint34(url) {
    return await Tendermint34Client.connect(url)
}

export async function signAndBroadcast(fee, message, { privateKey, publicKey, address, chainNode }) {
    const txRaw = await sign(fee, message, { privateKey, publicKey, address, chainNode })
    const txBytes = TxRaw.encode(txRaw).finish()
    return txBytes
}

async function getAccount(address) {
    var account = await restGet(`/dbchain/get_accounts/${address}`)
    return account.data.result
}

async function sign(fee, message, { privateKey, publicKey, address, chainNode }) {

    const pubkey = encodePubkey(encodeSecp256k1Pubkey(new Uint8Array(publicKey)));

    const txBodyEncodeObject = {
        typeUrl: "/cosmos.tx.v1beta1.TxBody",
        value: {
            messages: message,
            memo: "chain_id:" + chainNode,
        },
    };
    const signerData = await getAccount(address)
    const txBodyBytes = myRegistry.encode(txBodyEncodeObject);
    const gasLimit = Int53.fromString(fee.gas).toNumber();

    const authInfoBytes = makeAuthInfoBytes([{ pubkey, sequence: signerData.sequence }], fee.amount, gasLimit);
    const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainNode, signerData.account_number);
    const { signature, signed } = await signDirect(signDoc, { privateKey, publicKey });
    return TxRaw.fromPartial({
        bodyBytes: signed.bodyBytes,
        authInfoBytes: signed.authInfoBytes,
        signatures: [encoding.fromBase64(signature.signature)],
    });


}

function encodeSecp256k1Signature(pubkey, signature) {
    if (signature.length !== 64 && signature.length !== 65) {
        throw new Error("Signature must be 64 bytes long. Cosmos SDK uses a 2x32 byte and 65 byte fixed length encoding for the secp256k1 signature integers r and s.");
    }
    return {
        pub_key: amino.encodeSecp256k1Pubkey(pubkey),
        signature: encoding.toBase64(signature),
    };
}

async function signDirect(signDoc, { privateKey, publicKey }) {
    const privkey = privateKey
    const pubkey = publicKey
    const signBytes = makeSignBytes(signDoc);

    const hashedMessage = crypto.keccak256(signBytes);
    const signature = await crypto.Secp256k1.createSignature(hashedMessage, privkey);

    const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32), 1]);

    const stdSignature = encodeSecp256k1Signature(pubkey, signatureBytes)
    return {
        signed: signDoc,
        signature: stdSignature,
    };

}

export async function queryTransactionApi(transactionId) {
    let tmClient = null;
    try {
      tmClient = window.TmClient
    } catch(e) {
      tmClient = global.TmClient
    }
    return await tmClient.txSearchAll({ query: `tx.hash='${transactionId}'` })
}



// import axios from 'axios'
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import * as crypto from '@cosmjs/crypto'
import * as amino from '@cosmjs/amino'
import * as encoding from "@cosmjs/encoding";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";

import { encodeSecp256k1Pubkey } from "@cosmjs/amino";
import { encodePubkey } from "./pubkey"
import { Int53 } from "@cosmjs/math";
import { toHex } from "@cosmjs/encoding";
import { restGet } from '../../src/rest_lib'

import {
    makeAuthInfoBytes,
    makeSignDoc,
    makeSignBytes
} from "@cosmjs/proto-signing";

import {
    defaultRegistryTypes as defaultStargateTypes,
} from '@cosmjs/stargate'

import { Registry } from "@cosmjs/proto-signing";

import { MsgCreateApplication } from "../../protoc/output/msgs_application"
import { getAddress } from '../../index.js'
import { getPrivKey, getPubKey } from '../../src/key_manager'

const myRegistry = new Registry(defaultStargateTypes);
myRegistry.register("/dbchain.msgs.MsgCreateApplication", MsgCreateApplication);

const myAddress = getAddress()

export const chainNode = 'ethermint_9000-1'

async function connectTendermint34(url) {
    const tmClient = await Tendermint34Client.connect("192.168.0.19:36657")
    return tmClient
}

async function signAndBroadcast(signerAddress, messages, fee, memo) {
    const txRaw = await sign(signerAddress)
    const txBytes = TxRaw.encode(txRaw).finish()
    return txBytes
}
async function getAccount(address) {
    var account = await restGet(`/dbchain/get_accounts/${address}`)
    return account.data.result
}

async function sign(signerAddress, memo) {

    const message = {
        typeUrl: "/dbchain.msgs.MsgCreateApplication", // Same as above
        value: MsgCreateApplication.fromPartial({
            owner: signerAddress,
            name: "db",
            description: "ZGI=",
            permissionRequired: false
        })
    };
    console.log(myRegistry);

    const fee = {
        amount: [
            {
                denom: "aphoton",
                amount: "100000",
            },
        ],
        gas: "100000",
    };

    const publicKey = new Uint8Array(getPubKey())

    const pubkey = encodePubkey(encodeSecp256k1Pubkey(publicKey));

    const txBodyEncodeObject = {
        typeUrl: "/cosmos.tx.v1beta1.TxBody",
        value: {
            messages: [message],
            memo: "",
        },
    };
    const signerData = await getAccount(signerAddress)
    console.log(txBodyEncodeObject);

    const txBodyBytes = myRegistry.encode(txBodyEncodeObject);

    const gasLimit = Int53.fromString(fee.gas).toNumber();

    const authInfoBytes = makeAuthInfoBytes([{ pubkey, sequence: signerData.sequence }], fee.amount, gasLimit);

    const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainNode, signerData.account_number);

    const { signature, signed } = await signDirect(signDoc);

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

async function signDirect(signDoc) {
    const privkey = getPrivKey()
    const pubkey = getPubKey()
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



async function queryTransactionApi(transactionId, tmClient) {

    const txResult = await tmClient.txSearchAll({ query: `tx.hash='${transactionId}'` })
    console.log(txResult);
    return txResult.txs.map((tx) => {
        return {
            height: tx.height,
            hash: toHex(tx.hash).toUpperCase(),
            code: tx.result.code,
            rawLog: tx.result.log || "",
            tx: tx.tx,
            gasUsed: tx.result.gasUsed,
            gasWanted: tx.result.gasWanted,
            tx_result: tx.result.tx_result
        };
    });
}

document.querySelector('#txId').addEventListener('click', async () => {
    const tmClient = await connectTendermint34()
    const tx = await signAndBroadcast(myAddress)
    console.log(tx);
    tmClient.broadcastTxSync({ tx }).then(result => {
        setTimeout(async () => {
            const transactionId = toHex(result.hash).toUpperCase();
            const queryResult = await queryTransactionApi(transactionId, tmClient)
            console.log(queryResult);
        }, 4000)
    })
})


// tendermintClient
import { createAndStoreKey, getAppCode, savePassphrase, detectChain, createAccessToken, getAccount, getAddress, addExtraMsgConstructors, signAndBroadcast as dbchainSignAndBroadcast } from "../index"
import { getLocalStorage, getSessionStorage } from './utils'
import { mnemonic, password, chainUrl, chainNode } from "./config";
import { connectTendermint34, registryMessageType, signAndBroadcast, queryTransactionApi } from "../src/tx_factory/tendermintRpc"
import { MsgCreateApplication } from "../protoc/output/msgs_application"
import { toHex } from "@cosmjs/encoding";
import { createApplication, createTable, setDatabasePermission } from "../custom/res_client"
import * as extraMsgConstructors from "../custom/extra_messages";

addExtraMsgConstructors(extraMsgConstructors)
import "./requestRPC"

const createWalletID = document.getElementById('createWallet')

createWalletID.addEventListener('click', () => {
    createAndStoreKey(mnemonic, password)
    const wallet = getLocalStorage('dbchainwallet')
    const walletTable = {
        "公钥🔑": { value: wallet[1] },
        "eth地址": { value: wallet[2] },
        "以太坊地址": { value: wallet[3] }
    };
    console.table(walletTable);
}, false)

const savePassphraseId = document.getElementById('savePassphraseId')
savePassphraseId.addEventListener('click', () => {
    savePassphrase(password)
    const passowrd = getSessionStorage('passphrase')
    const passphrase = {
        "密码": { value: passowrd },

    };
    console.table(passphrase);
}, false)

const detectChainId = document.getElementById('detectChainId')
detectChainId.addEventListener('click', () => {
    detectChain(chainUrl, chainNode).then(res => {
        console.log(res);
        if (res.status) {
            console.log('连接成功');
        }
    }, (err) => console.log(err))
}, false)

const createAccessTokenId = document.getElementById('createAccessTokenId')

createAccessTokenId.addEventListener('click', () => {
    const accessToken = createAccessToken()
    console.log('accessToken:', accessToken);
}, false)


document.getElementById('txProId').addEventListener('click', async () => {
    const tmClient = await connectTendermint34('192.168.0.19:36657')
    registryMessageType('/dbchain.msgs.MsgCreateApplication', MsgCreateApplication)
    const address = getAddress()
    const message = {
        messageTypeUrl: "/dbchain.msgs.MsgCreateApplication",
        messageValue: {
            owner: address,
            name: "db",
            description: "ZGI=",
            permissionRequired: false
        },
        memo: "",
        messageProtoBuf: MsgCreateApplication
    }
    const tx = await signAndBroadcast(address, message)
    const result = await tmClient.broadcastTxAsync({ tx })
    const transactionId = toHex(result.hash).toUpperCase();
    setTimeout(() => {
        queryTransactionApi(transactionId, tmClient).then(res => {
            console.log(res);
        })
    }, 4000)
})

document.getElementById('sendTranId').addEventListener('click', async () => {
    createApplication("db", "db", false, (res) => {
        console.log(res);
    })
})
document.getElementById('craeteTableTx').addEventListener('click', async () => {
    const appCode = await getAppCode()
    createTable(appCode[0], "tabless", (res) => {
        console.log(res);
    })
})
document.getElementById('tableAuthId').addEventListener('click', async () => {
    const appCode = await getAppCode()
    setDatabasePermission(appCode[0], "unrequired", (res => {
        console.log(res);
    }))
})
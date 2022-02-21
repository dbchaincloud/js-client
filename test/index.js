import { createAndStoreKey, savePassphrase, detectChain, createAccessToken, getAccount, getAddress, addExtraMsgConstructors, signAndBroadcast } from "../index"
import { getLocalStorage, getSessionStorage } from './utils'
import { mnemonic, password, chainUrl, chainNode } from "./config";

import * as extraMsgConstructors from "../custom/extra_messages";
// 导入自定义函数
addExtraMsgConstructors(extraMsgConstructors);

// import { createDataBaseTx } from "./tx"


import "./requestRPC"



document.getElementById('txProId').addEventListener("click", async () => {
    const tmClient = await connectTendermint34("192.168.0.19:36657")
    registryMessageType("/dbchain.msgs.MsgCreateApplication", MsgCreateApplication)

    const address = getAddress()

    const messageClass = {
        messageTypeUrl: "/dbchain.msgs.MsgCreateApplication",
        memo: "",
        messageValue: {
            owner: address,
            name: "db",
            description: "ZGI=",
            permissionRequired: false
        },
        messageProtoBuf: MsgCreateApplication
    }
    const tx = await signAndBroadcast(address, messageClass)
    console.log(tx);
    tmClient.broadcastTxAsync({ tx }).then(res => {
        console.log(res);
    })
})

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

//获取用户信息
document.getElementById('getAccountId').addEventListener('click', () => {
    const address = getAddress()
    console.log('test getAddress function:', address);
    getAccount(address).then(res => {
        console.log(res);
    })
})

// signAndBroadcast

document.getElementById('createDataBaseId').addEventListener('click', () => {
    const dbName = "TestDbName";
    const dbDesc = "TestDbDesc";
    signAndBroadcast("MsgCreateApplication",
        {
            name: dbName,
            description: dbDesc,
            permissionRequired: true,
        },
        (res) => console.log(res)
    )
    // createDataBaseTx(dbName, dbDesc)
})

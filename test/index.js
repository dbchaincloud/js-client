import { createAndStoreKey, savePassphrase, detectChain, createAccessToken } from "../index"
import { getLocalStorage, getSessionStorage } from './utils'
const mnemonic = 'fence weapon anchor pony mountain float later castle loop tragic embark outdoor'
const password = '773387501long'
const chainUrl = 'http://192.168.0.19:3001/relay'
const chainNode = 'ethermint_9000-1'

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




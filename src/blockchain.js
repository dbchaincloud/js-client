import Factory from './tx_factory'
import {getPrivKey, getPubKey, getAddress} from "./key_manager"

const chainIdKey = "dbchain_chain_id";
const defaultChainId = "testnet";
var chainId = null

var ExtraMsgConstructors = []
var LazyFactory = null
var MsgQueue = []
var Mutex = true

function setChainId(id) {
    localStorage.setItem(chainIdKey, id)
    chainId = id
}

function getChainId() {
    if (chainId != null) {
        return chainId
    }
    chainId = localStorage.getItem(chainIdKey) || defaultChainId
    return chainId
}

function addExtraMsgConstructors(module) {
    ExtraMsgConstructors = ExtraMsgConstructors.concat(Object.entries(module))
}

function getWallet() {
    var privateKey = getPrivKey()
    var publicKey  = getPubKey()
    var address    = getAddress()

    return {privateKey, publicKey, address}
}

async function work() {
    var job = MsgQueue.shift()
    while (job != null) {
        try {
            await realSignAndBroadcast(...job.msg)
        } catch(e) {
            console.log("Aocheesh")
        }
        job = MsgQueue.shift()
    }
}

async function startWorking() {
    // js is single-threaded, so this Mutex lock should work fine
    if(Mutex) {
        Mutex = false
        await work()
        Mutex = true
    } else {
        console.log("Another worker is still working. I'll wait in queue.")
    }
}

function signAndBroadcast(msgName, args, callback) {
    let msg = {msg: [msgName, args, callback]}
    MsgQueue.push(msg)
    // trigger the worker to act
    startWorking()
}

async function realSignAndBroadcast(msgName, args, callback) {
  if(LazyFactory == null) {
      LazyFactory = new Factory(getChainId(), getWallet(), ExtraMsgConstructors)
  }
  var msg = LazyFactory[msgName](args)
  var included = await msg.send()
  if(callback != null) { callback(included) }
}

export { signAndBroadcast, addExtraMsgConstructors, getChainId, setChainId }

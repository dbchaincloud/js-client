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

function resetLazyFactory(){
    LazyFactory=null;
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
    var batch = []
    while (job != null) {
        batch.push(job)

        let callback = job.msg[2]
        if (typeof(callback) == "function" || (typeof(callback) == "boolean" && callback)) {
            try {
                await realSignAndBroadcast(batch)
            } catch(e) {
                console.log("Aocheesh: ", e)
            }
            batch = []
        }
        job = MsgQueue.shift()
    }
    // just in case the last batch is not empty
    if (batch.length > 0) {
        try {
            await realSignAndBroadcast(batch)
        } catch(e) {
            console.log("Aocheesh: ", e)
        }
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

// when callback is a function or the true value of boolean,
// we trigger the worker to act
function signAndBroadcast(msgName, args, callback) {
    let msg = {msg: [msgName, args, callback]}
    MsgQueue.push(msg)
    if (typeof(callback) == "function" || (typeof(callback) == "boolean" && callback)) {
        startWorking()
    }
}

async function realSignAndBroadcast(batch) { //msgName, args, callback) {
    if(LazyFactory == null) {
        LazyFactory = new Factory(getChainId(), getWallet(), ExtraMsgConstructors)
    }
    let callback = null
    let msgs = []
    batch.forEach(function(job) {
        let [msgName, args, clbk] = job.msg
        callback = clbk
        if(msgName) {
            msgs.push(LazyFactory[msgName](args))
        }
    })
    let included = await LazyFactory.send(msgs.map(x => x.message))
    if(typeof(callback) == "function") { callback(included) }
}

export { signAndBroadcast, addExtraMsgConstructors, getChainId, setChainId, resetLazyFactory}

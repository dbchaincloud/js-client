import * as MessageConstructors from './messages'
import { getBaseUrl, restGet, restPost } from '../rest_lib'
import { signAndBroadcast, queryTransactionApi } from "./tendermintRpc"
import { toHex } from "@cosmjs/encoding";
import axios from 'axios'

let cosmosMsgType = [
  'cosmos-sdk/MsgSend',
]

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleep(fn, ...args) {
  await timeout(1000);
  return await fn(...args);
}

async function txIncludedInBlock(txHash, isQueryCosmosMsgType) {
  const txResult =  await queryTransactionApi(txHash)
  if(txResult.txs.length === 0 && txResult.txs.total_count !== Number(0)){
    return false
  }else{
    return txResult.txs.map((tx) => {
        return {
              height: tx.height,
              hash: toHex(tx.hash).toUpperCase(),
              code: tx.result.code,
              rawLog: tx.result.log || "",
              tx: tx.tx,
              gasUsed: tx.result.gasUsed,
              gasWanted: tx.result.gasWanted,
              
          };
      });
  }
}

async function queryTxInclusion (txHash, iterations = 15, isQueryCosmosMsgType = false) {
  let included = await txIncludedInBlock(txHash, isQueryCosmosMsgType)
  if(typeof(included)=='object'){
    return included;
  }
  if (included) {
    return true
  }

  var result = false
  iterations --
  if (iterations > 0) {
    result = await sleep(await queryTxInclusion, txHash, iterations, isQueryCosmosMsgType)
  }
  return result
}

export default class Factory {
  constructor (chainId, fromWallet, extraMsgConstructorList=[]) {
    this.chainId     = chainId
    this.fromWallet = fromWallet

    Object.entries(MessageConstructors).concat(extraMsgConstructorList)
      .forEach(([name, messageConstructor]) => {
        this[name] = function (args) {
          const senderAddress = this.fromWallet.address
          const message = messageConstructor(senderAddress, args)

          return {
            message,
            send: () => this.send([message])
          }
        }
      })
  }
  
  objectHumpToLine(obj) {
    var newObj = new Object()
    for (let key in obj) {
        newObj[key.replace(/([A-Z])/g, "_$1").toLowerCase()] = obj[key]
    }
    return newObj
  }

  async calculateGas(messages){
    const url = getBaseUrl() + "/dbchain/calculate_gas"
    const objectHumpToLineMessage = messages.map(v =>(
      v.typeUrl !== '/dbchain.msgs.MsgCreateApplication' ? {...v,value:this.objectHumpToLine(v.value)} : {...v}
      ))
    const jsonMessage = JSON.stringify(objectHumpToLineMessage)
    return await axios.post(url,jsonMessage)
  }
  
  async send(messages) {
    const calculateResult = await this.calculateGas(messages)
    const { adjust_gas , minigas_prices } = calculateResult.data.result
    
    const amount = adjust_gas * 1.3 * Number(minigas_prices.split('.')[0])
    const fee = {
      amount: [
        {
          denom: "adbctoken",
          amount: String(parseInt(amount)),
        },
      ],
      gas: String(adjust_gas),
    };
    const wallet = {
      privateKey: this.fromWallet.privateKey,
      publicKey: this.fromWallet.publicKey,
      address: this.fromWallet.address,
      chainNode: this.chainId
    }
   
    const broadcastBody = await signAndBroadcast(fee, messages, wallet)
    const response = await restPost("/txs", broadcastBody)
    if(response.code !== 0){
      throw new Error(response.log)
    }
    const transactionId = toHex(response.hash).toUpperCase();

    const included = await queryTxInclusion(transactionId, 15, isQueryCosmosMsgType(messages))
    if(included[0].code !== 0){
      throw new Error(included[0].rawLog)
    }
    return included
  }
}

function isQueryCosmosMsgType(messages) {
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (cosmosMsgType.indexOf(msg.type) !== -1) return true
  }
  return false
}

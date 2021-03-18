import { signTx } from "../cosmos_sig/index"
import * as MessageConstructors from './messages'
import { restGet, restPost } from '../rest_lib'
import {uriBuilder } from "../rest_client"

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleep(fn, ...args) {
    await timeout(1000);
    return await fn(...args);
}

async function txIncludedInBlock(txHash) {
  try {
    var uri = uriBuilder("tx-simple-result",  txHash);
    let response = await restGet(uri)
    if (response.data.result.state=='success') {
      return true
    }
    if (response.data.result.state=='fail') {
      return response
    }
     else {
      return false
    }
  } catch(err) {
    return false
  }
}

async function queryTxInclusion (txHash, iterations = 15) {
  let included  = await txIncludedInBlock(txHash)
  if(typeof(included)=='object'){
    return included;
  }
  if (included) {
    return true
  }

  var result = false
  iterations --
  if (iterations > 0) {
    result = await sleep(await queryTxInclusion, txHash, iterations)
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

  async getAccount() {
    var account = await restGet(`/auth/accounts/${this.fromWallet.address}`)
    return account.data.result.value
  } 

  async send(messages) {
    var tx = {
      fee: {
        amount: [],
        gas:    '99999999'
      },
      memo: '',
      msg: messages
    };

    var account = await this.getAccount()

    const signMeta = {
      chain_id:       this.chainId,
      account_number: "" + account.account_number,
      sequence:       "" + account.sequence
    }

    const signedTx = signTx(tx, signMeta, {privateKey: this.fromWallet.privateKey, publicKey: this.fromWallet.publicKey})

    var broadcastBody = JSON.stringify({
      tx: signedTx,
      mode: 'async'
    })
  
    var response = await restPost("/txs", broadcastBody)
    var txHash = response.data.txhash
    var included = await queryTxInclusion(txHash)
    return included
  }
}


import { signTx } from "@tendermint/sig"
import * as MessageConstructors from './messages'
import { restGet, restPost } from '../rest_lib'

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleep(fn, ...args) {
    await timeout(1000);
    return await fn(...args);
}

async function txIncludedInBlock(txHash) {
  try {
    let response = await restGet(`/txs/${txHash}`)
    if (response.status >= 200 && response.status < 300) {
      return true
    } else {
      return false
    }
  } catch(err) {
    return false
  }
}

async function queryTxInclusion (txHash, iterations = 15) {
  let included  = await txIncludedInBlock(txHash)
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
  constructor (chainId, fromWallet, extraMsgConstructors=[]) {
    this.chainId     = chainId
    this.fromWallet = fromWallet

    Object.entries(MessageConstructors).concat(Object.entries(extraMsgConstructors))
      .forEach(([name, messageConstructor]) => {
        this[name] = function (args) {
          const senderAddress = this.fromWallet.address
          const message = messageConstructor(senderAddress, args)

          return {
            message,
            send: () => this.send(message)
          }
        }
      })
  }

  async getAccount() {
    var account = await restGet(`/auth/accounts/${this.fromWallet.address}`)
    return account.data.result.value
  } 

  async send(message) {
    var tx = {
      fee: {
        amount: [{amount:'1', denom:"dbctoken"}],
        gas:    '200000'
      },
      memo: '',
      msg: [ message ]
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


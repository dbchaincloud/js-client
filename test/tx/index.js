import { getChainId, getWallet, signTx, restPost } from '../index'

export async function getAccounts(address) {
    var account = await restGet(`/bank/balances/${address}`)
    console.log(account);
    return account.data.result.value
}

export const createDataBaseTx = async ({ dbName, dbDesc, account_number, sequence }) => {

    const chainId = getChainId()
    const wallet = getWallet()

    var tx = {
        fee: {
            amount: [],
            gas: '99999999'
        },
        memo: '',
        msg:
        {
            type: "dbchain/CreateApplication",
            value: {
                "name": dbName,
                "description": dbDesc,
                "permission_required": false,
                "owner": wallet.address
            }
        }
    }

    const signMeta = {
        chain_id: chainId,
        account_number: "" + account_number,
        sequence: "" + sequence
    }
    const signedTx = signTx(tx, signMeta, { privateKey: wallet.privateKey, publicKey: wallet.publicKey })
    var broadcastBody = JSON.stringify({
        tx: signedTx,
        mode: 'async'
    })
    var response = await restPost("/txs", broadcastBody)
    console.log(response);

}
const CID = require('cids')
import { setChainId, getChainId } from './blockchain';
import { getBaseUrl, setBaseUrl } from './rest_lib';
import { checkChainId} from "./rest_client"
/**
 * Add a method to validate the 'CID' format, only the format, not the presence in the database
 * @param {String} cid 
 * @returns {Boolean} 
 */
function validateCID(cid) {
    let obj;
    try {
        obj = new CID(cid);
    } catch (error) {
        return false;//return console.log('无效地址，请检查')
    }
    return true;
}

/**
 * Determine if the chain address and chain ID are accessible
 * @param {Sring} url The default is an existing URL, which can be passed in for the new link you want to access
 * @param {String} chainId  The default is an existing chainId, passing in the chainId of the new chain you want to access
 * @returns {boolean} Returns whether your address is accessible.  True or False
 */
async function detectChain(url = getBaseUrl(), chainId = getChainId()) {
    let oldUrl = getBaseUrl();
    let oldChainId = getChainId();
    setBaseUrl(url)
    setChainId(chainId)
    function resetBase() {
        setBaseUrl(oldUrl)
        setChainId(oldChainId)
    }
    try {
        let isChainId = await checkChainId(chainId);
        if (isChainId == undefined) {
            resetBase()
            return { status: false, content: '当前访参无法访问，请检查访参' };
        }
        if (!isChainId) {
            resetBase()
            return { status: false, content: '当前chainId与访参不对应，请检查' }
        };
        return { status: true, content: '' };
    } catch (error) {
        resetBase()
        return { status: false, content: '当前访参无法访问，请检查' };
    }
}

export { validateCID, detectChain };
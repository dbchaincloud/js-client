const CID = require('cids')
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

export { validateCID };
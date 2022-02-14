import { sign } from "./ethdbchain_sig/index"
import { getPrivKey, getPubKey } from "./key_manager";
import bs58 from 'bs58'


function signForToken(str) {
  var privKey = getPrivKey();
  var pubKey = getPubKey();

  var signature = sign(str, privKey);
  var encodedPubKey = bs58.encode(pubKey)
  var encodedSig = bs58.encode(signature)
  var result = `${encodedPubKey}:${str}:${encodedSig}`
  return result;
}

function createAccessToken() {
  var time = "" + Date.now();
  var result = signForToken(time)
  return result
}

export { createAccessToken };

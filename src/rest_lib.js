import axios from 'axios';
import { connectTendermint34 } from "./tx_factory/tendermintRpc.js";
import { getChainId } from './blockchain.js';
const baseUrlKey = "dbchain_base_url";
const defaultBaseUrl = "/relay";
var baseUrl = null;

function setBaseUrl(url) {
  try {
    localStorage.setItem(baseUrlKey, url);
  } catch(e) {
    // do nothing, we're in node env
  }
  baseUrl = url;
}

function getBaseUrl() {
  if (baseUrl != null) {
    return baseUrl;
  }

  try {
    baseUrl = localStorage.getItem(baseUrlKey) || defaultBaseUrl;
  } catch(e) {
    // do nothing, we're in node env
  }
  return baseUrl;
}

function getIpfsUrl(cid) {
  var url = getBaseUrl();
  if (url.slice(-1) == '/') {
    url = url + "ipfs/";
  } else {
    url = url + "/ipfs/";
  }
  return url + cid;
}

function httpConversionWs(url){
  let parts = url.split("://");
  let protocol = parts[0].toLowerCase();

  const wsProtocol = (protocol == 'https:')? "wss://" : "ws://";
  return wsProtocol + url.split('//')[1].split("/")[0];
}

async function restGet(url) {
  let chainID = getChainId();
  return await axios.get(getBaseUrl() + url, {
    headers: {
      'X-DBC-ChainID': chainID
    }
  });
}

async function restPost(url, data, config) {
  try {
    if(!window.TmClient){
      let baseUrl = getBaseUrl();
      const TmClient = await connectTendermint34(httpConversionWs(baseUrl));
      window.TmClient = TmClient;
    }
    return await window.TmClient.broadcastTxSync({tx:data});
  } catch(e) {
    if(!global.TmClient){
      let baseUrl = getBaseUrl();
      const TmClient = await connectTendermint34(httpConversionWs(baseUrl));
      global.TmClient = TmClient;
    }
    return await global.TmClient.broadcastTxSync({tx:data});
  }
}

async function uploadToIpfs(url, data, config){
  return await axios.post(getBaseUrl() + url, data, config);
}

export { getBaseUrl, setBaseUrl, getIpfsUrl, restGet, restPost, uploadToIpfs }

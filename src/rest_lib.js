import axios from 'axios'
import { connectTendermint34 } from "./tx_factory/tendermintRpc"
const baseUrlKey = "dbchain_base_url";
const defaultBaseUrl = "/relay";
var baseUrl = null;

function setBaseUrl(url) {
  localStorage.setItem(baseUrlKey, url)
  baseUrl = url
}

function getBaseUrl() {
  if (baseUrl != null) {
    return baseUrl
  }
  baseUrl = localStorage.getItem(baseUrlKey) || defaultBaseUrl
  return baseUrl
}

function getIpfsUrl(cid) {
  var url = getBaseUrl()
  if (url.slice(-1) == '/') {
    url = url + "ipfs/"
  } else {
    url = url + "/ipfs/"
  }
  return url + cid
}

function httpConversionWs(url){
    return "ws://"+ url.split('//')[1].split("/")[0]
}

async function restGet(url) {
  return await axios.get(getBaseUrl() + url)
}

async function restPost(url, data, config) {
  if(!window.TmClient){
   const baseUrl = getBaseUrl()
   const TmClient = await connectTendermint34(httpConversionWs(baseUrl))
   window.TmClient = TmClient
  }
  return await window.TmClient.broadcastTxSync({tx:data})
}

export { getBaseUrl, setBaseUrl, getIpfsUrl, restGet, restPost }

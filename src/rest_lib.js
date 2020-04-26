const axios = require('axios').default;

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

async function restGet(url) {
  return await axios.get(getBaseUrl() + url)
}

async function restPost(url, data, config) {
  return await axios.post(getBaseUrl() + url, data, config)
}

export { getBaseUrl, setBaseUrl, getIpfsUrl, restGet, restPost }

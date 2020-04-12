const axios = require('axios').default;

const baseUrlKey = "dbchan_base_url";
const defaultBaseUrl = "https://testnet.dbchain.cloud/relay";
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

async function restGet(url) {
  return await axios.get(getBaseUrl() + url)
}

async function restPost(url, data, config) {
  return await axios.post(getBaseUrl() + url, data, config)
}

export { getBaseUrl, setBaseUrl, restGet, restPost }

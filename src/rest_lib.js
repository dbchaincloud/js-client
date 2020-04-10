const axios = require('axios').default;
var baseUrl = "/relay"

function setBaseUrl(url) {
  baseUrl = url
}

async function restGet(url) {
  return await axios.get(baseUrl + url)
}

async function restPost(url, data, config) {
  return await axios.post(baseUrl + url, data, config)
}

export { setBaseUrl, restGet, restPost }

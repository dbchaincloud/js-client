const axios = require('axios').default;
const baseUrl = "/relay"

async function restGet(url) {
  return await axios.get(baseUrl + url)
}

async function restPost(url, data, config) {
  return await axios.post(baseUrl + url, data, config)
}

export { restGet, restPost }

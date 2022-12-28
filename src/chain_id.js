const chainIdKey = "dbchain_chain_id";
const defaultChainId = "testnet";
var chainId = null

function setChainId(id) {
  try {
    localStorage.setItem(chainIdKey, id)
  } catch(e) {
    // do nothing, we're in node env
  }
  chainId = id
}

function getChainId() {
  if (chainId != null) {
    return chainId
  }
  try {
    chainId = localStorage.getItem(chainIdKey) || defaultChainId
  } catch(e) {
    // we're in node env
    chainId = defaultChainId
  }
  return chainId
}

export { getChainId, setChainId }

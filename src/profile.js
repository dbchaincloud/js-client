import { getAddress } from './key_manager'
import { getFriendName } from './friends'

const nameKey = "profile:name"

function setMyName(newName) {
  localStorage.setItem(nameKey, newName)
} 

function getMyName() {
  var name = localStorage.getItem(nameKey)
  if (name == null) {
    var myAddress = getAddress()
    name = getFriendName(myAddress)
    if (name != null) {
      setMyName(name)
    }
  }
  return name || ""
}

export { setMyName, getMyName }

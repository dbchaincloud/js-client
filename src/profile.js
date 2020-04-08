const nameKey = "profile:name"

function setMyName(newName) {
  localStorage.setItem(nameKey, newName)
} 

function getMyName() {
  var name = localStorage.getItem(nameKey)
  return name || ""
}

export { setMyName, getMyName }

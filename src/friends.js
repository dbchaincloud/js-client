const friendsKey = 'friends'
const friendNameKeyBase = 'friend_name'

function getFriendNameKey(address) {
    return `${friendNameKeyBase}:${address}`
}

function saveFriends(friends) {
    let friendsString = JSON.stringify(friends)
    localStorage.setItem(friendsKey, friendsString)
}

function saveFriendName(address, name) {
    let key = getFriendNameKey(address)
    localStorage.setItem(key, name)
}

function getLocalFriends() {
    let friendsString = localStorage.getItem(friendsKey)
    if(friendsString == null) { return [] }
    return JSON.parse(friendsString)
}

function getLocalFriendName(address) {
    let key = getFriendNameKey(address)
    let result = localStorage.getItem(key)
    return result
}

function removeFriendName(address) {
    let key = getFriendNameKey(address)
    return localStorage.removeItem(key)
}

function addLocalFriend(address, name="unknow") {
    let friends = getLocalFriends()
    if(friends.includes(address)) { return }
    friends.push(address)
    saveFriends(friends)
    saveFriendName(address, name)    
}

function removeLocalFriend(address) {
    removeFriendName(address)
    let friends = getLocalFriends()
    let index = friends.indexOf(address)
    if(index > -1) {
        friends.splice(index, 1)
    }
    saveFriends(friends)
}

export {getLocalFriends, getLocalFriendName, addLocalFriend, removeLocalFriend}

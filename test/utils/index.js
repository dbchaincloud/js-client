export const getLocalStorage = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key))

    } catch (error) {
        return null
    }
}
export const getSessionStorage = (key) => {
    try {
        return sessionStorage.getItem(key)

    } catch (error) {
        return null
    }
}
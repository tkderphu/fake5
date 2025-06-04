export const getUserLoggedInInfo = () => {
    return {
        _id: getAuthInfo()._id,
        first_name: getAuthInfo().first_name,
        last_name: getAuthInfo().last_name
    }
}
export const getAccessToken = () => {
    return getAuthInfo().token
}
export const getAuthInfo = () => {
    return JSON.parse(localStorage.getItem("auth-token") || "{}")
}
export const saveAuthInfo = (authInfo) => {
    localStorage.setItem("auth-token", JSON.stringify(authInfo))
}
export const removeToken = () => {
    localStorage.removeItem("auth-token")
}
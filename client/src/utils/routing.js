const USER_ID = "loginUserId"

export const setSession = (loginUserId) => {
    sessionStorage.setItem(USER_ID, loginUserId)
}

export const getSession = () => {
    return sessionStorage.getItem(USER_ID)
}

export const logout = (redirectToLogin) => {
    sessionStorage.removeItem(USER_ID)
    redirectToLogin()
}

export const setUser = (data) => async (dispatch) => {
    dispatch({ type: "User", payload: data })
}
export const setItemLikes = (data) => async (dispatch) => {
    dispatch({ type: "itemLikes", payload: data })
}
export const setReqLists = (data) => async (dispatch) => {
    dispatch({ type: "reqLists", payload: data })
}
export const setUserData = (data) => async (dispatch) => {
    dispatch({ type: "userList", payload: data })
}
export const setPckg = (data) => async (dispatch) => {
    dispatch({ type: "isPckg", payload: data })
}
export const setMethodName = (data) => async (dispatch) => {
    dispatch({ type: "isMethodName", payload: data })
}
export const setSplash = (data) => async (dispatch) => {
    dispatch({ type: "Splash", payload: data })
}

export const setJugaar = (data) => async (dispatch) => {
    dispatch({ type: "Jugaar", payload: data })
}
export const setAppleLoginData = (data) => async (dispatch) => {
    dispatch({ type: "AppleLoginData", payload: data })
}
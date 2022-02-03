export const setUser = (data) => async (dispatch) => {
    dispatch({type: "User" , payload : data})
}

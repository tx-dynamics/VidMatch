const INITIAL_STATE = {
    user: false,
    ItemLikes:[],
    ReqLists:[],
    userData:[],
    userPckg:null,
    methodName:''

}

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case "User" :
        return {...state, user: action.payload}
        case "itemLikes" :
            return {...state, ItemLikes: action.payload}
        case "reqLists" :
        return {...state, ReqLists: action.payload}
        case "userList" :
        return {...state, userData: action.payload}
        case "isPckg" :
        return {...state, userPckg: action.payload}
        case "isMethodName" :
        return {...state, methodName: action.payload}
        default:
            return state
    }
}
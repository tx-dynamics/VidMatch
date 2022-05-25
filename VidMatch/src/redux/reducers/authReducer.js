const INITIAL_STATE = {
    user: false,
    ItemLikes:[],
    ReqLists:[]

}

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case "User" :
        return {...state, user: action.payload}
        case "itemLikes" :
            return {...state, ItemLikes: action.payload}
        case "reqLists" :
        return {...state, ReqLists: action.payload}
                    
        default:
            return state
    }
}
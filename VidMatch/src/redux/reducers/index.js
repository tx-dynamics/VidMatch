import {combineReducers} from "redux"
import authReducer from '../reducers/authReducer';
// import appReducer from 'src/redux/reducers/appReducers'

const rootReducers = combineReducers({
    auth : authReducer,
    // app : appReducer
})
export default rootReducers
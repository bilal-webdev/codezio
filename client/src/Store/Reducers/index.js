import { combineReducers } from "redux";
import { registerReducer } from "./registerReducer";
import { signinReducer } from "./signinReducer";
import { authTokenReducer } from './authTokenReducer'

export default combineReducers({
    register : registerReducer,
    auth : signinReducer,
    posts : authTokenReducer
})
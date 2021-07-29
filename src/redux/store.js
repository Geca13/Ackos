import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import authToken from './user/authentication/authToken'

const store = createStore(rootReducer, applyMiddleware(thunk));

if(localStorage.jwtToken){
    authToken(localStorage.jwtToken)
}
export default store;
import { SET_CURRENT_USER } from "../api/types";

/*
const initialState = {
    user:{},
    isLoggedIn: false,
    validToken: false
}

export default function authReducer(state= initialState, action) {
    if(action.type === 'logout-success') {
        return {
           ...initialState
        }
    }else if(action.type === 'login-success'){
        return {
            ...action.payload,
            isLoggedIn:true
        }
    }
 return state;
}
*/


const initialState = {
  validToken: false,
  user: {}
};

const booleanActionPayload = payload => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
}
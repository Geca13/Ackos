import * as types from './userTypes'

const initialState = {
    users: [] ,
    error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.USER_REQUEST:
            return {
                ...state,
            };
        case types.USER_SUCCESS: 
            return {
                users: action.payload,
                error: ''
            }
        case types.USER_SAVED_SUCCESS:
            return {
                message: action.payload,
                error: ''
            } 
        case types.USER_FAILURE:
            return {
                users: [],
                error: action.payload
            }
        default:
            return state            
    }
}

export default reducer;
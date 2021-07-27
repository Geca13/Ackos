import * as types from './userTypes'
import axios from 'axios'

export const signup = (user) => {
    return (dispatch) => {
      dispatch(userRequest());
      axios
        .post('/auth/signUpUser', user)
        .then((response) => {
          dispatch({
            type: types.USER_SAVED_SUCCESS,
            payload: response.data.message,
          });
        })
        .catch((error) => {
          dispatch(userFailure(error.message));
        });
    };
  };
  
  const userRequest = () => {
    return {
      type: types.USER_REQUEST,
    };
  };
  
  
  const userFailure = (error) => {
    return {
      type: types.USER_FAILURE,
      payload: error,
    };
  };
import * as authTypes from './authTypes'
import axios from 'axios'

export const login = (email, password) => {
    const credentials = {
      email: email,
      password: password,
    };
    return (dispatch) => {
      dispatch({
        type: authTypes.LOGIN_REQUEST,
      });
      axios
        .post("/auth/signInUser", credentials)
        .then((response) => {
          let token = response.data.token;
          localStorage.setItem("jwtToken", token);
          dispatch(success({ firstName: response.data.firstName, isLoggedIn: true }));
          localStorage.setItem("user", credentials.email )
        })
        .catch((error) => {
          dispatch(failure());
        });
    };
  };

  const success = (isLoggedIn) => {
    return {
      type: authTypes.SUCCESS,
      payload: isLoggedIn,
    };
  };
  
  const failure = () => {
    return {
      type: authTypes.FAILURE,
      payload: false,
    };
  };

  export const logoutUser = () => {
    return (dispatch) => {
      dispatch({
        type: authTypes.LOGOUT_REQUEST,
      });
      localStorage.removeItem("jwtToken");
      dispatch(success(false));
    };
  };
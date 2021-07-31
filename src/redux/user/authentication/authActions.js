import * as authTypes from './authTypes'
import axios from 'axios'
import jwtDecode from 'jwt-decode';

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
          
          localStorage.setItem("user", credentials.email )
          const { exp } = jwtDecode(token);
          const { sub } = jwtDecode(token);
          const { scopes } = jwtDecode(token);
          const { iss } = jwtDecode(token);
          localStorage.setItem("iss", iss);
          localStorage.setItem("jwtToken", token);
          localStorage.setItem("exp", exp);
          localStorage.setItem("sub", sub);

          let data = response.payload;
          localStorage.setItem("data", data);

          dispatch(success({ email: response.data.email, isLoggedIn: true }));
          
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
      localStorage.clear();
      dispatch(success(false));
    };
  };

  export const getUser = (email) => {
    
    return axios.get(`/auth/my-profile/${email}`);
  };

  export const updateUser = (email, body) => {
    return axios.post(`/auth/my-profile/${email}`, body);
  };
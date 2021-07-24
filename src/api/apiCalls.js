import axios from "axios";

import jwt_decode from 'jwt-decode'

export const signup = (user) =>{
    return axios.post('/auth/signUpUser', user);
}
/*
export const login = LoginRequest => async dispatch => {

  try {

    const res = await axios
    .post('/auth/signInUser', LoginRequest);
    const { token } = res.data;

    localStorage.set('jwtToken','Baerer ' + token);

    setJWTToken(token);

    const decoded = jwt_decode(token);
    
    dispatch({
      
      payload: decoded
    })
  } catch (error) {
    
  }
}

const setJWTToken = token =>{
  if(token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"]
  }
}
*/
export const login = (email, password) => {
    return axios
      .post('/auth/signInUser', { email, password }, )
      .then((response) => {
        if (response.data.accessToken) {
          const decoded = jwt_decode(response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        return response.data;
      });
  }

  export const setAuthorizationHeader = ({ email, password, isLoggedIn , token}) => {
    if (isLoggedIn) {
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };


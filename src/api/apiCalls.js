import axios from "axios";
import setJWTToken from "./dataService";
import jwt_decode from 'jwt-decode'


export const signup = (user) =>{
    return axios.post('/auth/signUpUser', user);
}



export const login = LoginRequest => async dispatch => {
  try {
    // post => Login Request
    const res = await axios.post("/auth/signInUser", LoginRequest);
    // extract token from res.data
    const { token } = res.data;
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set our token in header ***
    setJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);
    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};


/*
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
*/
  export const setAuthorizationHeader = ({ email, password, isLoggedIn , token}) => {
    if (isLoggedIn) {
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };


import axios from "axios";
import authHeader from './dataService'

export const signup = (user) =>{
    return axios.post('/auth/signUpUser', user);
}

export const login = (email, password) => {
    return axios
      .post('/auth/signInUser', { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  export const setAuthorizationHeader = ({ email, password, isLoggedIn }) => {
    if (isLoggedIn) {
      axios.defaults.headers.common['Authorization'] = `Basic ${btoa(
        email + ':' + password
      )}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };


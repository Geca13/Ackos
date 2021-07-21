import axios from "axios";

export const signUp = (user) =>{
    return axios.post('/auth/signUpUser', user);
}


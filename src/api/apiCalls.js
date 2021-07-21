import axios from "axios";

export const signUp = (user) =>{
    return axios.post('/auth/signUpUser', user);
}

export const signIn = (user) =>{
    return axios.post('/auth/signInUser', {}, {auth: user});
}


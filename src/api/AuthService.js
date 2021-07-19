import axios from 'axios'

const API_URL = 'http://localhost:8081/auth/'
  
class AuthService {

    login(email, password) {
        return axios.post(
            API_URL + 'signInUser' , {
                username , password
            }
        ).then(response => {
            if(response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
             return response.data;
        });
    }

    logout(){
        localStorage.removeItem('user');
    }

    signUpUser(firstName , lastName , email , password) {
        return axios.post(
            API_URL + 'signUpUser' , {
                firstName,
                lastName,
                email,
                password
            }
        )
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
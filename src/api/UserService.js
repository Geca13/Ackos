import axios from 'axios'
import AuthHeader from './AuthHeader'

const API_URL = 'http://localhost:8081/auth/'

class UserService {

    getPublicContent() {
        return axios.get(API_URL + 'all')
    }

    getUserContent() {
        return axios.get(API_URL + 'user', { headers: AuthHeader()})
    }

    getAdminContent() {
        return axios.get(API_URL + 'admin', { headers: AuthHeader()})
    }

}
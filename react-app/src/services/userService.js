import axios from 'axios';

const USER_BASE_URL = "http://localhost:3000/user";

class userService {

    addUser(id, pw, name, birthday, gender){
        return axios.post(USER_BASE_URL + '/add' + id, pw, name, birthday, gender);
    }

    loginUser(id, pw){
        return axios.post(USER_BASE_URL + '/login' + id, pw);
    }

    deleteUser(id){
        return axios.delete(USER_BASE_URL + '/del/' + id);
    }

    updateUserPassword(id, pw){
        return axios.patch(USER_BASE_URL + '/mod/pw/' + id, pw);
    }

    updateUserPictureURL(id, url){
        return axios.patch(USER_BASE_URL + '/mod/url/' + id, url);
    }

    updateUser(id, name, birthday, gender){
        return axios.patch(USER_BASE_URL + '/mod/info/' + id, name, birthday, gender);
    }

    getUserInformation(id){
        return axios.post(USER_BASE_URL + '/get/info/' + id);
    }
    
    getUserName(id){
        return axios.post(USER_BASE_URL + '/get/name' + id);
    }

    getUserPictureURL(id){
        return axios.post(USER_BASE_URL + '/get/url/' + id);
    }

    getUserList(id){
        return axios.post(USER_BASE_URL + '/get/list/' + id);
    }

}

export default new userService()
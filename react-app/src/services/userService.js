import axios from 'axios';

const USER_BASE_URL = "http://localhost:3000/user";

class userService {

    addUser(id, pw, name, birthday, gender) {
        return axios.post(USER_BASE_URL + '/add', {
            id: id,
            pw: pw,
            name: name,
            birthday: birthday,
            gender: gender
        });
    }

    loginUser(id, pw) {
        return axios.post(USER_BASE_URL + '/login', {
            id: id,
            pw: pw
        });
    }

    deleteUser(id) {
        return axios.delete(USER_BASE_URL + '/del', {
            id: id
        });
    }

    updateUserPassword(id, pw) {
        return axios.patch(USER_BASE_URL + '/mod/pw', {
            id: id,
            pw: pw
        });
    }

    updateUserPictureURL(id, url) {
        return axios.patch(USER_BASE_URL + '/mod/url', {
            id: id,
            url: url
        });
    }

    updateUser(id, name, birthday, gender) {
        return axios.patch(USER_BASE_URL + '/mod/info', {
            id: id,
            name: name,
            birthday: birthday,
            gender: gender
        });
    }

    getUserInformation(id) {
        return axios.post(USER_BASE_URL + '/get/info', {
            id: id
        });
    }

    getUserName(id) {
        return axios.post(USER_BASE_URL + '/get/name', {
            id:id
        });
    }

    getUserPictureURL(id) {
        return axios.post(USER_BASE_URL + '/get/url',{
            id:id
        });
    }

    getUserList(id) {
        return axios.post(USER_BASE_URL + '/get/list',{
            id:id
        });
    }

}

export default new userService()
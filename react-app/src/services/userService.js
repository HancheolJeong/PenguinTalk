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

    confirmPassword(id, pw) {
        return axios.post(USER_BASE_URL + '/confirm/pw', {
            id: id,
            pw: pw
        });
    }

    deleteUser(id) {
        return axios.delete(USER_BASE_URL + '/del', {
            data: {

                id: id
            }
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    updateUserPassword(id, pw) {
        return axios.patch(USER_BASE_URL + '/mod/pw', {
            id: id,
            pw: pw
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    updateUserPicture(formData) {
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        return axios.patch(USER_BASE_URL + '/mod/picture', formData,
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    updateUser(id, name, birthday, gender) {
        return axios.put(USER_BASE_URL + '/mod/info', {
            id: id,
            name: name,
            birthday: birthday,
            gender: gender
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    getUserInformation(id) {
        return axios.post(USER_BASE_URL + '/get/info', {
            id: id
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    getUserName(id) {
        return axios.post(USER_BASE_URL + '/get/name', {
            id: id
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    getUserPictureURL(id) {
        return axios.post(USER_BASE_URL + '/get/url', {
            id: id
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    getUserList(id) {
        return axios.post(USER_BASE_URL + '/get/list', {
            id: id
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    getPicture(id) {
        return axios.post(USER_BASE_URL + '/get/img', { id: id }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            responseType: 'blob'
        });
    }

}

export default new userService()
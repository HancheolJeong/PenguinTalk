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

    confirmPassword(id, pw, token) {
        return axios.post(USER_BASE_URL + '/confirm/pw', {
            id: id,
            pw: pw
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    deleteUser(id, token) {
        return axios.delete(USER_BASE_URL + '/del', {
            data: {

                id: id
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        },
        );
    }

    updateUserPassword(id, pw, token) {
        return axios.patch(USER_BASE_URL + '/mod/pw', {
            id: id,
            pw: pw
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    updateUserPicture(formData, token) {
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
        return axios.patch(USER_BASE_URL + '/mod/picture', formData,
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    updateUser(id, name, birthday, gender, token) {
        return axios.put(USER_BASE_URL + '/mod/info', {
            id: id,
            name: name,
            birthday: birthday,
            gender: gender
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * 사용자 정보를 서버에게 요청한다.
     * @param {string} id : 사용자ID
     * @param {string} token : jwt
     * @returns 
     */
    getUserInformation(id, token) {
        return axios.get(USER_BASE_URL + '/get/info', {
            params:
            {
                user_id: id
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    getUserName(id, token) { //미사용
        return axios.get(USER_BASE_URL + '/get/name', {
            params:
            {
                user_id: id
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    getUserPictureURL(id, token) {//미사용
        return axios.get(USER_BASE_URL + '/get/url', {
            params:
            {
                user_id: id
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    getUserList(id, token) { //미사용
        return axios.get(USER_BASE_URL + '/get/list', {
            params:
            {
                user_id: id
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    getPicture(id, token, user_id) {
        return axios.get(USER_BASE_URL + '/get/img', {
            params: 
            { 
                id: id,
                user_id : user_id
            },
            headers: 
            {
                'Authorization': `Bearer ${token}`
            },
            responseType: 'blob'
        });
    }

}



export default new userService()
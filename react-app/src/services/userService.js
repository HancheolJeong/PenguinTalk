import axios from 'axios';

const USER_BASE_URL = "http://localhost:3000/user";

class userService {


    /**
     * HTTP POST 요청으로 사용자 정보를 서버에 저장하는 함수, 회원가입
     * @param {string} id : 사용자 ID
     * @param {string} pw : 사용자 패스워드
     * @param {string} name : 사용자 이름
     * @param {date} birthday : 사용자 생일
     * @param {int} gender : 사용자 성별 0 : 남자 1 : 여자
     * @returns 
     */
    addUser(id, pw, name, birthday, gender) {
        return axios.post(USER_BASE_URL + '/add', {
            id: id,
            pw: pw,
            name: name,
            birthday: birthday,
            gender: gender
        });
    }

    /**
     * HTTP POST 요청으로 사용자를 서버에서 인증하는 함수
     * @param {string} id : 사용자 ID
     * @param {string} pw : 사용자 패스워드
     * @returns 
     */
    loginUser(id, pw) {
        return axios.post(USER_BASE_URL + '/login', {
            id: id,
            pw: pw
        });
    }

    /**
     * HTTP POST 요청으로 사용자 패스워드를 서버에서 인증하는 함수
     * @param {string} id : 사용자 ID
     * @param {string} pw : 사용자 패스워드
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
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

    /**
     * HTTP DELETE 요청으로 회원을 서버에서 삭제하는 함수
     * @param {string} id : 사용자 ID
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
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

    /**
     * HTTP PATCH 요청으로 사용자의 패스워드를 서버에서 업데이트하는 함수
     * @param {string} id : 사용자 ID
     * @param {string} pw : 사용자 패스워드
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
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

    /**
     * HTTP PATCH 요청으로 사용자의 이미지를 저장하는 함수
     * @param {FormData} formData : id와 사용자 이미지
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
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

    /**
     * HTTP PUT 요청으로 사용자 정보를 서버에서 수정하는 함수
     * @param {string} id : 사용자 ID
     * @param {string} name : 사용자 이름
     * @param {date} birthday : 사용자 생일
     * @param {int} gender : 사용자 성별 0 남자 1 여자
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
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
     * HTTP GET 요청으로 사용자 정보를 서버에서 가져오는 함수
     * @param {string} id : 사용자ID
     * @param {string} token : 사용자 인증 JWT
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

    /**
     * HTTP GET 요청으로 사용자 이름을 서버에서 가져오는 함수
     * @param {string} id : 사용자 ID
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
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

    /**
     * HTTP GET 요청으로 사용자 이미지를 서버에서 가져오는 함수
     * @param {string} id : 사용자 ID
     * @param {string} token : 사용자 인증 JWT
     * @returns 
     */
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

    /**
     * HTTP GET 요청으로 사용자목록을 서버에서 가져오는 함수
     * @param {string} id : 사용자 ID
     * @param {string} token : 사용자 인증 JWT
     * @returns 
     */
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

    /**
     * HTTP GET 요청으로 사용자 이미지를 서버에서 가져오는 함수
     * @param {string} id : 이미지 사용자 ID
     * @param {String} token : 사용자 인증 jwt
     * @param {string} user_id : 로그인 중인 사용자 ID, query위조 방지
     * @returns 
     */
    getPicture(id, token, user_id) {
        return axios.get(USER_BASE_URL + '/get/img', {
            params:
            {
                id: id,
                user_id: user_id
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
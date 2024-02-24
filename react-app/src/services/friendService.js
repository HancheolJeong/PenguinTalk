import axios from 'axios';

const FRIEND_BASE_URL = "http://localhost:3000/friend";

class friendService {

    /**
     * HTTP GET 요청으로 사용자의 친구정보를 서버에서 가져오는 함수
     * @param {string} user_id : 사용자 ID
     * @param {int} page : 페이지 번호
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    getFriend(user_id, page, token) {
        return axios.get(FRIEND_BASE_URL + '/', {
            params: {
                user_id: user_id,
                page: page
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }

        });
    }

    /**
     * HTTP GET 요청으로 사용자의 친구정보를 서버에서 전부다 가져오는 함수
     * @param {string} user_id : 사용자 ID
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    getFriendAll(user_id, token) {
        return axios.get(FRIEND_BASE_URL + '/all', {
            params:
            {
                user_id: user_id,
            },
            headers:
            {
                'Authorization': `Bearer ${token}`

            }
        });
    }

    /**
     * HTTP POST 요청으로 사용자의 친구를 서버에 저장하는 함수
     * @param {string} user_id : 사용자 ID
     * @param {string} friend_id : 사용자의 친구 ID
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    addFriend(user_id, friend_id, token) {
        return axios.post(FRIEND_BASE_URL + '/add', {
            user_id: user_id,
            friend_id: friend_id
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * HTTP DELETE 요청으로 사용자의 친구를 서버에서 삭제하는 함수
     * @param {string} user_id : 사용자 ID
     * @param {string} friend_id : 사용자의 친구 ID
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    deleteFriend(user_id, friend_id, token) {
        return axios.delete(FRIEND_BASE_URL + '/del', {
            data: {
                user_id: user_id,
                friend_id: friend_id

            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        },);
    }

    /**
     * HTTP GET 요청으로 사용자가 친구 요청한 정보를 서버에서 가져오는 함수
     * @param {string} sender_id : 사용자 ID
     * @param {int} page : 페이지 번호
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    getRequestFromMe(sender_id, page, token) {
        return axios.get(FRIEND_BASE_URL + '/request/fm', {
            params: {
                user_id: sender_id,
                page: page
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    /**
     * HTTP GET 요청으로 사용자가 받은 친구 요청 정보를 서버에서 가져오는 함수
     * @param {string} receiver_id : 사용자 ID
     * @param {int} page : 페이지 번호
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    getRequestToMe(receiver_id, page, token) {
        return axios.get(FRIEND_BASE_URL + '/request/tm', {
            params: {
                user_id: receiver_id,
                page: page
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    /**
     * HTTP GET 요청으로 친구요청이 가능한 사용자 목록을 서버에서 가져오는 함수
     * @param {string} user_id : 사용자 ID
     * @param {int} page : 페이지 번호
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    getRequestPossible(user_id, page, token) {
        return axios.get(FRIEND_BASE_URL + '/request/pos', {
            params: {
                user_id: user_id,
                page: page
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    /**
     * HTTP POST 요청으로 친구요청을 서버에 추가하는 함수
     * @param {string} sender_id : 사용자 ID
     * @param {string} receiver_id : 친구요청 받을 ID
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    addRequest(sender_id, receiver_id, token) {
        return axios.post(FRIEND_BASE_URL + '/request/add', {
            sender_id: sender_id,
            receiver_id: receiver_id
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * HTTP DELETE 요청으로 친구요청을 서버에서 삭제하는 함수
     * @param {string} sender_id : 친구요청 보낸 사용자 ID
     * @param {string} receiver_id : 친구 요청 받은 사용자 ID
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    deleteRequest(sender_id, receiver_id, token) {
        return axios.delete(FRIEND_BASE_URL + '/request/del', {
            data: {

                sender_id: sender_id,
                receiver_id: receiver_id
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        },
        );
    }

    /**
     * HTTP GET 요청으로 차단한 사용자 정보를 서버에서 가져오는 함수
     * @param {string} user_id : 사용자 ID
     * @param {int} page : 페이지 번호
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    getBlock(user_id, page, token) {
        return axios.get(FRIEND_BASE_URL + '/block', {
            params:{
                user_id: user_id,
                page: page

            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    /**
     * HTTP POST 요청으로 차단이 가능한 사용자를 서버에서 가져오는 함수
     * @param {string} user_id : 사용자 ID
     * @param {string} token : 사용자 인증 JWT
     * @returns 
     */
    getBlockPossible(user_id, token) { // 미사용
        return axios.post(FRIEND_BASE_URL + '/block/pos', {
            params:
            {
                user_id: user_id
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    /**
     * HTTP POST 요청으로 차단한 사용자를 서버에 저장하는 함수
     * @param {string} user_id : 사용자 ID
     * @param {string} blocked_id : 차단된 사용자 ID
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    addBlock(user_id, blocked_id, token) {
        return axios.post(FRIEND_BASE_URL + '/block/add', {
            user_id: user_id,
            blocked_id: blocked_id
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }


    /**
     * HTTP DELETE 요청으로 차단한 사용자를 서버에서 삭제하는 함수
     * @param {string} user_id : 사용자 ID
     * @param {string} blocked_id : 차단된 사용자 ID
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    deleteBlock(user_id, blocked_id, token) {
        return axios.delete(FRIEND_BASE_URL + '/block/del', {
            data: {

                user_id: user_id,
                blocked_id: blocked_id
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        },
        );
    }

    /**
     * HTTP GET 요청으로 사용자 이미지를 불러오는 함수
     * @param {id} id : 이미지를 불러올 사용자 ID
     * @param {string} token : 사용자 인증 jwt
     * @param {string} user_id : 로그인한 사용자 ID
     * @returns 
     */
    getPicture(id, token, user_id) {
        return axios.get(FRIEND_BASE_URL + '/get/img', {
            params:
            {
                id: id,
                user_id:user_id
            },
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            responseType: 'blob'
        });
    }

}


export default new friendService()
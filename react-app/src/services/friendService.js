import axios from 'axios';

const FRIEND_BASE_URL = "http://localhost:3000/friend";

class friendService {

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
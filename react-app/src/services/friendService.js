import axios from 'axios';

const FRIEND_BASE_URL = "http://localhost:3000/friend";

class friendService {

    getFriend(user_id, page) {
        return axios.post(FRIEND_BASE_URL + '/', {
            user_id: user_id,
            page: page
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    getFriendAll(user_id) {
        return axios.post(FRIEND_BASE_URL + '/all', {
            user_id: user_id,
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    addFriend(user_id, friend_id) {
        return axios.post(FRIEND_BASE_URL + '/add', {
            user_id: user_id,
            friend_id: friend_id
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    deleteFriend(user_id, friend_id) {
        return axios.delete(FRIEND_BASE_URL + '/del', {
            data: {
                user_id: user_id,
                friend_id: friend_id

            }
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    getRequestFromMe(sender_id, page) {
        return axios.post(FRIEND_BASE_URL + '/request/fm', {
            sender_id: sender_id,
            page: page
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    getRequestToMe(receiver_id, page) {
        return axios.post(FRIEND_BASE_URL + '/request/tm', {
            receiver_id: receiver_id,
            page: page
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    getRequestPossible(user_id, page) {
        return axios.post(FRIEND_BASE_URL + '/request/pos', {
            user_id: user_id,
            page: page
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    addRequest(sender_id, receiver_id) {
        return axios.post(FRIEND_BASE_URL + '/request/add', {
            sender_id: sender_id,
            receiver_id: receiver_id
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
    }

    deleteRequest(sender_id, receiver_id) {
        console.log(sender_id, receiver_id);
        return axios.delete(FRIEND_BASE_URL + '/request/del', {
            data: {

                sender_id: sender_id,
                receiver_id: receiver_id
            }
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    getBlock(user_id, page) {
        return axios.post(FRIEND_BASE_URL + '/block', {
            user_id: user_id,
            page: page
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    getBlockPossible(user_id) {
        return axios.post(FRIEND_BASE_URL + '/block/pos', {
            user_id: user_id
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    addBlock(user_id, blocked_id) {
        return axios.post(FRIEND_BASE_URL + '/block/add', {
            user_id: user_id,
            blocked_id: blocked_id
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    deleteBlock(user_id, blocked_id) {
        return axios.delete(FRIEND_BASE_URL + '/block/del', {
            data: {

                user_id: user_id,
                blocked_id: blocked_id
            }
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    getPicture(id) {
        return axios.post(FRIEND_BASE_URL + '/get/img', { id: id }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            responseType: 'blob'
        });
    }

}

export default new friendService()
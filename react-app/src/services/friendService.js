import axios from 'axios';

const FRIEND_BASE_URL = "http://localhost:3000/friend";

class friendService {

    getFriend(user_id) {
        return axios.post(FRIEND_BASE_URL + '/', {
            user_id: user_id
        });
    }

    addFriend(user_id, friend_id) {
        return axios.post(FRIEND_BASE_URL + '/add', {
            user_id: user_id,
            friend_id: friend_id
        });
    }

    deleteFriend(user_id, friend_id) {
        return axios.delete(FRIEND_BASE_URL + '/del', {
            user_id: user_id,
            friend_id: friend_id
        });
    }

    getRequestFromMe(sender_id) {
        return axios.post(FRIEND_BASE_URL + '/request/fm', {
            sender_id: sender_id
        });
    }

    getRequestToMe(receiver_id) {
        return axios.post(FRIEND_BASE_URL + '/request/tm', {
            receiver_id: receiver_id
        });
    }

    getRequestPossible(user_id) {
        return axios.post(FRIEND_BASE_URL + '/request/pos', {
            user_id: user_id
        });
    }

    addRequest(sender_id, receiver_id) {
        return axios.post(FRIEND_BASE_URL + '/request/add', {
            sender_id: sender_id,
            receiver_id: receiver_id
        });
    }

    deleteRequest(sender_id, receiver_id) {
        return axios.delete(FRIEND_BASE_URL + '/request/del', {
            sender_id: sender_id,
            receiver_id: receiver_id
        });
    }

    getBlock(user_id) {
        return axios.post(FRIEND_BASE_URL + '/block', {
            user_id: user_id
        });
    }

    getBlockPossible(user_id) {
        return axios.post(FRIEND_BASE_URL + '/block/pos', {
            user_id: user_id
        });
    }

    addBlock(user_id, blocked_id) {
        return axios.post(FRIEND_BASE_URL + '/block/add', {
            user_id: user_id,
            blocked_id: blocked_id
        });
    }

    deleteBlock(user_id, blocked_id) {
        return axios.delete(FRIEND_BASE_URL + '/block/del', {
            user_id: user_id,
            blocked_id: blocked_id
        });
    }

}

export default new friendService()
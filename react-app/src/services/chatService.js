import axios from 'axios';

const CHAT_BASE_URL = "http://localhost:3000/chat";

class chatService {


    getChat(sender_id, receiver_id, token) {
        return axios.get(CHAT_BASE_URL + '/', {
            params:
            {
                user_id: sender_id,
                receiver_id: receiver_id
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    addChat(sender_id, receiver_id, page, token) {
        return axios.post(CHAT_BASE_URL + '/add', {
            sender_id: sender_id,
            receiver_id: receiver_id,
            page: page
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

}

export default new chatService()
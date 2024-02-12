import axios from 'axios';

const CHAT_BASE_URL = "http://localhost:3000/chat";

class chatService {

    getChat(sender_id, receiver_id, message_content){
        return axios.post(CHAT_BASE_URL + '/' + sender_id, receiver_id, message_content);
    }

    addChat(sender_id, receiver_id, page){
        return axios.post(CHAT_BASE_URL + '/add' + sender_id, receiver_id, page);
    }

}

export default new chatService()
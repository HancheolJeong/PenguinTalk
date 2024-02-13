import axios from 'axios';

const CHAT_BASE_URL = "http://localhost:3000/chat";

class chatService {

    getChat(sender_id, receiver_id, message_content){
        return axios.post(CHAT_BASE_URL + '/' ,{
            sender_id:sender_id, 
            receiver_id:receiver_id, 
            message_content:message_content});
    }

    addChat(sender_id, receiver_id, page){
        return axios.post(CHAT_BASE_URL + '/add', {
            sender_id:sender_id, 
            receiver_id:receiver_id, 
            page:page});
    }

}

export default new chatService()
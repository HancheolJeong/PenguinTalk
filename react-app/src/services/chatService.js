import axios from 'axios';

const CHAT_BASE_URL = "http://localhost:3000/chat";

class chatService {

/**
 * HTTP GET 요청으로 서버에서 채팅 내역을 가져오는 함수
 * @param {string} sender_id : 메시지를 보낸 사용자 ID
 * @param {string} receiver_id :메시지를 받은 사용자 ID
 * @param {string} token : 요청 인증을 위한 jwt
 * @returns 
 */
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

    /**
     * HTTP POST 요청으로 서버로 채팅기록을 저장하는 함수
     * @param {string} sender_id : 메시지를 보낸 사용자 ID
     * @param {string} receiver_id : 메시지를 받은 사용자 ID
     * @param {int} page : 페이지 번호
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
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
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import friendService from '../services/friendService';
import chatService from '../services/chatService';
import {handleError} from './libs/handleError';
import { useNavigate } from 'react-router-dom';
import { selectId, selectIsLoggedIn, selectToken } from '../slices/loginSlice';
import { useSelector } from 'react-redux';

function ChatComponent() {
    const [message, setMessage] = useState(''); // 입력된 메시지
    const [socket, setSocket] = useState(null); // socket 인스턴스
    const [friends, setFriends] = useState([]); //친구 목록
    const [selectedFriendId, setSelectedFriendId] = useState(null); //선택된 친구의 ID
    const [chatHistory, setChatHistory] = useState([]); // 채팅 기록
    const [page, setPage] = useState(1); // 페이지 상태
    const navigate = useNavigate(); // 페이지 이동 훅

    // redux store에서 로그인 상태, 토큰, 사용자 ID를 가져온다.
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const token = useSelector(selectToken);
    const userId = useSelector(selectId);

    useEffect(() => {
        const newSocket = io("http://localhost:3000"); // 소켓서버 연결
        setSocket(newSocket); // 인스턴스 업데이트
        newSocket.emit('register', userId); // 서버에 등록
        newSocket.on("connect", () => console.log("Socket connected: ", newSocket.id)); // 연결 성공 로그
        newSocket.on('receive_message', (data) => { // 서버로 부터 메시지 수신할 때
            const { senderId, message } = data;
            if(selectedFriendId === senderId)
            {
                setChatHistory(prevChatHistory => { // 채팅기록에 저장
                    const newMessage = {
                        sender_id: selectedFriendId,
                        receiver_id: senderId,
                        message_content: message,
                        create_dt: new Date().toISOString() // 서버 시간을 가져오는게 아니므로 오차가 있을수도 있음.
                    };
                    const updatedChatHistory = [...prevChatHistory, newMessage];
                    // 채팅 기록이 10개를 초과할 경우, 가장 오래된 메시지를 제거
                    return updatedChatHistory.length > 10 ? updatedChatHistory.slice(-10) : updatedChatHistory;
                });
            }

        });
        return () => newSocket.disconnect();
    }, [selectedFriendId]);


    useEffect(() => {
        const loadFriends = async () => { // 친구목록 불러오는 함수
            try
            {
                const res = await friendService.getFriend(userId, page, token); // 친구 정보
                const feedItems = res.data.items;
                for(let item of feedItems)
                {
                    try{
                        const PictureRes = await friendService.getPicture(item.id, token, userId); // 이미지
                        const picture = URL.createObjectURL(PictureRes.data);
                        item.picture = picture;
                    }catch (error)
                    {
                        console.error("Error loading picture", error);
                        item.picture = `${process.env.PUBLIC_URL + './background2.png'}`;
                    }
    
                }
                setFriends(feedItems);
            }
            catch(error)
            {
                handleError(error, navigate)
            }



        };
        loadFriends();
    }, [page]);

    useEffect(() => {
        const loadChatHistory = async () => {
            if (!selectedFriendId) return;
            try {
                const res = await chatService.getChat(userId, selectedFriendId, token);
                const reversedData = [...res.data.items].reverse();
                setChatHistory(reversedData);
            } catch (error) {
                handleError(error, navigate);
            }
        };

        loadChatHistory();
    }, [selectedFriendId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (socket && selectedFriendId && message.trim()) {
            socket.emit("send_to_user", { senderId: userId, recipientId: selectedFriendId, message: message })
            setMessage('');
            const newMessage = {
                sender_id: userId,
                receiver_id: selectedFriendId,
                message_content: message,
                create_dt: new Date().toISOString()
            }
            setChatHistory(prevChatHistory => {
                const updatedChatHistory = [...prevChatHistory, newMessage];
                // 채팅 기록이 10개를 초과할 경우, 가장 오래된 메시지를 제거
                if (updatedChatHistory.length > 10) {
                    return updatedChatHistory.slice(-10);
                }
                return updatedChatHistory;
            });

        }

    };

    const handleFriendSelect = (id) => {
        setSelectedFriendId(id);
    };

    const handlePrevClick = () => {
        setPage((prevPage) => Math.max(1, prevPage - 1));
    };

    const handleNextClick = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const renderPagination = () => (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePrevClick}>이전 페이지</button>
                </li>
                <li className="page-item">
                    <button className="page-link" onClick={handleNextClick}>다음 페이지</button>
                </li>
            </ul>
        </nav>
    );

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <h2>친구 목록</h2>
                    <ul className="list-group">
                        {friends.map((friend) => (
                            <li key={friend.id} className="list-group-item d-flex align-items-center" onClick={() => handleFriendSelect(friend.id)}>
                                <img src={friend.picture || '기본 이미지 URL'} alt={friend.name} className="rounded-circle me-2" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                <div>
                                    <strong>이름:</strong> {friend.name} <br />
                                    <small>ID: {friend.id}</small>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {renderPagination()}
                </div>
                <div className="col-8">
                    <h1>채팅</h1>
                    <div className='mb-3'>
                        {chatHistory.slice(0, 10).map((chat, index) => (
                            <div key={index} className={`message d-flex mb-2 ${chat.sender_id === userId ? 'justify-content-end' : 'justify-content-start'}`}>
                                <div className={`rounded-pill px-3 py-2 ${chat.sender_id === userId ? 'bg-primary text-white' : 'bg-light'}`}>
                                    <p className="mb-1">{chat.message_content}</p>
                                    <small>{new Date(chat.create_dt).toLocaleTimeString()}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendMessage}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="form-control"
                        />
                        <button type="submit" className="btn btn-primary mt-2">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatComponent;
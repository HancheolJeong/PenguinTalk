import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import friendService from '../services/friendService';
import chatService from '../services/chatService';

function ChatComponent() {
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [friends, setFriends] = useState([]);
    const [selectedFriendId, setSelectedFriendId] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [page, setPage] = useState(1);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);
        newSocket.emit('register', userId);
        newSocket.on("connect", () => console.log("Socket connected: ", newSocket.id));
        newSocket.on('receive_message', (data) => {
            const { senderId, message } = data;
            setChatHistory(prevChatHistory => {
                const newMessage = {
                    sender_id: selectedFriendId,
                    receiver_id: senderId,
                    message_content: message,
                    create_dt: new Date().toISOString() // 실제 서버 시간을 사용하는 것이 더 정확할 수 있습니다.
                };
                const updatedChatHistory = [...prevChatHistory, newMessage];
                // 채팅 기록이 10개를 초과할 경우, 가장 오래된 메시지를 제거
                return updatedChatHistory.length > 10 ? updatedChatHistory.slice(-10) : updatedChatHistory;
            });
        });
        return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        const loadFriends = async () => {
            const res = await friendService.getFriend(userId, page);
            setFriends(res.data.items);
        };
        loadFriends();
    }, [page]);

    useEffect(() => {
        const loadChatHistory = async () => {
            if (!selectedFriendId) return;
            try {
                const res = await chatService.getChat(userId, selectedFriendId, '10');
                const reversedData = [...res.data.items].reverse();
                setChatHistory(reversedData);
            } catch (error) {
                console.error("채팅 기록 로드 중 오류 발생:", error);
            }
        };

        loadChatHistory();
    }, [selectedFriendId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (socket && selectedFriendId && message.trim()) {
            // socket.emit("chat message", { to: selectedFriendId, message: message });
            socket.emit("send_to_user", {senderId : userId, recipientId : selectedFriendId, message : message})
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
                            <li key={friend.id} className="list-group-item" onClick={() => handleFriendSelect(friend.id)}>
                                아이디 : {friend.id}
                                이름 : {friend.name}
                            </li>
                        ))}
                    </ul>
                    {renderPagination()}
                </div>
                <div className="col-8">
                    <h1>Socket.IO Chat</h1>
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
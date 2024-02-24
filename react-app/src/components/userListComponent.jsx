import React, { useState, useEffect } from 'react';
import friendService from '../services/friendService';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import {handleError} from './libs/handleError';
import { selectId, selectIsLoggedIn, selectToken } from '../slices/loginSlice';

function UserListComponent() {
    const [users, setUsers] = useState([]); // 사용자들의 정보
    const [page, setPage] = useState(1); // 페이지 번호
    const navigate = useNavigate(); // 페이지 이동 훅
    const location = useLocation(); // 위치 상태 관리 훅
    const type = location.state.state; // 사용자 출력 유형

    // redux store에서 로그인 상태, 토큰, 사용자 ID를 가져온다.
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const token = useSelector(selectToken);
    const userId = useSelector(selectId);


    /**
     * 사용자 목록을 불러오는 함수 type에 따라서 서로 다른 API를 요청한다.
     * 사용자 이미지도 가져와서 저장한다.
     */
    const fetchUsers = useCallback(async () => { // 콜백함수
        let res = null;
        try {
            switch (type) {
                case 'user':
                    res = await friendService.getRequestPossible(userId, page, token); // 친구와 차단을 제외한 모든 유저
                    break;
                case 'friend':
                    res = await friendService.getFriend(userId, page, token); // 친구
                    break;
                case 'block':
                    res = await friendService.getBlock(userId, page, token); // 차단
                    break;
                case 'toMe':
                    res = await friendService.getRequestToMe(userId, page, token); // 내가 받은 요청
                    break;
                case 'fromMe':
                    res = await friendService.getRequestFromMe(userId, page, token); // 내가 보낸 요청
                    break;
                default:
                    console.error("redux error");
                    return;

            }

            const feedItems = await Promise.all(res.data.items.map(async (item) => {
                try {
                    const pictureRes = await friendService.getPicture(item.id, token, userId); // 사용자 이미지를 불러오기
                    const pictureUrl = URL.createObjectURL(pictureRes.data);
                    return { ...item, pictureUrl };
                } catch (error) {
                    handleError(error, navigate);
                    return { ...item, pictureUrl: 'defaultProfileImageURL' };
                }
            }));
            setUsers(feedItems);
        } catch (error) {
            console.error("Feed loading failed: ", error);
        }
    }, [page, type]); // 페이지와 타입이이 변경될때 리로드된다.

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    /**
     * 이전 페이지로 이동 
     */
    const handlePrevClick = () => {
        setPage((prevPage) => Math.max(1, prevPage - 1));
    };

    /**
     * 다음 페이지로 이동
     */
    const handleNextClick = () => {
        setPage((prevPage) => prevPage + 1);
    };

    /**
     * 페이지 이동 버튼을 설정을 하고 반환합니다.
     */
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


    const getMenuItems = (type, id) => {
        switch (type) {
            case 'user': //친구,차단을 제외한 모든 유저 목록
                return (
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => handleNavigatePosts(id, 'findNonFriends')}>작성한 글 보기</button></li>
                        <li><button className="dropdown-item" onClick={() => handleFriendRequest(id)}>친구 요청</button></li>
                        <li><button className="dropdown-item" onClick={() => handleUserBlock(id)}>차단</button></li>
                    </ul>
                );
            case 'friend': //친구목록
                return (
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => handleNavigatePosts(id, 'findFriends')}>작성한 글 보기</button></li>
                        <li><button className="dropdown-item" onClick={() => handleDeleteFriend(id)}>친구 삭제</button></li>
                        <li><button className="dropdown-item" onClick={() => handleUserBlock(id)}>차단</button></li>
                    </ul>
                );
            case 'fromMe': // 내가 보낸 친구요청
                return (
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => handleDeleteRequest(id)}>취소</button></li>
                    </ul>
                );
            case 'toMe': // 내가 받은 친구요청
                return (
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => handleAddFriend(id)}>수락</button></li>
                        <li><button className="dropdown-item" onClick={() => handleDeleteRequestToMe(id)}>취소</button></li>
                    </ul>
                );
            case 'block': //차단 목록
                return (
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => handleCancelBlock(id)}>차단 해제</button></li>
                    </ul>
                );
            default:
                return [];
        }
    };

    /**
     * 서버에게 친구요청하는 함수
     * @param {string} id : 친구 요청 받은 사용자 Id 
     */
    const handleFriendRequest = async (id) => {
        try {
            await friendService.addRequest(userId, id, token);
            alert("친구요청 완료했습니다.");
            fetchUsers(); // 리로드
        } catch (error) {
            console.error("Failed to send friend request:", error);
            alert("친구요청 실패했습니다..");
        }
    };

    /**
    * 서버에게 사용자 차단 요청하는 함수
    * @param {string} id : 차단될 사용자 Id 
    */
    const handleUserBlock = async (id) => {
        try {
            await friendService.addBlock(userId, id, token);
            alert("차단 완료했습니다.");
            fetchUsers(); // 리로드
        } catch (error) {
            console.error("Failed to send friend request:", error);
            alert("차단 실패했습니다..");
        }
    };

    /**
    * 서버에게 친구 삭제 요청하는 함수
    * @param {string} id : 친구 삭제될 사용자 Id 
    */
    const handleDeleteFriend = async (id) => {
        try {
            await friendService.deleteFriend(userId, id, token);
            alert("친구삭제 완료했습니다.");
            fetchUsers(); // 리로드
        } catch (error) {
            console.error("Failed to send friend request:", error);
            alert("친구삭제 실패했습니다..");
        }
    };

    /**
    * 서버에게 친구요청삭제를 요청하는 함수
    * @param {string} id : 요청 삭제될 사용자 Id 
    */
    const handleDeleteRequest = async (id) => {
        try {
            await friendService.deleteRequest(userId, id, token); //sender_id, receiver_id
            alert("요청삭제 완료했습니다.");
            fetchUsers(); // 리로드
        } catch (error) {
            console.error("Failed to send friend request:", error);
            alert("요청삭제 실패했습니다..");
        }
    };

    /**
    * 서버에게 친구요청삭제를 요청하는 함수
    * @param {string} id : 사용자 Id 
    */
    const handleDeleteRequestToMe = async (id) => {
        try {
            await friendService.deleteRequest(id, userId, token); //sender_id, receiver_id
            alert("요청삭제 완료했습니다.");
            fetchUsers(); // 리로드
        } catch (error) {
            console.error("Failed to send friend request:", error);
            alert("요청 실패했습니다..");
        }
    };


    /**
    * 서버에게 친구추가 요청하는 함수
    * @param {string} id : 사용자 Id 
    */
    const handleAddFriend = async (id) => {
        try {
            await friendService.addFriend(userId, id, token); //sender_id, receiver_id
            alert("친구추가 완료했습니다.");
            fetchUsers(); // 리로드
        } catch (error) {
            console.error("Failed to send friend request:", error);
            alert("친구추가 실패했습니다..");
        }
    };


    /**
    * 서버에게 차단을 요청하는 함수
    * @param {string} id : 사용자 Id 
    */
    const handleCancelBlock = async (id) => {
        try {
            await friendService.deleteBlock(userId, id, token); //sender_id, receiver_id
            alert("차단해제 완료했습니다.");
            fetchUsers(); // 리로드
        } catch (error) {
            console.error("Failed to send friend request:", error);
            alert("차단해제 실패했습니다..");
        }
    };

    /**
    * 친구가 작성한 게시글 페이지로 이동하는 함수
    * @param {string} id : 사용자 Id 
    */
        const handleNavigatePosts = (id, state) => {
            navigate('/', { state: { state: state, userId:id} });
        };


    const renderUserList = () => {
        const defaultImageUrl = `${process.env.PUBLIC_URL + './background2.png'}`;
        return (
            <div className="container py-4" style={{ maxWidth: '50%', margin: '0 auto' }}>
                <div className="list-group">
                    {users.map(item => (
                        <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img src={item.pictureUrl || defaultImageUrl} alt={item.name} className="rounded-circle me-3" style={{ width: "60px", height: "60px" }} />
                                <div>
                                    <p className="mb-1">이름:{item.name}</p>
                                    <p className="mb-0">ID: {item.id}</p>
                                    <small>가입일: {new Date(item.create_dt).toLocaleDateString()}</small>
                                </div>
                            </div>
                            <button className="btn btn-outline-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">☰</button>
                            {getMenuItems(type, item.id)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="feed-container">
            {renderUserList()}
            {renderPagination()}
        </div>
    );
}

export default UserListComponent;
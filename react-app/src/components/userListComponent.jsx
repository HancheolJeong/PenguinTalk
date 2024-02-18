import React, { useState, useEffect } from 'react';
import friendService from '../services/friendService';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UserListComponent() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const location = useLocation();
    const type = location.state.keyword;

    useEffect(() => {
        const fetchUsers = async () => {
            let res = null;
            try {
                switch (type) {
                    case 'user':
                        res = await friendService.getRequestPossible(localStorage.getItem('userId'), page);
                        break;
                    case 'friend':
                        res = await friendService.getFriend(localStorage.getItem('userId'), page);
                        break;
                    case 'block':
                        res = await friendService.getBlock(localStorage.getItem('userId'), page);
                        break;
                    case 'toMe':
                        res = await friendService.getRequestToMe(localStorage.getItem('userId'), page);
                        break;
                    case 'fromMe':
                        res = await friendService.getRequestFromMe(localStorage.getItem('userId'), page);
                        break;
                    default:
                        console.error("redux error");
                        return;

                }

                const feedItems = await Promise.all(res.data.items.map(async (item) => {
                    try {
                        const pictureRes = await friendService.getPicture(item.id);
                        const pictureUrl = URL.createObjectURL(pictureRes.data);
                        return { ...item, pictureUrl };
                    } catch (error) {
                        console.error("Error loading picture for item", item.id, error);
                        return { ...item, pictureUrl: 'defaultProfileImageURL' }; 
                    }
                }));
                setUsers(feedItems);
            } catch (error) {
                console.error("Feed loading failed: ", error);
            }
        };

        fetchUsers();
    }, [page, type]); 

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

    const getMenuItems = (type) => {
        switch (type) {
            case 'user':
                return (
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item">작성한 글 보기</button></li>
                        <li><button className="dropdown-item">친구 요청</button></li>
                        <li><button className="dropdown-item">차단</button></li>
                    </ul>
                );
            case 'friend':
                return (
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item">작성한 글 보기</button></li>
                        <li><button className="dropdown-item">친구 삭제</button></li>
                        <li><button className="dropdown-item">차단</button></li>
                    </ul>
                );
            case 'fromMe':
                return (
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item">취소</button></li>
                    </ul>
                );
            case 'toMe':
                return (
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item">수락</button></li>
                        <li><button className="dropdown-item">취소</button></li>
                    </ul>
                );
            case 'block':
                return (
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item">차단 해제</button></li>
                    </ul>
                );
            default:
                return []; 
        }
    };

    const renderUserList = () => {
        const defaultImageUrl = process.env.PUBLIC_URL + './user.png';
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
                            {getMenuItems(type)}
                            {}
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
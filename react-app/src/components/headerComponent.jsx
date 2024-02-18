import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function HeaderComponent() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.loginSlice.isLoggedIn);


    useEffect(() => {
        if (isLoggedIn) {
            console.log('welcome');
        } else {
            console.log('oops');
        }

        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLoggedIn]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = () => {
        if (searchQuery) {
            triggerNavigate(`/feed/search?keyword=${encodeURIComponent(searchQuery)}`);
        }
    };


    const triggerNavigate = (path, keyword = null) => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            if (keyword) {
                // 'type' 파라미터가 주어진 경우
                navigate(path, { state: { keyword:keyword }, replace: true });
            } else {
                // 'type' 파라미터가 없는 경우
                navigate(path);
            }
        } else {
            alert('로그인을 해주세요.');
            navigate('/signin');
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand text-light" href="/">
                        <img src={process.env.PUBLIC_URL + './logo.png'} alt="Logo" style={{ width: 50, height: 50, borderRadius: '50%', marginRight: '10px' }} />
                        PenguinTalk
                    </a>


                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <form className="d-flex" onSubmit={handleSearchSubmit}>
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={handleSearchChange} />
                                    <button className="btn btn-secondary me-3" type="submit">Search</button>
                                </form>
                            </li>

                            <li className="nav-item me-3">
                                <button className="btn btn-link text-light" onClick={() => triggerNavigate('/writing')} style={{ padding: 0 }}>
                                    <img src={process.env.PUBLIC_URL + './message.png'} alt="message" style={{ width: 30, height: 30 }} />
                                </button>
                            </li>
                            <li className="nav-item me-3">
                                <button className="btn btn-link text-light" style={{ padding: 0 }}>
                                    <img src={process.env.PUBLIC_URL + './tag.png'} alt="tag" style={{ width: 30, height: 30 }} />
                                </button>
                            </li>

                            <li className="nav-item dropdown me-3">
                                <button className="btn btn-link text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ padding: 0 }}>
                                    <img src={process.env.PUBLIC_URL + './friend.png'} alt="friend" style={{ width: 30, height: 30 }} />
                                </button>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={() => triggerNavigate('/userList', 'user')}>유저 목록</button></li>
                                    <li><button className="dropdown-item" onClick={() => triggerNavigate('/userList', 'friend')}>친구 목록</button></li>
                                    <li><button className="dropdown-item" onClick={() => triggerNavigate('/userList', 'fromMe')}>보낸 친구요청</button></li>
                                    <li><button className="dropdown-item" onClick={() => triggerNavigate('/userList', 'toMe')}>받은 친구요청</button></li>
                                    <li><button className="dropdown-item" onClick={() => triggerNavigate('/userList', 'block')}>차단 목록</button></li>
                                </ul>
                            </li>
                            <li className="nav-item me-3">
                                <button className="btn btn-link text-light" onClick={() => triggerNavigate('/userInfo')} style={{ padding: 0 }}>
                                    <img src={process.env.PUBLIC_URL + './user.png'} alt="user" style={{ width: 30, height: 30 }} />
                                </button>
                            </li>
                            <li className="nav-item me-3">
                                <button className="btn btn-link text-light" onClick={() => triggerNavigate('/writing')} style={{ padding: 0 }}>
                                    <img src={process.env.PUBLIC_URL + './writing.png'} alt="writing" style={{ width: 30, height: 30 }} />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default HeaderComponent;
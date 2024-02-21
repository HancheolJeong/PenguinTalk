import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import feedService from '../services/feedService';

function HeaderComponent() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.loginSlice.isLoggedIn);
    const location = useLocation();


    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await feedService.getTag(localStorage.getItem('userId'));
                setTags(res.data.items); // API 응답 형식에 따라 조정이 필요할 수 있습니다.
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    },[location])

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

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchQuery) {
            triggerNavigate('/', 'search', searchQuery);
        }
        // setSearchQuery('');
    };


    /**
     * 다른 url로 이동하는 함수
     * @param {string} path : 이동할 url
     * @param {string} param : state UserListComponent, feedComponent의 상태를 변경
     * @param {string} keyword : feedComponent의 검색 키워드
     */
    const triggerNavigate = (path, param = null, keyword = null) => {
        if (localStorage.getItem('isLoggedIn') === 'true') { // 로그인일때
            if (param) { // param 주어졌을때,

                if (keyword)  // keyword 주어졌을때,
                {
                    navigate(path, { state: { state: param, keyword: keyword } }); // feedComponent

                }
                else {
                    navigate(path, { state: { state: param } }); //userListComponent

                }
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
                    {/* <a className="navbar-brand text-light" href="/">
                        <img src={process.env.PUBLIC_URL + './logo.png'} alt="Logo" style={{ width: 50, height: 50, borderRadius: '50%', marginRight: '10px' }} />
                        PenguinTalk
                    </a> */}
                    <Link to="/" className="navbar-brand text-light">
                        <img src={process.env.PUBLIC_URL + './logo.png'} alt="Logo" style={{ width: 50, height: 50, borderRadius: '50%', marginRight: '10px' }} />
                        PenguinTalk
                    </Link>


                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <form className="d-flex" onSubmit={handleSearchSubmit}>
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={handleSearchChange} />
                                    <button className="btn btn-secondary me-3" type="submit">Search</button>
                                </form>
                            </li>

                            <li className="nav-item me-3">
                                <button className="btn btn-link text-light" onClick={() => triggerNavigate('/chat')} style={{ padding: 0 }}>
                                    <img src={process.env.PUBLIC_URL + './message.png'} alt="message" style={{ width: 30, height: 30 }} />
                                </button>
                            </li>
                            <li className="nav-item dropdown me-3">
                                <button className="btn btn-link text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ padding: 0 }}>
                                    <img src={process.env.PUBLIC_URL + './tag.png'} alt="tag" style={{ width: 30, height: 30 }} />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    {tags.map((item) => (
                                        <li>
                                            <button className="dropdown-item" onClick={() => triggerNavigate('', 'tag', item.p_id)}>
                                                {`${item.name}(${item.user_id})님께서 ${item.title} 게시글에 회원님을 태그하였습니다.`}
                                                <br />
                                                {item.comments}
                                                <br />
                                                {new Date(item.create_dt).toLocaleString()}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item me-3">
                                <button className="btn btn-link text-light" onClick={() => triggerNavigate('/userInfo')} style={{ padding: 0 }}>
                                    <img src={process.env.PUBLIC_URL + './user.png'} alt="user" style={{ width: 30, height: 30 }} />
                                </button>
                            </li>
                            <li className="nav-item dropdown me-3">
                                <button className="btn btn-link text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ padding: 0 }}>
                                    <img src={process.env.PUBLIC_URL + './friend.png'} alt="friend" style={{ width: 30, height: 30 }} />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><button className="dropdown-item" onClick={() => triggerNavigate('/userList', 'user')}>유저 목록</button></li>
                                    <li><button className="dropdown-item" onClick={() => triggerNavigate('/userList', 'friend')}>친구 목록</button></li>
                                    <li><button className="dropdown-item" onClick={() => triggerNavigate('/userList', 'fromMe')}>보낸 친구요청</button></li>
                                    <li><button className="dropdown-item" onClick={() => triggerNavigate('/userList', 'toMe')}>받은 친구요청</button></li>
                                    <li><button className="dropdown-item" onClick={() => triggerNavigate('/userList', 'block')}>차단 목록</button></li>
                                </ul>
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
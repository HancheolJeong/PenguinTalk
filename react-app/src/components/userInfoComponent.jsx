import React, { useState, useEffect, useRef } from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

function UserInfoComponent() {
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        fetchUserInformation();

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchUserInformation = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await userService.getUserInformation(userId);
            if (response.data.result === 'success' && response.data.items.length > 0) {
                const user = response.data.items[0];

                try {
                    const pictureRes = await userService.getPicture(user.id);
                    const pictureUrl = URL.createObjectURL(pictureRes.data);
                    user.pictureUrl = pictureUrl;
                } catch (error) {
                    console.error("Error fetching picture for user", user.id, error);
                    user.pictureUrl = 'defaultProfileImageUrl';
                }

                setUser(user);
            } else {
                console.error("User information fetch failed or no data returned");
            }
        } catch (error) {
            console.error("Error fetching user information:", error);
        }
    };

    /**
    * 서버에게 친구추가 요청하는 함수
    * @param {string} id : 사용자 Id 
    */
    const handleNavigateMyposts = async () => {
        navigate('/', { state: { state: 'findMine', userId: localStorage.getItem('userId') } });
    };


    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', false);
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleDeleteAccount = async () => {
        const isConfirmed = window.confirm("정말 탈퇴하시겠습니까?");
        if (isConfirmed) {
            try {
                await userService.deleteUser(localStorage.getItem('userId'));
                alert('회원 탈퇴 처리가 완료되었습니다.');
    
                handleLogout();
                navigate('/');
            } catch (error) {
                console.error("회원 탈퇴 중 오류 발생:", error);
                alert('회원 탈퇴 처리 중 문제가 발생했습니다. 다시 시도해 주세요.');
            }
        } else {
            // 사용자가 '아니오'를 선택한 경우, 아무런 동작을 하지 않음
        }
    };

    if (!user) {
        return <div>Loading user information...</div>;
    }

    const gender = user.gender === 0 ? 'Male' : 'Female';
    const formattedCreateDate = new Date(user.create_dt).toLocaleDateString();
    const defaultImageUrl = process.env.PUBLIC_URL + '/defaultProfileImageUrl.png';

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="bg-light p-5 rounded">
                        <div className="text-center mb-4">
                            <img src={user.pictureUrl || defaultImageUrl} alt="Profile" className="rounded-circle img-fluid" style={{ width: "100px", height: "100px" }} />
                        </div>
                        <h2 className="text-center mb-4">{user.name}의 프로필</h2>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">ID: {user.id}</li>
                            <li className="list-group-item">이름: {user.name}</li>
                            <li className="list-group-item">성별: {gender}</li>
                            <li className="list-group-item">가입 날짜: {formattedCreateDate}</li>
                        </ul>
                        <div className="mt-4 d-grid gap-2 d-md-flex justify-content-md-center">
                            <button className="btn btn-primary" onClick={() => handleNavigateMyposts()}>내가 작성한 글 보기</button>
                            <button className="btn btn-info" onClick={() => navigate('/userinfo/edit/info')}>회원 정보 수정</button>
                            <button className="btn btn-warning" onClick={() => navigate('/userinfo/edit/pw')}>비밀번호 변경</button>
                            <button className="btn btn-danger" onClick={handleDeleteAccount}>회원 탈퇴</button>
                            <button className="btn btn-secondary" onClick={handleLogout}>로그아웃</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfoComponent;
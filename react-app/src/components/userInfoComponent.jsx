import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { handleError } from './libs/handleError';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/loginSlice';
import { selectId, selectIsLoggedIn, selectToken } from '../slices/loginSlice';

function UserInfoComponent() {
    const [user, setUser] = useState(null); // 사용자 정보
    const navigate = useNavigate(); // 페이지 이동 훅
    const dispatch = useDispatch(); //Redux dispatch 함수 사용

    // redux store에서 로그인 상태, 토큰, 사용자 ID를 가져온다.
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const token = useSelector(selectToken);
    const userId = useSelector(selectId);

    // 컴포넌트가 마운트될 때 fetchUserInformation 함수 호출
    useEffect(() => {
        fetchUserInformation();
    }, []);

    /**
     * 사용자 정보를 불러오는 비동기 함수
     */
    const fetchUserInformation = async () => {
        try {
            const response = await userService.getUserInformation(userId, token);
            if (response.data.result === 'success' && response.data.items.length > 0) {
                const user = response.data.items[0];

                try {
                    const pictureRes = await userService.getPicture(user.id, token, userId);
                    const pictureUrl = URL.createObjectURL(pictureRes.data);
                    user.pictureUrl = pictureUrl;
                } catch (error) {
                    user.pictureUrl = `${process.env.PUBLIC_URL + './background2.png'}`; // 에러 발생할때는 기본이미지를 사용
                    handleError(error, navigate);
                }

                setUser(user);
            } else {
                console.error("User information fetch failed or no data returned");
            }
        } catch (error) {
            handleError(error, navigate);
        }
    };

    /**
    * 서버에게 친구추가 요청하는 함수
    * @param {string} userId : 사용자 Id 
    */
    const handleNavigateMyposts = async () => {
        navigate('/', { state: { state: 'findMine', userId: userId } });
    };


    /**
     * 로그아웃 처리하는 함수, 로그인 슬라이스에서 로그아웃으로 만들고 token과 id값을 빈문자열을 넣는다.
     * 그 다음에 / 으로 이동
     */
    const handleLogout = () => {
        dispatch(logout({ token: '', id: '' }));
        navigate('/');
    };

    /**
     * 회원 탈퇴하는 함수 탈퇴하고나서 /으로 이동한다.
     */
    const handleDeleteAccount = async () => {
        const isConfirmed = window.confirm("정말 탈퇴하시겠습니까?");
        if (isConfirmed) {
            try {
                await userService.deleteUser(userId, token);
                alert('회원 탈퇴 처리가 완료되었습니다.');

                handleLogout();
                navigate('/');
            } catch (error) {
                alert('회원 탈퇴 처리 중 문제가 발생했습니다. 다시 시도해 주세요.');
                handleError(error, navigate);
            }
        } else {
            // 사용자가 '아니오'를 선택한 경우, 아무런 동작을 하지 않음
        }
    };

    if (!user) {
        return <div>Loading user information...</div>;
    }

    const gender = user.gender === 0 ? '남자' : '여자';
    const formattedCreateDate = new Date(user.create_dt).toLocaleDateString();
    const defaultImageUrl = `${process.env.PUBLIC_URL + './background2.png'}`;;

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

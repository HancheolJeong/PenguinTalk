import React, { useState, useEffect } from 'react';
import userService from '../services/userService'; // Ensure this is correctly set up
import { useNavigate } from 'react-router-dom';
import { handleError } from './libs/handleError';
import { useSelector } from 'react-redux';
import { selectId, selectIsLoggedIn, selectToken } from '../slices/loginSlice';

/**
 * 사용자 정보를 편집하고 업데이트하는 컴포넌트
 */
function UserEditComponent() {
    const [name, setName] = useState(''); // 사용자 이름
    const [gender, setGender] = useState(''); // 사용자 성별
    const [birthday, setBirthday] = useState(''); // 사용자 생일
    const [profilePicture, setProfilePicture] = useState(null); // 사용자 
    const navigate = useNavigate(); // 페이지 이동 훅

    // redux store에서 로그인 상태, 토큰, 사용자 ID를 가져온다.
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const token = useSelector(selectToken);
    const userId = useSelector(selectId);
    const formatDateToYYYYMMDD = (date) => { // 날짜를 YYYY-MM-DD로 포맷팅하는 함수
        return date ? new Date(date).toISOString().slice(0, 10) : '';
    };

    useEffect(() => {
        fetchUserInformation();
    }, []);

    /**
     * 사용자 정보를 서버에서 불러오는 함수
     */
    const fetchUserInformation = async () => {
        try {
            const response = await userService.getUserInformation(userId, token);
            if (response.data.result === 'success' && response.data.items.length > 0) {
                const user = response.data.items[0];

                setName(user.name);
                setGender(user.gender === 0 ? 'Male' : 'Female');
                setBirthday(formatDateToYYYYMMDD(user.birthday));
                try {
                    const pictureRes = await userService.getPicture(user.id, token, userId);
                    const pictureUrl = URL.createObjectURL(pictureRes.data);
                    user.pictureUrl = pictureUrl;
                } catch (error) {
                    user.pictureUrl = `${process.env.PUBLIC_URL + './background2.png'}`;;
                    handleError(error, navigate);
                }
            } else {

            }
        } catch (error) {
            handleError(error, navigate);
        }
    };

    /**
     * 프로필 사진 변경 핸들러
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    /**
     * 전송 버튼시 발생하는 이벤트 핸들러 
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (profilePicture) { // 사진이 있을때만 사진 업로드
            const pictureFormData = new FormData();
            pictureFormData.append('id', userId); // 사용자 ID
            pictureFormData.append('picture', profilePicture); // 프로필 사진
            try {

                const pictureRes = await userService.updateUserPicture(pictureFormData, token);
                if (pictureRes.data.result !== "success") {
                    alert('이미지 업로드 중 에러가 발생했습니다.');
                }
            } catch (error) {
                handleError(error, navigate);
            }
        }
        try {
            const modRes = await userService.updateUser(userId, name, birthday, gender === 'Male' ? 0 : 1, token); // 나머지 다른 정보도 업데이트
            if (modRes.data.result === "success") {
                alert('업데이트 완료했습니다.');
                navigate('/userinfo')
            }
            else {
                alert('업데이트 실패했습니다.');
            }
        }
        catch (error) {
            handleError(error, navigate);
        }



    };

    return (
        <div className="container my-4 ">
            <h2>회원 정보 수정</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="profilePicture" className="form-label">프로필 사진</label>
                    <input className="form-control" type="file" id="profilePicture" onChange={handleProfilePictureChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="birthday" className="form-label">Birthday</label>
                    <input type="date" className="form-control" id="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
        </div>
    );
}

export default UserEditComponent;
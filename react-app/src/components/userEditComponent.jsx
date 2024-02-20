import React, { useState, useEffect } from 'react';
import userService from '../services/userService'; // Ensure this is correctly set up
import { useNavigate } from 'react-router-dom';

function UserEditComponent() {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const defaultImageUrl = process.env.PUBLIC_URL + '/defaultProfileImageUrl.png';
    const navigate = useNavigate();
    const formatDateToYYYYMMDD = (date) => {
        return date ? new Date(date).toISOString().slice(0, 10) : '';
      };
    useEffect(() => {
        fetchUserInformation();
    }, []);

    const fetchUserInformation = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await userService.getUserInformation(userId);
            if (response.data.result === 'success' && response.data.items.length > 0) {
                const user = response.data.items[0];

                setName(user.name);
                setGender(user.gender === 0 ? 'Male' : 'Female');
                setBirthday(formatDateToYYYYMMDD(user.birthday));
                setUser(user); // Store the user data in state

                try {
                    const pictureRes = await userService.getPicture(user.id);
                    const pictureUrl = URL.createObjectURL(pictureRes.data);
                    user.pictureUrl = pictureUrl;
                } catch (error) {
                    console.error("Error fetching picture for user", user.id, error);
                    user.pictureUrl = defaultImageUrl;
                }
            } else {
                console.error("User information fetch failed or no data returned");
            }
        } catch (error) {
            console.error("Error fetching user information:", error);
        }
    };

    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');

        if (profilePicture) {
            const pictureFormData = new FormData();
            pictureFormData.append('id', userId);
            pictureFormData.append('picture', profilePicture);
            try{

                const pictureRes = await userService.updateUserPicture(pictureFormData);
                if(pictureRes.data.result !== "success")
                {
                    alert('이미지 업로드 중 에러가 발생했습니다.');
                }
            }catch(error)
            {
                console.log('error : ', error);
            }
        }

        const modRes = await userService.updateUser(userId, name, birthday, gender === 'Male' ? 0 : 1);
        if(modRes.data.result === "success")
        {
            alert('업데이트 완료했습니다.');
            navigate('/userinfo')
        }
        else
        {
            alert('업데이트 실패했습니다.');
        }

        console.log('Profile and user information updated');
    };

    return (
        <div className="container my-4">
            <h2>회원 정보 수정</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <img src={user.pictureUrl || defaultImageUrl} alt="Profile" className="rounded-circle img-fluid" style={{ width: "100px", height: "100px" }} />
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
                        <option value="Other">Other</option>
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
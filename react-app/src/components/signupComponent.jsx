import React, { useState } from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import {handleError} from './libs/handleError';

function SignUpComponent() {
    const today = new Date().toISOString().split('T')[0]; 
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState(today); 
    const [gender, setGender] = useState('0'); 
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'id':
                setId(value);
                break;
            case 'pw':
                setPw(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'birthday':
                setBirthday(value);
                break;
            case 'gender':
                setGender(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await userService.addUser(id, pw, name, birthday, parseInt(gender, 10));
            const { data } = response;

            if (data.result === 'success') {
                alert('회원가입 완료했습니다.');
                navigate('/signin'); 
            } else {
                setErrorMessage('회원가입 실패했습니다 다시 시도해주세요.');
            }
        } catch (error) {
            setErrorMessage('회원가입중에 에러가 발생했습니다.');
            handleError(error, navigate);
        }
    };

    return (
        <div className='signin-background'>
            <div className='signin-container'>
                <form onSubmit={handleSubmit} className="p-4 bg-light border rounded-3">
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">ID:</label>
                        <input type="text" className="form-control" name="id" value={id} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pw" className="form-label">패스워드:</label>
                        <input type="password" className="form-control" name="pw" value={pw} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">이름:</label>
                        <input type="text" className="form-control" name="name" value={name} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="birthday" className="form-label">생일:</label>
                        <input type="date" className="form-control" name="birthday" value={birthday} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">성별:</label>
                        <select className="form-select" name="gender" value={gender} onChange={handleInputChange}>
                            <option value="0">남자</option>
                            <option value="1">여자</option>
                        </select>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">회원가입</button>
                    </div>
                    {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
}

export default SignUpComponent;

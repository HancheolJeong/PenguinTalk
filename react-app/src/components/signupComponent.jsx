import React, { useState } from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import {handleError} from './libs/handleError';

function SignUpComponent() {
    const today = new Date().toISOString().split('T')[0]; 
    const [id, setId] = useState(''); //사용자 ID
    const [pw, setPw] = useState(''); // 사용자 패스워드
    const [name, setName] = useState(''); // 사용자 이름
    const [birthday, setBirthday] = useState(today);  //사용자 생일
    const [gender, setGender] = useState('0'); //사용자 성별
    const [errorMessage, setErrorMessage] = useState(''); // 에러메시지상태

    const navigate = useNavigate(); // 페이지 이동 훅

    // 입력값 변경할때 동작하는 이벤트 핸들러 값을 저장한다.
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

    // 전송 버튼 이벤트 핸들러
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await userService.addUser(id, pw, name, birthday, parseInt(gender, 10)); // 회원가입 요청
            const { data } = response;

            if(data.result === 'a breach of rules') // KISA 패스워드 가이드 규칙을 준수했는지?
            {
                alert('패스워드는 영문자,숫자,특수기호를 포함해서 8자리 이상이어야 합니다.');
            }else if (data.result === 'success') { // 성공
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

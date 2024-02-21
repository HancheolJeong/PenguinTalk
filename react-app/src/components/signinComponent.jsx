import React, { useState, useContext } from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {login, logout} from '../slices/loginSlice';

function SignInComponent() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'id') {
            setId(value);
        } else if (name === 'pw') {
            setPw(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await userService.loginUser(id, pw);
            const { data } = response;

            if (data.result === 'success') {

                dispatch(login(data.token))
                sessionStorage.setItem('isLoggedIn', true);
                sessionStorage.setItem('userId', id);
                sessionStorage.setItem('token', data.token);


                navigate('/'); 
            } else {
                setErrorMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error("Login error: ", error);
            setErrorMessage('An error occurred during login.');
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
                    <div className="d-grid gap-2 mb-3">
                        <button type="submit" className="btn btn-primary">로그인</button>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" onClick={() => navigate('/signup')}>회원가입</button>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
}

export default SignInComponent;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import {handleError} from './libs/handleError';
import { selectId, selectIsLoggedIn, selectToken } from '../slices/loginSlice';
import { useSelector } from 'react-redux';

function EditPasswordComponent() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const token = useSelector(selectToken);
    const userId = useSelector(selectId);

    const verifyCurrentPassword = async () => {
        try {
            const response = await userService.confirmPassword(userId, currentPassword, token);
            const { data } = response;
            if (data.result === 'success') {
                // Move to next step
                setStep(2);
            } else {
                alert('패스워드가 정확하지 않습니다.');
            }
        } catch (error) {
            alert('에러가 발생했습니다.');
            handleError(error, navigate);
        }
    };

    const updatePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            alert('패스워드가 일치하지 않습니다.');
            return;
        }
        try {
            const res = await userService.updateUserPassword(userId, newPassword, token);

            if(res.data.result === 'a breach of rules')
            {
                alert('패스워드는 영문자,숫자,특수기호를 포함해서 8자리 이상이어야 합니다.');
            }else if (res.data.result === 'success') {
                alert('패스워드 변경 성공했습니다.');
                navigate('/userinfo');
            } else {
                alert('패스워드 변경 실패했습니다.');
            }
        } catch (error) {
            alert('패스워드 변경중에 에러가 발생했습니다.');
            handleError(error, navigate);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {step === 1 && (
                        <div className="card shadow">
                            <div className="card-body">
                                <h2 className="card-title text-center">패스워드 확인</h2>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="현재 패스워드"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-primary" onClick={verifyCurrentPassword}>확인</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="card shadow">
                            <div className="card-body">
                                <h2 className="card-title text-center">새로운 패스워드 입력</h2>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="새로운 패스워드"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="패스워드 재입력"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-success" onClick={updatePassword}>변경</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditPasswordComponent;
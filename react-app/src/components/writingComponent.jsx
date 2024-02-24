import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import feedService from '../services/feedService';
import { useNavigate } from 'react-router-dom'; 
import {handleError} from './libs/handleError';
import { selectId, selectIsLoggedIn, selectToken } from '../slices/loginSlice';
import { useSelector } from 'react-redux';

function WritingComponent() {
    const [title, setTitle] = useState(''); // 글제목
    const [body, setBody] = useState(''); // 본문
    const [scope, setScope] = useState('0'); // 공개 범위
    const navigate = useNavigate(); // 페이지 이동 훅

    // redux store에서 로그인 상태, 토큰, 사용자 ID를 가져옵니다.
    const isLoggedIn = useSelector(selectIsLoggedIn); 
    const token = useSelector(selectToken);
    const userId = useSelector(selectId);


    /**
     * 입력 필드에서 제목 변경 사항을 저장하는 함수
     * @param {React.ChangeEvent<HTMLInputElement>} e : 이벤트 객체
     */
    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    /**
     * 입력 필드에서 본문 변경 사항을 저장하는 함수
     * @param {React.ChangeEvent<HTMLInputElement>} event : 이벤트 객체
     * @param {CKEditor} editor : 텍스트 에디터 인스턴스
     */
    const onBodyChange = (event, editor) => {
        const data = editor.getData();
        setBody(data);
    };

    /**
     * 드롭다운에서 변경 사항을 저장하는 함수
     * @param {React.ChangeEvent<HTMLInputElement>} e : 이벤트 객체
     */
    const onScopeChange = (e) => {
        setScope(e.target.value);
    };

    /**
     * 전송버튼 클릭 시 실행되는 핸들러로 서버에게 정보를 전달하고 요청받으면 / 으로 이동합니다.
     * @param {React.ChangeEvent<HTMLInputElement>} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        feedService.addFeed(userId, title, body, scope, token)
            .then(response => {
                navigate('/');
            })
            .catch(error => {
                handleError(error, navigate);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">제목</label>
                <input type="text" className="form-control" id="title" value={title} onChange={onTitleChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">본문</label>
                <CKEditor editor={ClassicEditor} data={body} onChange={onBodyChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="scope" className="form-label">공개 범위</label>
                <select className="form-select" value={scope} onChange={onScopeChange}>
                    <option value="0">전체</option>
                    <option value="1">친구</option>
                    <option value="2">나만</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">전송</button>
        </form>
    );
}

export default WritingComponent;
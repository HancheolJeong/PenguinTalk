import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import feedService from '../services/feedService';
import { useNavigate } from 'react-router-dom'; 

function WritingComponent() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [scope, setScope] = useState('0'); 
    const navigate = useNavigate(); 

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onBodyChange = (event, editor) => {
        const data = editor.getData();
        setBody(data);
    };

    const onScopeChange = (e) => {
        setScope(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = sessionStorage.getItem('userId'); 

        feedService.addFeed(userId, title, body, scope)
            .then(response => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error submitting post:', error);
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
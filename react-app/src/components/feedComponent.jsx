import React, { useState, useEffect } from 'react';
import feedService from '../services/feedService';
import { MentionsInput, Mention } from 'react-mentions';
import friendService from '../services/friendService';


function FeedComponent() {
    const [feed, setFeed] = useState([]); //feed 정보 배열
    const [page, setPage] = useState(1); // feed page
    const [isLoading, setIsLoading] = useState(false); // 
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [comments, setComments] = useState([]); // 댓글 정보 배열
    const [commentsPage, setCommentsPage] = useState(1); //댓글 팝업 페이지
    const [newComment, setNewComment] = useState(''); // 테스트용
    const [tags, setTags] = useState([]); // 태그된 id 배열
    const [inputComment, setInputComment] = useState(''); // insert될 댓글
    const [friends, setFriends] = useState([ // 나의 친구 목록
        { id: "hancheol", display: "한철" },
        { id: "ms", display: "민수" },
    ]);

    useEffect(() => {
        fetchFeed();
    }, [page]); 

    const fetchComments = async (itemId, page = 1) => {
        setIsLoading(true);
        try {
            const commentsRes = await feedService.getComment(itemId, page); 
            console.log(commentsRes);
            setComments(commentsRes.data.items);
            setCommentsPage(page);
        } catch (error) {
            console.error("Error loading comments:", error);
            setComments([]);
        } finally {
            setIsLoading(false);
        }
    };

    const openPopup = async (item) => {
        setCommentsPage(1);
        fetchComments(item.id, 1);
        setIsPopupVisible(true);
        setSelectedItem(item);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const handleNextCommentsPage = () => {
        const nextPage = commentsPage + 1;
        fetchComments(selectedItem.id, nextPage);
    };

    const handlePrevCommentsPage = () => {
        const prevPage = Math.max(1, commentsPage - 1);
        fetchComments(selectedItem.id, prevPage);
    };

    const submitComment = async (itemId) => {
        console.log("Submitting comment:", newComment);

        setNewComment(''); 
    };
    const fetchFeed = async () => {
        setIsLoading(true);
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            try {
                const friendsRes = await friendService.getFriendAll(localStorage.getItem('userId'));
                if (friendsRes.data.result === "success") {
                    const friendsData = friendsRes.data.items.map(friend => ({
                        id: friend.id,
                        display: friend.name,
                    }));
                    setFriends(friendsData);
                }
            } catch (error) {
                console.error("Error loading friends:", error);
            }
        }

        try {
            const res = isLoggedIn ? await feedService.getFeedLoggedIn(localStorage.getItem('userId'), page) : await feedService.getFeed(page);
            const feedItems = res.data.items;
            for (let item of feedItems) {
                try {
                    const pictureRes = await feedService.getPicture(item.user_id);
                    const pictureUrl = URL.createObjectURL(pictureRes.data);
                    item.pictureUrl = pictureUrl;
                } catch (error) {
                    console.error("Error loading picture for item", item.user_id, error);
                    item.pictureUrl = 'defaultProfileImageURL';
                }
            }
            setFeed(feedItems);
        } catch (error) {
            console.error("Feed loading failed: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderFeedItem = (item) => {
        const defaultImageUrl = process.env.PUBLIC_URL + './user.png';
        return (
            <div key={item.id} className="card mb-3" style={{ maxWidth: '50%', margin: '0 auto' }}>
                <div className="card-header bg-primary text-light">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <img src={item.pictureUrl || defaultImageUrl} alt="Profile" className="rounded-circle me-2" style={{ width: 50, height: 50 }} />
                            <div>
                                <h5 className="mb-0" >{item.name}</h5>
                                <small>{new Date(item.create_dt).toLocaleString()}</small>
                            </div>
                        </div>
                        <button className="btn btn-outline-secondary btn-primary text-light" type='button' data-bs-toggle="dropdown" aria-expanded="false" style={{ borderColor: 'white' }}>
                            ☰
                        </button>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item" >수정</button></li>
                            <li><button className="dropdown-item" >삭제</button></li>
                            <li><button className="dropdown-item" >신고</button></li>
                        </ul>

                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <div className="card-text" dangerouslySetInnerHTML={{ __html: item.content_url }}></div>
                </div>
                <div className="card-footer">
                    <button type="button" className="btn btn-primary" onClick={() => openPopup(item)}>댓글: {item.count_comment}</button>
                </div>
            </div>
        );
    };

    const renderPagination = () => {
        return (
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setPage((prevPage) => Math.max(1, prevPage - 1))}>이전 페이지</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link" onClick={() => setPage((prevPage) => prevPage + 1)}>다음 페이지</button>
                    </li>
                </ul>
            </nav>
        );
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {feed.map(renderFeedItem)}
                    {renderPagination()}
                    <div className="feed-container">
                        {isPopupVisible && selectedItem && (
                            <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
                                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">{selectedItem.title}</h5>
                                            <button type="button" className="btn-close" onClick={closePopup}></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="list-group list-group-flush">
                                                {comments.map((comment) => (
                                                    <div key={comment.id} className="list-group-item">
                                                        <div className="mb-1">
                                                            <strong>{comment.user_id}</strong>
                                                            <p className="mb-1">{comment.content}</p>
                                                            <small>{new Date(comment.create_dt).toLocaleString()}</small>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <MentionsInput
                                                value={inputComment}
                                                onChange={(event, newValue, newPlainTextValue, mentions) => {
                                                    setInputComment(newValue);
                                                    setTags(mentions);
                                                }}
                                                style={{
                                                    control: {
                                                        backgroundColor: '#fff',
                                                        fontSize: '14px',
                                                        fontWeight: 'normal',
                                                    },
                                                    suggestions: {
                                                        border: '1px solid #ccc',
                                                        borderRadius: '4px',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                        maxHeight: '150px',
                                                        minWidth: '400px',
                                                        overflowY: 'auto',
                                                        padding: '5px',
                                                        backgroundColor: 'white',
                                                        color: 'black',
                                                    },
                                                    suggestion: {
                                                        backgroundColor: '#f0f0f0',
                                                        cursor: 'pointer',
                                                    }
                                                }}
                                            >
                                                <Mention
                                                    trigger="@"
                                                    data={friends}
                                                    className="mentionsMention"
                                                    renderSuggestion={(suggestion, search, highlightedDisplay, index, focused) => (
                                                        <div className={`user ${focused ? "focused" : ""}`}>
                                                            {highlightedDisplay}
                                                        </div>
                                                    )}
                                                />
                                            </MentionsInput>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-primary" disabled={commentsPage === 1} onClick={handlePrevCommentsPage}>Previous</button>
                                            <button className="btn btn-primary" onClick={handleNextCommentsPage}>Next</button>
                                            <button className="btn btn-primary" onClick={() => submitComment(selectedItem.id)}>Submit Comment</button>
                                            <button className="btn btn-secondary" onClick={closePopup}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );




}
export default FeedComponent;
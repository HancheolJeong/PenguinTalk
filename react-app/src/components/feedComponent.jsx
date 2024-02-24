import React, { useState, useEffect } from 'react';
import feedService from '../services/feedService';
import { MentionsInput, Mention } from 'react-mentions';
import friendService from '../services/friendService';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleError } from './libs/handleError';
import { selectId, selectIsLoggedIn, selectToken } from '../slices/loginSlice';
import { useSelector } from 'react-redux';

function FeedComponent() {
    const [feed, setFeed] = useState([]); //feed 정보 배열
    const [page, setPage] = useState(1); // feed page
    const [isLoading, setIsLoading] = useState(false); // 비동기 작업 호출 확인
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [comments, setComments] = useState([]); // 댓글 정보 배열
    const [commentsPage, setCommentsPage] = useState(1); //댓글 팝업 페이지
    const [tags, setTags] = useState([]); // 태그된 id 배열
    const [inputComment, setInputComment] = useState(''); // insert될 댓글
    const [friends, setFriends] = useState([]); // 나의 친구 목록


    // redux store에서 로그인 상태, 토큰, 사용자 ID를 가져온다.
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const token = useSelector(selectToken);
    const myId = useSelector(selectId);

    const navigate = useNavigate();  // 페이지 이동 훅
    const location = useLocation(); // 페이지의 위치와 상태를 관리하는 훅
    let state = location.state?.state || 'common'; // 페이지 상태 (로그인, 로그아웃, 검색, 나, 친구, 모르는 유저)
    let keyword = location.state?.keyword || ''; // 검색어 키워드
    let userId = location.state?.userId || ''; // post_id

    /**
     * 피드 정보 불러오는 useEffect 훅
     */
    useEffect(() => {
        fetchFeed();
    }, [page, state]);

    /**
     * 상태나 위치가 변경할때 피드를 새로 불러오고 페이지를 첫번째로 설정
     */
    useEffect(() => {
        fetchFeed();
        setPage(1);
    }, [state, location]);

    /**
     * 특정 피드의 댓글을 불러오는 함수
     * @param {int} itemId : 피드 ID
     * @param {int} page : 페이지 번호
     */
    const fetchComments = async (itemId, page = 1) => { 
        setIsLoading(true);
        try {
            const commentsRes = await feedService.getComment(itemId, page, token, myId);
            setComments(commentsRes.data.items);
            setCommentsPage(page);
        } catch (error) {
            setComments([]);
            handleError(error, navigate)
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * 팝업창 띄우고 댓글을 로드하는 함수
     * @param {*} item 
     * @returns 
     */
    const openPopup = async (item) => {
        if (!isLoggedIn) {
            alert('로그인을 해주세요.');
            navigate('/signin');
            return;
        }

        setCommentsPage(1); // 댓글 페이지 상태 1로 저장
        fetchComments(item.id, 1); // 피드 ID와 첫번째 페이지 값을 주고 댓글 불러오기
        setIsPopupVisible(true); // 팝업 보이기
        setSelectedItem(item); // 선택된 item 업데이트
    };

    /**
     * 팝업을 닫고 피드 로드하는 함수
     */
    const closePopup = () => {
        setIsPopupVisible(false);
        fetchFeed();
    };

    /**
     * 다음 페이지로 이동하고 피드 로드하는 함수
     */
    const handleNextCommentsPage = () => {
        const nextPage = commentsPage + 1;
        fetchComments(selectedItem.id, nextPage);
    };

    /**
     * 이전 페이지로 이동하고 피드 로드하는 함수
     */
    const handlePrevCommentsPage = () => {
        const prevPage = Math.max(1, commentsPage - 1);
        fetchComments(selectedItem.id, prevPage);
    };

    /**
     * 특정 피드 삭제를 요청하는 함수
     * @param {int} post_id : 피드 ID
     * @param {string} user_id : 게시글 작성한 사용자 ID
     * @returns 
     */
    const handleDeleteItem = async (post_id, user_id) => {

        if (!isLoggedIn) {
            alert("로그인을 해주세요.");
            navigate('/signin');
            return;
        }


        const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
        if (isConfirmed) {
            if (user_id === myId) {
                try {
                    const res = await feedService.deleteFeed(post_id, token);
                    if (res.data.result === "success") {
                        alert("게시글 삭제 완료했습니다.");
                        fetchFeed();
                    } else {
                        alert("게시글 삭제 실패했습니다.");
                    }
                } catch (error) {
                    alert("게시글 삭제 실패했습니다.");
                    handleError(error, navigate);
                }
            } else {
                alert("자신의 게시글만 삭제할 수 있습니다.");
            }
        }

    };

    /**
     * 게시글id, 유저id, 댓글내용, 태그를 서버에 저장을 요청하는 함수
     * @param {string} post_id : 게시글 id
     * 요청에 성공하면 팝업창은 리로드가 되고 입력 필드, 사용자 목록은 초기화 됩니다,.
     */
    const submitComment = async (post_id) => {
        let comment = inputComment;
        tags.forEach(tag => {
            const tagRegex = new RegExp(`@\\[${tag.display}\\]\\(${tag.id}\\)`, 'g');
            comment = comment.replace(tagRegex, `@${tag.display} `);
        });
        const idArray = tags.map(tag => tag.id);

        try {

            const res = await feedService.addComment(post_id, myId, comment, idArray, token);
            if (res.data.result === "fail") {
                alert("댓글 추가 실패했습니다...");
            } else {

                await fetchComments(post_id, commentsPage); //팝업창 리로드
                setInputComment(''); // 입력 필드 초기화
                setTags([]); // 태그된 사용자 목록 초기화 
            }
        } catch (error) {
            handleError(error, navigate)
        }

    };
    const fetchFeed = async () => {
        window.scrollTo(0, 0); //최상단 스크롤 위치로 이동
        setIsLoading(true);
        if (isLoggedIn) { // 로그인한 경우에만 친구목록을 가져올수있다.
            try {
                const friendsRes = await friendService.getFriendAll(myId, token);
                if (friendsRes.data.result === "success") {
                    const friendsData = friendsRes.data.items.map(friend => ({
                        id: friend.id,
                        display: friend.name,
                    }));
                    setFriends(friendsData);
                }
            } catch (error) {
                handleError(error, navigate);
            }
        }

        try {
            let res;
            if (isLoggedIn) // 로그인일때
            {
                switch (state) {
                    case 'common': // 모든 게시글
                        res = await feedService.getFeedLoggedIn(myId, page, token);
                        break;
                    case 'search':// 게시글 검색
                        res = await feedService.getSearchedFeedLoggedIn(myId, page, keyword, token);
                        break;
                    case 'findMine': // 내가 작성한 게시글
                        res = await feedService.getMyPosts(myId, page, token);
                        break;
                    case 'findFriends': // 친구가 작성한 게시글
                        res = await feedService.getFriendPosts(userId, page, token, myId);
                        break;
                    case 'findNonFriends': // 다른 유저가 작성한 게시글
                        res = await feedService.getNonFriendPosts(userId, page, token, myId);
                        break;
                    case 'tag': // 태그된 게시물
                        res = await feedService.getPostWithTags(keyword, token, myId);
                        break;
                    default: // 해당 사항이 없음..
                        console.log('feedComponent.jsx not found state');
                        res = await feedService.getFeedLoggedIn(myId, page, token)
                        break;

                }
            }
            else//로그아웃일때
            {
                switch (state) {
                    case 'common': // 모든 게시글
                        res = await feedService.getFeed(page)
                        break;
                    default: // 해당 사항이 없음..
                        console.log('feedComponent.jsx not found state');
                        res = await feedService.getFeed(page)
                        break;

                }
            }

            const feedItems = res.data.items;
            for (let item of feedItems) {
                try {
                    const pictureRes = await feedService.getPicture(item.user_id);
                    const pictureUrl = URL.createObjectURL(pictureRes.data);
                    item.pictureUrl = pictureUrl;
                } catch (error) {
                    console.error("Error loading picture for item", item.user_id, error);
                    item.pictureUrl = `${process.env.PUBLIC_URL + './background2.png'}`;;
                }
            }
            setFeed(feedItems);
        } catch (error) {
            handleError(error, navigate);
        } finally {
            setIsLoading(false);
        }
    };

    const renderFeedItem = (item) => {
        const defaultImageUrl = `${process.env.PUBLIC_URL + './background2.png'}`;
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
                            <li><button className="dropdown-item" onClick={() => handleDeleteItem(item.id, item.user_id)}>삭제</button></li>
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
                    {isLoading ? (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            {feed.map(renderFeedItem)}
                            {renderPagination()}
                            {/* 기타 컴포넌트 렌더링 */}
                        </>
                    )}
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
                                                className="mentionsInput"
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
                                            <button className="btn btn-primary" disabled={commentsPage === 1} onClick={handlePrevCommentsPage}>이전 페이지</button>
                                            <button className="btn btn-primary" onClick={handleNextCommentsPage}>다음 페이지</button>
                                            <button className="btn btn-primary" onClick={() => submitComment(selectedItem.id)}>전송</button>
                                            <button className="btn btn-secondary" onClick={closePopup}>닫기</button>
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
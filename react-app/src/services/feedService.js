import axios from 'axios';

const FEED_BASE_URL = "http://localhost:3000/feed";

class feedService {

    /**
     * HTTP GET 요청으로 서버에서 피드를 가져오는 함수 (로그아웃 상태)
     * @param {int} page : 요청 페이지
     * @returns 
     */
    getFeed(page) {
        return axios.get(FEED_BASE_URL, {
            params: { page: page }
        });
    }

    /**
     * HTTP GET 요청으로 검색어로 서버에서 피드를 가져오는 함수 (로그아웃 상태, 미사용)
     * @param {int} page : 요청 페이지
     * @param {string} keyword : 검색어
     * @returns 
     */
    getSearchedFeed(page, keyword) {
        return axios.get(FEED_BASE_URL + '/search', {
            params: { page: page, keyword: keyword }

        });
    }

    /**
     * HTTP GET 요청으로 서버에서 피드를 가져오는 함수 (로그인 상태)
     * @param {string} id : 사용자 ID
     * @param {int} page : 페이지 번호
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    getFeedLoggedIn(id, page, token) {
        return axios.get(FEED_BASE_URL + '/home',
            {
                params:
                {
                    user_id: id,
                    page: page
                },
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }

            });
    }
    /**
     * HTTP GET 요청으로 검색어로 서버에서 피드를 가져오는 함수 (로그인 상태)
     * @param {string} id 
     * @param {int} page 
     * @param {string} keyword 
     * @param {string} token 
     * @returns 
     */
    getSearchedFeedLoggedIn(id, page, keyword, token) {
        return axios.get(FEED_BASE_URL + '/search',
            {
                params:
                {
                    user_id: id,
                    page: page,
                    keyword: keyword
                },
                headers:
                {

                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * HTTP GET 요청으로 내가 작성한 피드를 서버에서 가져오는 함수
     * @param {string} id : 사용자 ID
     * @param {string} page : 페이지 번호
     * @param {string} token : 사용자 인증 jwt
     * @returns json
     */
    getMyPosts(id, page, token) {
        return axios.get(FEED_BASE_URL + '/my',
            {
                params:
                {
                    user_id: id,
                    page: page
                },
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * HTTP GET 요청으로 친구가 작성한 피드를 서버에서 가져오는 함수
     * @param {string} id : 사용자 ID
     * @param {int} page : 페이지 번호
     * @param {string} token : 사용자 인증 jwt
     * @returns json
     */
    getFriendPosts(id, page, token, user_id) {
        return axios.get(FEED_BASE_URL + '/friend',
            {
                params:
                {
                    id: id,
                    page: page,
                    user_id: user_id
                },
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * HTTP GET 요청으로 친구가 아닌 사용자가 작성한 피드를 서버에서 가져오는 함수
     * @param {string} id : 친구가 아닌 모르는 사용자 ID
     * @param {int} page : 페이지 번호
     * @param {string} token : 사용자 인증 jwt
     * @param {string} user_id : 사용자 ID
     * @returns json
     */
    getNonFriendPosts(id, page, token, user_id) {
        return axios.get(FEED_BASE_URL + '/nonfriend',
            {
                params:
                {
                    id: id,
                    page: page,
                    user_id: user_id
                },
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * HTTP GET 요청으로 사용자가 태그된 피드를 서버에서 가져오는 함수
     * @param {int} id : 피드 ID
     * @param {string} token : 사용자 인증 jwt
     * @param {string} user_id : 사용자 ID
     * @returns 
     */
    getPostWithTags(id, token, user_id) {
        return axios.get(FEED_BASE_URL + '/postId',
            {
                params:
                {
                    id: id,
                    user_id: user_id
                },
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * HTTP GET 요청으로 사용자의 사진을 서버에서 가져오는 함수
     * @param {string} id : 사용자 ID
     * @returns 
     */
    getPicture(id) {
        return axios.get(FEED_BASE_URL + '/get/img', {
            params:
                { id: id },
            responseType: 'blob'
        });
    }


    /**
     * HTTP POST 요청으로 피드를 서버로 저장하는 함수
     * @param {string} id : 사용자 ID
     * @param {string} title : 제목
     * @param {string} content_url : 피드 HTML
     * @param {int} scope : 범위 0:전체 1:친구 2:나만
     * @param {string} token : 사용자 인증 JWT
     * @returns 
     */
    addFeed(id, title, content_url, scope, token) {
        return axios.post(FEED_BASE_URL + '/add', {
            id: id,
            title: title,
            content_url: content_url,
            scope: scope
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    }


    /**
     * HTTP PUT 요청으로 서버에서 피드를 수정하는 함수
     * @param {int} id : 피드 ID
     * @param {string} title : 제목
     * @param {string} content_url : 피드 HTML
     * @param {int} scope : 공개 범위
     * @param {string} token : 사용자 인증 JWT
     * @returns 
     */
    updateFeed(id, title, content_url, scope, token) { //미사용
        return axios.put(FEED_BASE_URL + '/mod', {
            id: id,
            title: title,
            content_url: content_url,
            scope: scope
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * HTTP DELETE 요청으로 피드를 서버에서 삭제하는 함수
     * @param {int} id : 피드 ID
     * @param {string} token : 사용자 인증 JWT
     * @returns 
     */
    deleteFeed(id, token) {
        return axios.delete(FEED_BASE_URL + '/del',
            {
                data: 
                {
                    id: id
                },
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            },
        );
    }

    /**
     * HTTP GET 요청으로 댓글을 서버에서 가져오는 함수
     * @param {int} post_id : 피드 ID
     * @param {int} page : 페이지 번호
     * @param {string} token : 사용자 인증 jwt
     * @param {string} user_id : 사용자 ID, GET 위조 방지를 위해서 보냅니다.
     * @returns 
     */
    getComment(post_id, page, token, user_id) {
        return axios.get(FEED_BASE_URL + '/comment/', {
            params:
            {
                post_id: post_id,
                page: page,
                user_id: user_id

            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    /**
     * HTTP POST 요청으로 댓글과 태그를 서버에 저장하는 함수
     * @param {int} post_id : 피드 ID
     * @param {string} user_id : 사용자 ID
     * @param {string} content : 댓글 내용
     * @param {string[]} users : 태그된 사용자 배열
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    addComment(post_id, user_id, content, users, token) {
        return axios.post(FEED_BASE_URL + '/comment/add', {
            post_id: post_id,
            user_id: user_id,
            content: content,
            users: users
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * HTTP PUT 요청으로 댓글을 서버에서 수정하는 함수
     * @param {int} id : 댓글 ID
     * @param {string} content : 댓글 내용
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    updateComment(id, content, token) { //미사용
        return axios.put(FEED_BASE_URL + '/comment/mod', {
            id: id,
            content: content
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * HTTP DELETE 요청으로 댓글을 서버에서 삭제하는 함수
     * @param {id} id : 댓글 ID
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    deleteComment(id, token) { //미사용
        return axios.delete(FEED_BASE_URL + '/comment/del', {
            data: {

                id: id
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        },
        );
    }



    /**
     * HTTP GET 요청으로 태그를 서버에서 가져오는 함수
     * @param {string} user_id : 사용자 ID
     * @param {string} token : 사용자 인증 jwt
     * @returns 
     */
    getTag(user_id, token) {
        return axios.get(FEED_BASE_URL + '/tag', {
            params:
            {
                user_id: user_id
            },
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}




export default new feedService()
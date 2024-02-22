import axios from 'axios';

const FEED_BASE_URL = "http://localhost:3000/feed";

class feedService {

    getFeed(page) {
        return axios.get(FEED_BASE_URL, {
            params: { page: page }

        });
    }
    getSearchedFeed(page, keyword) {
        return axios.get(FEED_BASE_URL + '/search', {
            params: { page: page, keyword: keyword }

        });
    }

    getFeedLoggedIn(id, page, token) {
        return axios.post(FEED_BASE_URL + '/',
            {
                id: id,
                page: page
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }
    getSearchedFeedLoggedIn(id, page, keyword, token) {
        return axios.post(FEED_BASE_URL + '/search',
            {
                id: id,
                page: page,
                keyword: keyword,
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * 서버에게 나의 게시물을 요청합니다.
     * @param {string} id : 사용자 ID
     * @param {string} page : 페이지 번호
     * @returns json
     */
    getMyPosts(id, page, token) {
        return axios.post(FEED_BASE_URL + '/my',
            {
                id: id,
                page: page
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * 서버에게 친구의 게시물을 요청합니다.
     * @param {string} id : 사용자 ID
     * @param {string} page : 페이지 번호
     * @returns json
     */
    getFriendPosts(id, page, token) {
        return axios.post(FEED_BASE_URL + '/friend',
            {
                id: id,
                page: page
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * 서버에게 친구의 게시물을 요청합니다.
     * @param {string} id : 사용자 ID
     * @param {string} page : 페이지 번호
     * @returns json
     */
    getNonFriendPosts(id, page, token) {
        return axios.post(FEED_BASE_URL + '/nonfriend',
            {
                id: id,
                page: page
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    /**
     * 서버에게 post id로 특정 게시물을 가져옵니다.
     * @param {string} id 
     * @returns 
     */
    getPostWithTags(id, token) {
        return axios.post(FEED_BASE_URL + '/postId',
            {
                id: id
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    getPicture(id) {
        return axios.post(FEED_BASE_URL + '/get/img', { id: id }, {

            responseType: 'blob'
        });
    }


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

    deleteFeed(id, token) {
        return axios.delete(FEED_BASE_URL + '/del',
            {
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

    getComment(post_id, page, token) {
        return axios.post(FEED_BASE_URL + '/comment/', {
            post_id: post_id,
            page: page
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

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



    getTag(user_id, token) {
        return axios.post(FEED_BASE_URL + '/tag', {
            user_id: user_id
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            });
    }




}




export default new feedService()
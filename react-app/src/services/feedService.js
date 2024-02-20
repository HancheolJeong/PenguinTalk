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

    getFeedLoggedIn(id, page) {
        return axios.post(FEED_BASE_URL + '/',
            {
                id: id,
                page: page
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }
    getSearchedFeedLoggedIn(id, page, keyword) {
        return axios.post(FEED_BASE_URL + '/search',
            {
                id: id,
                page: page,
                keyword: keyword,
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    /**
     * 서버에게 나의 게시물을 요청합니다.
     * @param {string} id : 사용자 ID
     * @param {string} page : 페이지 번호
     * @returns json
     */
    getMyPosts(id, page) {
        return axios.post(FEED_BASE_URL + '/my',
            {
                id: id,
                page: page
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    /**
     * 서버에게 친구의 게시물을 요청합니다.
     * @param {string} id : 사용자 ID
     * @param {string} page : 페이지 번호
     * @returns json
     */
    getFriendPosts(id, page) {
        return axios.post(FEED_BASE_URL + '/friend',
            {
                id: id,
                page: page
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    /**
     * 서버에게 친구의 게시물을 요청합니다.
     * @param {string} id : 사용자 ID
     * @param {string} page : 페이지 번호
     * @returns json
     */
    getNonFriendPosts(id, page) {
        return axios.post(FEED_BASE_URL + '/nonfriend',
            {
                id: id,
                page: page
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    getPicture(id) {
        return axios.post(FEED_BASE_URL + '/get/img', { id: id }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            responseType: 'blob'
        });
    }


    addFeed(id, title, content_url, scope) {
        return axios.post(FEED_BASE_URL + '/add', {
            id: id,
            title: title,
            content_url: content_url,
            scope: scope
        });
    }


    updateFeed(id, title, content_url, scope) {
        return axios.put(FEED_BASE_URL + '/mod', {
            id: id,
            title: title,
            content_url: content_url,
            scope: scope
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    deleteFeed(id) {
        return axios.delete(FEED_BASE_URL + '/del',
            {
                data: {

                    id: id
                }
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    getComment(post_id, page) {
        return axios.post(FEED_BASE_URL + '/comment/', {
            post_id: post_id,
            page: page
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    addComment(post_id, user_id, content, users) {
        return axios.post(FEED_BASE_URL + '/comment/add', {
            post_id: post_id,
            user_id: user_id,
            content: content,
            users: users
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    updateFeed(id, content) {
        return axios.put(FEED_BASE_URL + '/comment/mod', {
            id: id,
            content: content
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    deleteFeed(id) {
        return axios.delete(FEED_BASE_URL + '/comment/del', {
            data: {

                id: id
            }
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    getTag(user_id, page) {
        return axios.post(FEED_BASE_URL + '/tag', {
            user_id: user_id,
            page: page
        },
            {
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }




}

export default new feedService()
import axios from 'axios';

const FEED_BASE_URL = "http://localhost:3000/feed";

class feedService {

    getFeed(page) {
        return axios.get(FEED_BASE_URL, {
            params: { page: page },
            headers: {
                'Accept': `*/*`,
            }

        });
    }

    getFeed2(id, page) {
        return axios.post(FEED_BASE_URL + '/', {
            id: id,
            page: page
        });
    }

    getPicture(id) {
        return axios.post(FEED_BASE_URL + '/get/img', { id: id }, {
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
        });
    }

    deleteFeed(id) {
        return axios.delete(FEED_BASE_URL + '/del',
            {
                id: id
            });
    }

    getComment(post_id, page) {
        return axios.post(FEED_BASE_URL + '/comment/', {
            post_id: post_id,
            page: page
        });
    }

    addComment(post_id, user_id, content, users) {
        return axios.post(FEED_BASE_URL + '/comment/add', {
            post_id: post_id,
            user_id: user_id,
            content: content,
            users: users
        });
    }

    updateFeed(id, content) {
        return axios.put(FEED_BASE_URL + '/comment/mod', {
            id: id,
            content: content
        });
    }

    deleteFeed(id) {
        return axios.delete(FEED_BASE_URL + '/comment/del', {
            id: id
        });
    }

    getTag(user_id, page) {
        return axios.post(FEED_BASE_URL + '/tag' ,{
            user_id: user_id,
            page: page
        });
    }




}

export default new feedService()
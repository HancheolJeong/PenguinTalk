import axios from 'axios';

const FEED_BASE_URL = "http://localhost:3000/feed";

class feedService {

    getFeed(page){
        return axios.get(FEED_BASE_URL + '/' + page);
    }

    getFeed(id, page){
        return axios.post(FEED_BASE_URL + '/' + id, page);
    }

    addFeed(id, title, content_url, scope){
        return axios.post(FEED_BASE_URL + '/add/' + id, title, content_url, scope);
    }

    updateFeed(id, title, content_url, scope){
        return axios.put(FEED_BASE_URL + '/mod/' + id, title, content_url, scope);
    }

    deleteFeed(id){
        return axios.delete(FEED_BASE_URL + '/del/' + id);
    }

    getComment(post_id, page){
        return axios.post(FEED_BASE_URL + '/comment/' + post_id, page);
    }

    addComment(post_id, user_id, content, users){
        return axios.post(FEED_BASE_URL + '/comment/add/' + post_id, user_id, content, users);
    }

    updateFeed(id, content){
        return axios.put(FEED_BASE_URL + '/comment/mod/' + id, content);
    }

    deleteFeed(id){
        return axios.delete(FEED_BASE_URL + '/comment/del' + id);
    }

    getTag(user_id, page){
        return axios.post(FEED_BASE_URL + '/tag/' + user_id, page);
    }

    


}

export default new feedService()
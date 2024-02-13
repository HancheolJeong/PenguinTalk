import React, {Component} from 'react';
import feedService from '../services/feedService';

class FeedComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            feed: [],
            page: 1,
        }
    }

    // componentDidMount() {
    //     feedService.getFeed(this.state.page).then((res) => {
    //         this.setState({ feed: res.data.items });
    //     }).catch(error => {
    //         console.error("Feed loading failed: ", error);
    //     });
    //     console.log(1);
    // }
    componentDidMount() {
        feedService.getFeed(this.state.page).then(async (res) => {
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
            this.setState({ feed: feedItems });
        }).catch(error => {
            console.error("Feed loading failed: ", error);
        });
    }
    

    handleCommentClick = (post_id, page) => {
        if (!this.state.comments[post_id]) { 
            feedService.getComments(post_id, page).then(res => {
                this.setState(prevState => ({
                    comments: {
                        ...prevState.comments,
                        [post_id]: res.data 
                    }
                }));
            }).catch(error => {
                console.error("Comments loading failed: ", error);
            });
        }
    }


    renderFeedItem(item) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };

        const defaultImageUrl = process.env.PUBLIC_URL + './user.png';
        return (
            <div key={item.id} className="feed-item">
                <div className="feed-header">
                    <img src={item.pictureUrl || defaultImageUrl} alt="Profile" className="profile-image"/>
                    <div className="profile-name">{item.name}</div>
                    <div className="post-date">{new Date(item.create_dt).toLocaleDateString('ko-KR', options)}</div>
                </div>
                <hr className="thin-line"/>
                <div className="post-title">{item.title}</div>
                <hr className="thin-line"/>
                <div className="post-content">{item.content_url}</div>
                <hr className="thin-line"/>
                <button className="comment-button" onClick={() => this.handleCommentClick(item.id, 1)}>
                    댓글: {item.count_comment}
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className="feed-container">
                {this.state.feed.map(item => this.renderFeedItem(item))}
            </div>
        )
    };

};


export default FeedComponent;
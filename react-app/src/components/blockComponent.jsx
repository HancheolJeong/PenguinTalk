// Assuming friendService is already imported
import React, { Component } from 'react';
import friendService from '../services/friendService';

class BlockComponent extends Component {
    state = {
        users: [],
        page: 1
    };

    componentDidMount() {
        this.fetchUsers();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.fetchUsers();
        }
    }

    fetchUsers = async () => {
        const { page } = this.state;
        friendService.getBlock(localStorage.getItem('userId'), page).then(async (res) => {
            const feedItems = res.data.items;
            for (let item of feedItems) {
                try {
                    const pictureRes = await friendService.getPicture(item.id);
                    const pictureUrl = URL.createObjectURL(pictureRes.data);
                    item.pictureUrl = pictureUrl;
                } catch (error) {
                    console.error("Error loading picture for item", item.id, error);
                    item.pictureUrl = 'defaultProfileImageURL'; 
                }
            }
            this.setState({ users: feedItems });
        }).catch(error => {
            console.error("Feed loading failed: ", error);
        });
    };

    handlePrevClick = () => {
        this.setState(prevState => ({
            page: Math.max(1, prevState.page - 1)
        }), this.fetchUsers);
    };

    handleNextClick = () => {
        this.setState(prevState => ({
            page: prevState.page + 1
        }), this.fetchUsers);
    };

    renderPagination() {
        return (
            <div className="pagination">
                <button onClick={this.handlePrevClick} disabled={this.state.page === 1}>이전 페이지</button>
                <button onClick={this.handleNextClick} >다음 페이지</button>
            </div>
        );
    }

    renderUserList = () => {
        const defaultImageUrl = process.env.PUBLIC_URL + './user.png';
        return (
            <div className="user-list">
                {this.state.users.map(item => (
                    <div key={item.id} className="user-item">
                        <img src={item.pictureUrl || 'defaultProfileImageUrl'} alt={item.name} className="user-photo" />
                        <div className="user-info">
                            <div className="user-name">이름 : {item.name}</div>
                            <div className="user-id">id : {item.id}</div>
                            <div className="user-date">생성날짜 : {new Date(item.create_dt).toLocaleDateString()}</div>
                        </div>
                        <button className="hamburger-menu">☰</button>
                    </div>
                ))}
            </div>
        );
    };

    render() {
        return (
            <div className="feed-container">
                {this.renderUserList()}
                {this.renderPagination()}
            </div>
        );
    }
}

export default BlockComponent;
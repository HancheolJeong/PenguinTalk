import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                return <header>
                    <div>
                        <div className="top-bar">
                            <a href="/" >
                                <div className="logo">
                                    <img className=".profile" src={process.env.PUBLIC_URL + './logo.png'} style={{ width: 50, height: 50, borderRadius: '50%' }} />
                                    <span>PenguinTalk2</span>
                                </div>
                            </a>
                            <div className="search-box">
                                <input type="text" placeholder="Search" />
                                <button className="search-button" type="button">
                                    <img src="search.png" alt="Search" />
                                </button>
                            </div>
                            <div className="icons">
                                <button>
                                    <img src={process.env.PUBLIC_URL + './message.png'} alt="message" style={{ width: 45, height: 45 }} />
                                </button>
                                <button>
                                    <img src={process.env.PUBLIC_URL + './tag.png'} alt="tag" style={{ width: 45, height: 45 }} />
                                </button>
                                <button>
                                    <img src={process.env.PUBLIC_URL + './user.png'} alt="user" style={{ width: 45, height: 45 }} />
                                </button>
                                <button>
                                    <img src={process.env.PUBLIC_URL + './friend.png'} alt="friend" style={{ width: 45, height: 45 }} />
                                </button>
                                <button>
                                    <img src={process.env.PUBLIC_URL + './addfriend.png'} alt="Add Friend" style={{ width: 45, height: 45 }} />
                                </button>
                                <button>
                                    <img src={process.env.PUBLIC_URL + './writing.png'} alt="writing" style={{ width: 45, height: 45 }} />
                                </button>
                            </div>
                        </div>

                        <div className="body-container">
                            <div className="profile-section">
                                <img src="user-profile-image.jpg" alt="User Profile" />
                                <div className="user-info">
                                    <div className="user-name">John Doe</div>
                                    <button className="hamburger-button" type="button">
                                        &#9776;
                                    </button>
                                </div>
                            </div>

                            <div className="posts-section">
                                {/* Post 1 */}
                                <div className="post">
                                    <div className="post-title">Lorem Ipsum</div>
                                    <div className="post-content">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit....</p>
                                    </div>
                                    <div className="comments">
                                        <div className="comment">Comment 1</div>
                                        <div className="comment">Comment 2</div>
                                        {/* Add more comments as needed */}
                                    </div>
                                </div>

                                {/* Add more posts as needed */}
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
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
                 <header>
                    <div>
                        <div className="top-bar">
                            <a href="/" >
                                <div className="logo">
                                    <img className=".profile" src={process.env.PUBLIC_URL + './logo.png'} style={{ width: 50, height: 50, borderRadius: '50%' }} />
                                    <span>PenguinTalk</span>
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
                    </div>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
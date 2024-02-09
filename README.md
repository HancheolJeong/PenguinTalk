## BACK-END

# File Structure

back-end/
|-- node_modules/
|-- controllers/
|   |-- chatController.js
|   |-- feedController.js
|   |-- friendController.js
|   |-- userController.js
|-- models/
|   |-- chatModel.js
|   |-- feedModel.js
|   |-- friendModel.js
|   |-- userModel.js
|-- routes/
|   |-- routes.js
|-- server.js
|-- .env
|-- .gitignore
|-- package-lock.json
|-- package.json
|-- README.md


# create table

- 회원 테이블

CREATE TABLE user (
    id VARCHAR(10) PRIMARY KEY,
    passwd VARCHAR(255) NOT NULL,
    name VARCHAR(50) NOT NULL,
    birthday DATE NOT NULL,
    gender TINYINT NOT NULL, #0:Male 1:Female
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    login_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    picture_url VARCHAR(255) NOT NULL DEFAULT ''
);

- 게시글 테이블

CREATE TABLE post (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(10) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content_url VARCHAR(255) DEFAULT '',
    scope TINYINT NOT NULL DEFAULT 0, #0:Public 1:Friends 2:Private
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

- 댓글 테이블

CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id VARCHAR(10),
    content VARCHAR(100) NOT NULL,
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

- 태그 테이블

CREATE TABLE tags (
    comment_id INT NOT NULL,
    user_id VARCHAR(10) NOT NULL,
    checking TINYINT NOT NULL DEFAULT 0,
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (comment_id, user_id),
    FOREIGN KEY (comment_id) REFERENCES comment(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

- 친구목록 테이블

CREATE TABLE friend_list (
    user_id VARCHAR(10) NOT NULL,
    friend_id VARCHAR(10) NOT NULL,
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES user(id) ON DELETE CASCADE
);

- 친구요청 테이블

CREATE TABLE friend_request (
    sender_id VARCHAR(10) NOT NULL,
    receiver_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (sender_id, receiver_id),
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user(id) ON DELETE CASCADE
);

- 친구차단 테이블

CREATE TABLE friend_blocking (
    user_id VARCHAR(10) NOT NULL,
    blocked_user_id VARCHAR(10) NOT NULL,
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, blocked_user_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (blocked_user_id) REFERENCES user(id) ON DELETE CASCADE
);

- 채팅기록 테이블

CREATE TABLE chat_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id VARCHAR(10) NOT NULL,
    receiver_id VARCHAR(10) NOT NULL,
    checking TINYINT NOT NULL DEFAULT 0,
    message_content TEXT NOT NULL,
    create_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    FOREIGN KEY (sender_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user(id) ON DELETE CASCADE
);


# routes

|url|method|requset|response|
|------|---|---|---|
|/user/register|post|id, pw, name, birthday, gender|result|
|/user/login|post|id, pw|result|
|/user|delete|id|result|
|/user/update/pw|post|id, pw|result|
|/user/update/url|post|id, url|result|
|/user/update/info|post|id, name, birthday, gender|result|
|/user/get/info|post|id|result, items[id, name, birthday, gender, create_dt, login_dt, picture_url]|
|/user/get/name|post|id|result, items[name]|
|/user/get/url|post|id|result, items[picture_url]|
|/user/get/list|post|id|list, items[id, name, birthday, gender, create_dt, login_dt, picture_url]|
|------|---|---|---|
|/user/friend|post|user_id|result, items[id, name, birthday, gender, create_dt, login_dt, picture_url]|
|/user/friend/add|post|user_id, friend_id|result|
|/user/friend/del|delete|user_id, friend_id|result|
|/user/request/fm|post|sender_id|result, items[receiver_id, create_dt]|
|/user/request/tm|post|receiver_id|resultm items[sender_id, create_dt]|
|/user/request/pos|post|user_id|result, items[id, name, birthday, gender, picture_url]|
|/user/request/add|post|sender_id, receiver_id|result|
|/user/request/del|delete|sender_id, receiver_id|result|
|/user/block|post|user_id|result, items[blocked_user_id]|
|/user/block/pos|post|user_id|result, items[id, name, birthday, gender, picture_url]|
|/user/block/add|post|user_id, blocked_id|result|
|/user/block/del|delete|user_id, blocked_id|result|
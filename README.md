# 🐧PenguinTalk

<br />

# 📄 프로젝트 정보

### 요약

커뮤니케이션 웹 서비스

### 개발 기간

2024.02.05 ~ 2024.02.24

<br />

# 👩‍🔧기술

### Front

HTML, CSS, JavaScript, React, Redux

### Back

node.js 20.11.0, Express 4.18.2, MySQL 8.0.3

<br />

# 📝설계

<details>
<summary>ERD</summary>
<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/35002d57-a6ea-42c3-a3ba-86495963c7ed.png" width="800px"/>
</div>
</details>

<br/>

# 🔑주요기능

- 게시판 댓글 회원 CRUD 기능 제공
- 사용자 댓글 태그 기능 적용
- Redux-Persist SessionStorage 상태값 유지
- KISA 패스워드 가이드에 따른 암호 정책, 패스워드 암호화
- JWT 사용자 인증, 파라미터 변조 방지
- 웹소켓을 이용한 실시간 통신

<br/>

# 💻실행화면

<details><summary>회원가입 및 로그인</summary>
<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/dd1a9f03-7fa8-4a89-ba1f-c5e6451fe4a7.png" width="800px"/>
<p style="text-align: center;">회원가입</p>
</div>

<br>

<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/ce0eedfa-ef2c-4dee-bf8b-6ce8ee5d15ec.png" width="800px"/>
<p style="text-align: center;">로그인</p>
</div>
</details>

<br>

<details><summary>회원정보수정</summary>
<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/de230f32-e4bc-4a65-ac04-29145d82bc22.png" width="800px"/>
<p style="text-align: center;">회원정보 수정</p>
</div>

<br>

<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/79db91a5-d659-4750-8014-5cc09f7458cb.png" width="800px"/>
<p style="text-align: center;">패스워드 확인</p>
</div>

<br>

<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/8cbdaae3-c700-4e12-bdcc-5f68b94d45d0.png" width="800px"/>
<p style="text-align: center;">새로운 비밀번호 입력</p>
</div>
</details>

<br>

<details><summary>피드</summary>
<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/f032f4ac-9b47-4175-8277-6bd3d5f65410.png" width="800px"/>
<p style="text-align: center;">피드작성</p>
</div>

<br>

<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/b28cc802-00ac-4d27-ae67-e4b21e3195ce.png" width="800px"/>
<p style="text-align: center;">피드</p>
</div>
</details>

<br>

<details><summary>댓글,태그</summary>
<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/c74fec5a-fee2-46b3-b70d-d37788945228.png" width="800px"/>
<p style="text-align: center;">댓글작성</p>
</div>

<br>

<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/8526c5bf-83f7-4778-b58f-2069174f09d8.png" width="800px"/>
<p style="text-align: center;">친구태그</p>
</div>

<br>

<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/b6a53641-070c-4d62-b5ff-25cf484ab397.png" width="800px"/>
<p style="text-align: center;">태그알림</p>
</div>
</details>

<details><summary>친구관리</summary>
<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/81b00f6b-8818-4eb5-9210-90e08b985630.png" width="800px"/>
<p style="text-align: center;">드롭다운메뉴</p>
</div>

<br>

<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/e37262b6-7c50-4994-afb1-df0f55d0abb3.png" width="800px"/>
<p style="text-align: center;">회원목록</p>
</div>

<br>

<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/HancheolJeong/PenguinTalk/assets/70940120/5c2f4498-374f-4633-a911-b6a3e6eeea31.png" width="800px"/>
<p style="text-align: center;">친구목록</p>
</div>
</details>



# 📎 기타


## FRONT-END

# File Structure
front-end/<br>
|-- node_modules/<br>
|-- build/<br>
|-- public/<br>
|-- src/<br>
|   |-- components/<br>
|   |   |-- feedComponent.jsx<br>
|   |   |-- footerComponent.jsx<br>
|   |   |-- headerComponent.jsx<br>
|   |   |-- mailComponent.jsx<br>
|   |   |-- messageComponent.jsx<br>
|   |   |-- registerComponent.jsx<br>
|   |-- services/<br>
|   |   |-- chatService.js<br>
|   |   |-- feedService.js<br>
|   |   |-- friendService.js<br>
|   |   |-- userService.js<br>
|   |-- App.css<br>
|   |-- App.js<br>
|   |-- App.test.js<br>
|   |-- http-common.js<br>
|   |-- index.css<br>
|   |-- index.js<br>
|   |-- service.js<br>
|   |-- app.css<br>
|-- package-lock.json<br>
|-- package.json<br>
|-- README.md<br>

# execute
![alt text](home.png)




## BACK-END

# File Structure

back-end/<br>
|-- node_modules/<br>
|-- resources/<br>
|   |-- images/<br>
|   |-- logs/<br>
|   |-- xml/<br>
|-- controllers/<br>
|   |-- chatController.js<br>
|   |-- feedController.js<br>
|   |-- friendController.js<br>
|   |-- userController.js<br>
|-- models/<br>
|   |-- db.js<br>
|   |-- chatModel.js<br>
|   |-- feedModel.js<br>
|   |-- friendModel.js<br>
|   |-- userModel.js<br>
|-- routes/<br>
|   |-- routes.js<br>
|-- middleware/<br>
|   |-- auth.js<br>
|   |-- upload.js<br>
|-- libs/<br>
|   |-- socketHandler.js<br>
|-- server.js<br>
|-- .env<br>
|-- .gitignore<br>
|-- package-lock.json<br>
|-- package.json<br>
|-- README.md<br>


# create table

- user table

CREATE TABLE user (
    id VARCHAR(255) PRIMARY KEY,
    passwd VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    birthday DATE NOT NULL,
    gender TINYINT NOT NULL, #0:Male 1:Female
    create_dt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    login_dt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    picture_url VARCHAR(255) NOT NULL DEFAULT 'default.png'
);

- post table

CREATE TABLE post (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content_url VARCHAR(255) NOT NULL,
    scope TINYINT NOT NULL DEFAULT 0, #0:Public 1:Friends 2:Private
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

- comment table

CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    content VARCHAR(100) NOT NULL,
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

- tag table

CREATE TABLE tags (
    comment_id INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    checking TINYINT NOT NULL DEFAULT 0, # 0:미확인, 1:확인
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (comment_id, user_id),
    FOREIGN KEY (comment_id) REFERENCES comment(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

- friend list table

CREATE TABLE friend_list (
    user_id VARCHAR(255) NOT NULL,
    friend_id VARCHAR(255) NOT NULL,
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES user(id) ON DELETE CASCADE
);

- request friend table

CREATE TABLE friend_request (
    sender_id VARCHAR(255) NOT NULL,
    receiver_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (sender_id, receiver_id),
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user(id) ON DELETE CASCADE
);

- block user table

CREATE TABLE friend_blocking (
    user_id VARCHAR(255) NOT NULL,
    blocked_user_id VARCHAR(255) NOT NULL,
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, blocked_user_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (blocked_user_id) REFERENCES user(id) ON DELETE CASCADE
);

- chat log table

CREATE TABLE chat_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id VARCHAR(255) NOT NULL,
    receiver_id VARCHAR(255) NOT NULL,
    checking TINYINT NOT NULL DEFAULT 0,
    message_content TEXT NOT NULL,
    create_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    FOREIGN KEY (sender_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user(id) ON DELETE CASCADE
);


# routes

|uri|method|requset|response|
|------|---|---|---|
|/user/add|post|id, pw, name, birthday, gender|result|
|/user/login|post|id, pw|result|
|/user/del|delete|id|result|
|/user/mod/pw|patch|id, pw|result|
|/user/mod/url|patch|id, url|result|
|/user/mod/info|put|id, name, birthday, gender|result|
|/user/get/img|post|id|image|
|/user/get/info|post|id|result, items[id, name, birthday, gender, create_dt, login_dt, picture_url]|
|/user/get/name|post|id|result, items[name]|
|/user/get/url|post|id|result, items[picture_url]|
|/user/get/list|post|id|result, items[id, name, birthday, gender, create_dt, login_dt, picture_url]|
|------|---|---|---|
|/friend|post|user_id, page|result, items[id, name, birthday, gender, create_dt, login_dt, picture_url]|
|/friend/get/img|post|id|image|
|/friend/add|post|user_id, friend_id|result|
|/friend/del|delete|user_id, friend_id|result|
|/friend/request/fm|post|sender_id, page|result, items[receiver_id, create_dt]|
|/friend/request/tm|post|receiver_id, page|resultm items[sender_id, create_dt]|
|/friend/request/pos|post|user_id, page|result, items[id, name, birthday, gender, picture_url]|
|/friend/request/add|post|sender_id, receiver_id|result|
|/friend/request/del|delete|sender_id, receiver_id|result|
|/friend/block|post|user_id, page|result, items[blocked_user_id]|
|/friend/block/pos|post|user_id|result, items[id, name, birthday, gender, picture_url]|
|/friend/block/add|post|user_id, blocked_id|result|
|/friend/block/del|delete|user_id, blocked_id|result|
|------|---|---|---|
|/feed:page|get|page|result, items[id, user_id, title, content_url, scope, create_dt, name, count_comment]|
|/feed|get|page, keyword|result, items[id, user_id, title, content_url, scope, create_dt, name, count_comment]|
|/feed|post|id, page|result, items[id, user_id, title, content_url, scope, create_dt, name, count_comment]|
|/feed/search|post|id, page, keyword|result items[id, user_id, title, content_url, scope, create_dt, name, count_comment]|
|/feed/my|post|id, page|result items[id, user_id, title, content_url, scope, create_dt, name, count_comment]|
|/feed/friend|post|id, page|result items[id, user_id, title, content_url, scope, create_dt, name, count_comment]|
|/feed/nonfriend|post|id, page|result items[id, user_id, title, content_url, scope, create_dt, name, count_comment]|
|/feed/postId|post|id|result items[id, user_id, title, content_url, scope, create_dt, name, count_comment]|
|/feed/get/img|post|id|image|
|/feed/add|post|id, title, content_url, scope|result|
|/feed/mod|put|id, title, content_url, scope|result|
|/feed/del|delete|id|result|
|/feed/comment|post|post_id, page|result, items[id, post_id, user_id, create_dt, tagged_count]|
|/feed/comment/add|post|post_id, user_id, content, users|result|
|/feed/comment/mod|put|id, content|result|
|/feed/comment/del|delete|id|result|
|/feed/tag|post|user_id, page|result, items[comment_id, post_id, sender_id, receiver_id, content, create_dt, checking]|
|------|---|---|---|
|/chat|post|sender_id, receiver_id, message_content|result, items[id, sender_id, receiver_id, message_content, create_dt]|
|/chat/add|post|sender_id, receiver_id, page|result|


# execute
![alt text](image.png)
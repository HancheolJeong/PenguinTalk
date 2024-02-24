const express = require('express');
const path = require('path');
const feedController = require("../controllers/feedController.js");
const friendController = require("../controllers/friendController.js");
const userController = require("../controllers/userController.js");
const chatController = require("../controllers/chatController.js");
const upload = require("../middleware/upload.js");
const {verify, verifyMatchId} = require('../middleware/auth');

const router = express.Router();





router.use(express.static(path.join(__dirname, '../react-app/build')));

router.get("/",(req, res) => {
    res.sendFile(path.join(__dirname, '../react-app/build/index.html'));
});

//test
router.get("/feed/get/img", userController.getPicture); // jwt인증없이 사용가능

//feed
router.get("/feed", feedController.getPostWhileLogout); // jwt인증없이 사용가능

//user
router.post("/user/add", userController.registerUser); // jwt인증없이 사용가능
router.post("/user/login", userController.loginUser); // jwt인증없이 사용가능


router.use(verify); // jwt인증

//user
router.post("/user/confirm/pw", userController.confirmPassword); // 패스워드 인증 반드시 post 방식으로!
router.patch("/user/mod/pw", userController.updatePassword);
router.patch("/user/mod/picture", upload.single('picture'), userController.updatePicture);
router.put("/user/mod/info", userController.updateUser);
router.delete("/user/del", userController.deleteUser);

router.get("/user/get/img", verifyMatchId, userController.getPicture); 
router.get("/user/get/name", verifyMatchId, userController.getUserName); 
router.get("/user/get/info", verifyMatchId, userController.getUser);
router.get("/user/get/url", verifyMatchId, userController.getUserPictureUrl); 
router.get("/user/get/list", verifyMatchId, userController.getUserList); 

//friend
router.get("/friend", verifyMatchId, friendController.getFriendList);
router.get("/friend/all", verifyMatchId, friendController.getFriendListAll);
router.get("/friend/get/img", verifyMatchId, userController.getPicture);

router.post("/friend/add", friendController.insertFriendList);
router.delete("/friend/del", friendController.deleteFriendList); 

router.get("/friend/request/fm", verifyMatchId, friendController.getFriendRequestFromMe);
router.get("/friend/request/tm", verifyMatchId, friendController.getFriendRequestToMe);
router.get("/friend/request/pos", verifyMatchId, friendController.getFriendToRequestPossible);
router.post("/friend/request/add", friendController.insertFriendRequest);
router.delete("/friend/request/del", friendController.deleteFriendRequest);

router.get("/friend/block", verifyMatchId, friendController.getBlockedFriend);
router.get("/friend/block/pos", verifyMatchId, friendController.getFriendToBlockPossible);
router.post("/friend/block/add", friendController.insertBlockedFriend);
router.delete("/friend/block/del", friendController.deleteBlockedFriend);

//feed
router.get("/feed/home", verifyMatchId, feedController.getPostWhileLogin);
router.get("/feed/search", verifyMatchId, feedController.getSearchedPostWhileLogin);
router.get("/feed/my", verifyMatchId, feedController.getMyPosts);
router.get("/feed/friend", verifyMatchId, feedController.getFriendPosts); 
router.get("/feed/nonfriend", verifyMatchId, feedController.getNonFriendPosts);
router.get("/feed/postId", verifyMatchId, feedController.getPostwithTags); 
router.post("/feed/add", feedController.insertPost);
router.put("/feed/mod", feedController.updatePost);
router.delete("/feed/del", feedController.deletePost);

router.get("/feed/comment", verifyMatchId, feedController.getComment);
router.post("/feed/comment/add", feedController.insertCommentAndTags);
router.put("/feed/comment/mod", feedController.updateComment);
router.delete("/feed/comment/del", feedController.deleteComment);

router.get("/feed/tag", verifyMatchId, feedController.getTag);

//chat
router.get("/chat", chatController.getChat); 
router.post("/chat/add",chatController.insertChat);

module.exports = router;
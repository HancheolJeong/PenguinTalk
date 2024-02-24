const express = require('express');
const path = require('path');
const feedController = require("../controllers/feedController.js");
const friendController = require("../controllers/friendController.js");
const userController = require("../controllers/userController.js");
const chatController = require("../controllers/chatController.js");
const upload = require("../middleware/upload.js");
const {verify} = require('../middleware/auth');

const router = express.Router();





router.use(express.static(path.join(__dirname, '../react-app/build')));

router.get("/",(req, res) => {
    res.sendFile(path.join(__dirname, '../react-app/build/index.html'));
});

//test
router.post("/feed/get/img", userController.getPicture); // jwt인증없이 사용가능
// router.post("/test", testController.Test);

//feed
router.get("/feed", feedController.getPostWhileLogout); // jwt인증없이 사용가능
router.get("/feed/search", feedController.getSearchedPostWhileLogout); //jwt인증없이 사용가능

//user
router.post("/user/add", userController.registerUser); // jwt인증없이 사용가능
router.post("/user/login", userController.loginUser); // jwt인증없이 사용가능

router.use(verify); // jwt인증

//user
router.delete("/user/del", userController.deleteUser);

router.post("/user/confirm/pw", userController.confirmPassword);
router.patch("/user/mod/pw", userController.updatePassword);
router.patch("/user/mod/picture", upload.single('picture'), userController.updatePicture);
router.put("/user/mod/info", userController.updateUser);

router.post("/user/get/img", userController.getPicture);
router.post("/user/get/info", userController.getUser);
router.post("/user/get/name", userController.getUserName);
router.post("/user/get/url", userController.getUserPictureUrl);
router.post("/user/get/list", userController.getUserList);

//friend
router.post("/friend", friendController.getFriendList);
router.post("/friend/get/img", userController.getPicture);
router.post("/friend/all", friendController.getFriendListAll);
router.post("/friend/add", friendController.insertFriendList);
router.delete("/friend/del", friendController.deleteFriendList);

router.post("/friend/request/fm", friendController.getFriendRequestFromMe);
router.post("/friend/request/tm", friendController.getFriendRequestToMe);
router.post("/friend/request/pos", friendController.getFriendToRequestPossible);
router.post("/friend/request/add", friendController.insertFriendRequest);
router.delete("/friend/request/del", friendController.deleteFriendRequest);

router.post("/friend/block", friendController.getBlockedFriend);
router.post("/friend/block/pos", friendController.getFriendToBlockPossible);
router.post("/friend/block/add", friendController.insertBlockedFriend);
router.delete("/friend/block/del", friendController.deleteBlockedFriend);

//feed
router.post("/feed", feedController.getPostWhileLogin);
router.post("/feed/search", feedController.getSearchedPostWhileLogin);
router.post("/feed/my", feedController.getMyPosts);
router.post("/feed/friend", feedController.getFriendPosts);
router.post("/feed/nonfriend", feedController.getNonFriendPosts);
router.post("/feed/postId", feedController.getPostwithTags);
router.post("/feed/add", feedController.insertPost);
router.put("/feed/mod", feedController.updatePost);
router.delete("/feed/del", feedController.deletePost);

router.post("/feed/comment", feedController.getComment);
router.post("/feed/comment/add", feedController.insertCommentAndTags);
router.put("/feed/comment/mod", feedController.updateComment);
router.delete("/feed/comment/del", feedController.deleteComment);

router.post("/feed/tag", feedController.getTag);

//chat
router.post("/chat", chatController.getChat);
router.post("/chat/add",chatController.insertChat);

module.exports = router;
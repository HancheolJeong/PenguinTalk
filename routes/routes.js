const express = require('express');
const path = require('path');
const feedController = require("../controllers/feedController.js");
const friendController = require("../controllers/friendController.js");
const userController = require("../controllers/userController.js");
const chatController = require("../controllers/chatController.js");
const testController = require("../controllers/testController.js");
const {verify} = require('../middleware/auth');

const router = express.Router();





router.use(express.static(path.join(__dirname, '../react-app/build')));
router.get("/",(req, res) => {
    res.sendFile(path.join(__dirname, '../react-app/build/index.html'));
    // res.redirect("/feed?page=1");
});

//test
router.post("/test", testController.Test);


//feed
router.get("/feed", feedController.getPostWhileLogout);

//user
router.post("/user/add", userController.registerUser);
router.post("/user/login", userController.loginUser);

router.use(verify);

//user
router.delete("/user/del", userController.deleteUser);

router.patch("/user/mod/pw", userController.updatePassword);
router.patch("/user/mod/url", userController.updatePictureUrl);
router.put("/user/mod/info", userController.updateUser);

router.post("/user/get/info", userController.getUser);
router.post("/user/get/name", userController.getUserName);
router.post("/user/get/url", userController.getUserPictureUrl);
router.post("/user/get/list", userController.getUserList);

//friend
router.post("/friend", friendController.getFriendList);
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
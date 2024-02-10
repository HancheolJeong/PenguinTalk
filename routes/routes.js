const express = require('express');
const feedController = require("../controllers/feedController.js");
const friendController = require("../controllers/friendController.js");
const userController = require("../controllers/userController.js");
const chatController = require("../controllers/chatController.js");
const testController = require("../controllers/testController.js");
const {verify} = require('../middleware/auth');

const router = express.Router();


//test
router.post("/test", testController.Test);


//feed
router.get("/feed", feedController.getPostWhileLogout);

//user
router.post("/user/register", userController.registerUser);
router.post("/user/login", userController.loginUser);

router.use(verify);



//user
router.delete("/user", userController.deleteUser);

router.post("/user/update/pw", userController.updatePassword);
router.post("/user/update/url", userController.updatePictureUrl);
router.post("/user/update/info", userController.updateUser);

router.post("/user/get/info", userController.getUser);
router.post("/user/get/name", userController.getUserName);
router.post("/user/get/url", userController.getUserPictureUrl);
router.post("/user/get/list", userController.getUserList);

//friend
router.post("/user/friend", friendController.getFriendList);
router.post("/user/friend/add", friendController.insertFriendList);
router.delete("/user/friend/del", friendController.deleteFriendList);

router.post("/user/request/fm", friendController.getFriendRequestFromMe);
router.post("/user/request/tm", friendController.getFriendRequestToMe);
router.post("/user/request/pos", friendController.getFriendToRequestPossible);
router.post("/user/request/add", friendController.insertFriendRequest);
router.delete("/user/request/del", friendController.deleteFriendRequest);

router.post("/user/block", friendController.getBlockedFriend);
router.post("/user/block/pos", friendController.getFriendToBlockPossible);
router.post("/user/block/add", friendController.insertBlockedFriend);
router.delete("/user/block/del", friendController.deleteBlockedFriend);

//feed
router.post("/feed", feedController.getPostWhileLogin);
router.post("/feed/add", feedController.insertPost);
router.post("/feed/mod", feedController.updatePost);
router.delete("/feed/del", feedController.deletePost);

router.post("/feed/comment", feedController.getComment);
router.post("/feed/comment/add", feedController.insertCommentAndTags);
router.post("/feed/comment/mod", feedController.updateComment);
router.delete("/feed/comment/del", feedController.deleteComment);

router.post("/feed/tag", feedController.getTag);

//chat
router.post("/chat", chatController.getChat);
router.post("/chat/add",chatController.insertChat);

module.exports = router;
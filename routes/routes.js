const express = require('express');
const feedController = require("../controllers/feedController.js");
const friendController = require("../controllers/friendController.js");
const userController = require("../controllers/userController.js");
const chatController = require("../controllers/chatController.js");


const router = express.Router();



//user
router.post("/user/register", userController.registerUser);
router.post("/user/login", userController.loginUser);
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


module.exports = router;
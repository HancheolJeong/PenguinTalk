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



module.exports = router;
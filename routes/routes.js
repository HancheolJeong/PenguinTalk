const express = require('express');
const feedController = require("../controllers/feedController.js");
const friendController = require("../controllers/friendController.js");
const userController = require("../controllers/userController.js");
const chatController = require("../controllers/chatController.js");


const router = express.Router();


router.post("/user/register", userController.registerUser);
router.post("/user/login", userController.loginUser);



module.exports = router;
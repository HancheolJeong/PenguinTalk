const user = require('../models/userModel.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const path = require('path');

/**
 * 비동기식으로 회원을 데이터베이스에 추가하기, 패스워드 암호화
 */
exports.registerUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "There is no content."
        });
    }
    let { id, pw, name, birthday, gender } = req.body;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(pw)) {
        return res.json({ result: "a breach of rules" });
    }


    let encryptedPassword = crypto.pbkdf2Sync(pw, process.env.SECRET_KEY, 1, 32, 'sha512');

    try {
        let is_success = await user.registerUser(id, encryptedPassword.toString('base64'), name, birthday, gender);
        if (is_success) {
            res.json({ result: "success" });
        }
        else {
            res.json({ result: "fail" });
        }
    }
    catch (err) {
        console.error('userController.registerUser error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }

};

/**
 * 비동기식으로 ID와 패스워드를 데이터베이스로부터 존재하는지 확인하고 jwt발행
 */
exports.loginUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "There is no content."
        });
    }
    let { id, pw } = req.body;


    let encryptedPassword = crypto.pbkdf2Sync(pw, process.env.SECRET_KEY, 1, 32, 'sha512');

    try {
        let is_success = await user.loginUser(id, encryptedPassword.toString('base64'));
        if (is_success) {

            const tokenPayload = {
                userId: id,
            };
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '2h' });

            res.json({ result: "success", token: token });
        }
        else {
            res.json({ result: "fail" });
        }
    }
    catch (err) {
        console.error('userController.loginUser error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }

};

/**
 * 비동기식으로 사용자의 패스워드를 데이터베이스로부터 존재하는지 확인하고 논리값 리턴받기
 */
exports.confirmPassword = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "There is no content."
        });
    }
    let { id, pw } = req.body;
    let encryptedPassword = crypto.pbkdf2Sync(pw, process.env.SECRET_KEY, 1, 32, 'sha512');

    try {
        let is_success = await user.loginUser(id, encryptedPassword.toString('base64'));
        if (is_success) {


            res.json({ result: "success"});
        }
        else {
            res.json({ result: "fail" });
        }
    }
    catch (err) {
        console.error('userController.loginUser error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }

};


/**
 * 비동기식으로 회원을 데이터베이스로부터 삭제하기
 */
exports.deleteUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "There is no content."
        });
    }
    let { id } = req.body;
    try {
        let is_success = await user.deleteUser(id);
        if (is_success) {
            res.json({ result: "success" });
        }
        else {
            res.json({ result: "fail" });
        }
    }
    catch (err) {
        console.error('userController.deleteUser error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


/**
 * 비동기식으로 사용자의 패스워드를 데이터베이스에 업데이트하기
 */
exports.updatePassword = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "There is no content."
        });
    }
    let { id, pw } = req.body;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(pw)) {
        return res.json({ result: "a breach of rules" });
    }

    let encryptedPassword = crypto.pbkdf2Sync(pw, process.env.SECRET_KEY, 1, 32, 'sha512');
    try {
        let is_success = await user.updatePassword(encryptedPassword.toString('base64'), id);
        if (is_success) {
            res.json({ result: "success" });
        }
        else {
            res.json({ result: "fail" });
        }
    }
    catch (err) {
        console.error('userController.updatePassword error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}

/**
 * 비동기식으로 사용자의 사진경로를 데이터베이스에 업데이트하기
 */
exports.updatePicture = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "There is no content."
        });
    }
    console.log(req.body);
    console.log(req.file);

    const id = req.body.id;
    const filePath = req.file.path;
    const fileName = req.file.filename;
    const fileUrl = `${id}/${fileName}`;

    try {
        let is_success = await user.updatePictureUrl(fileUrl, id);
        if (is_success) {
            res.json({ result: "success" });
        }
        else {
            res.json({ result: "fail" });
        }
    }
    catch (err) {
        console.error('userController.updatePictureUrl error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


/**
 * 비동기식으로 사용자 정보를 데이터베이스로에 업데이트하기
 */
exports.updateUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "There is no content."
        });
    }
    let { id, name, birthday, gender } = req.body;
    try {
        let is_success = await user.updateUser(name, birthday, gender, id);
        if (is_success) {
            res.json({ result: "success" });
        }
        else {
            res.json({ result: "fail" });
        }
    }
    catch (err) {
        console.error('userController.updateUser error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


/**
 * 비동기식으로 사용자의 정보를 데이터베이스로부터 불러오기
 */
exports.getUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "There is no content."
        });
    }
    let { id } = req.body;
    try {
        let rows = await user.getUser(id);
        if (rows !== null) {
            res.json({ result: "success", items: rows });
        }
        else {
            res.json({ result: "fail" });
        }
    }
    catch (err) {
        console.error('userController.getUser error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


/**
 * 비동기식으로 사용자의 사진경로 데이터베이스로부터 불러오고 이미지를 클라언트에게 전송하기
 */
exports.getPicture = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "There is no content."
        });
    }
    let { id } = req.body;
    try {
        let rows = await user.getUserPictureUrl(id);
        if (rows !== null) {
            let picturePath = rows && rows[0] && rows[0].picture_url ? rows[0].picture_url : '/default.png';
            let imgPath = path.join(__dirname, '../resources/images/', picturePath);
            res.sendFile(imgPath);
        }
        else {
            res.json({ result: "fail" });
        }
    }
    catch (err) {
        console.error('userController.getUser error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


/**
 * 비동기식으로 사용자의 사진경로를 데이터베이스로부터 불러오기 (미사용)
 */
exports.getUserPictureUrl = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "There is no content."
        });
    }
    let { id } = req.body;
    try {
        let rows = await user.getUserPictureUrl(id);
        if (rows !== null) {
            res.json({ result: "success", items: rows });
        }
        else {
            res.json({ result: "fail" });
        }
    }
    catch (err) {
        console.error('userController.getUserPictureUrl error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


/**
 * 비동기식으로 사용자의 이름을 데이터베이스로부터 불러오기 (미사용)
 */
exports.getUserName = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "There is no content."
        });
    }
    let { id } = req.body;
    try {
        let rows = await user.getUserName(id);
        if (rows !== null) {
            res.json({ result: "success", items: rows });
        }
        else {
            res.json({ result: "fail" });
        }
    }
    catch (err) {
        console.error('userController.getUserName error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


/**
 * 비동기식으로 사용자 목록을 데이터베이스로부터 불러오기
 */
exports.getUserList = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "There is no content."
        });
    }
    let { id } = req.body;
    try {
        let rows = await user.getUserList(id);
        if (rows !== null) {
            res.json({ result: "success", items: rows });
        }
        else {
            res.json({ result: "fail" });
        }
    }
    catch (err) {
        console.error('userController.getUserList error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}



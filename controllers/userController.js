const user = require('../models/userModel.js');
const crypto = require('crypto');

exports.registerUser = async(req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {id, passwd, name, birthday, gender} = req.body;
    let encryptedPassword = crypto.pbkdf2Sync(passwd, process.env.SECRET_KEY, 1, 32, 'sha512');

    try
    {
        let is_success = await user.registerUser(id, encryptedPassword.toString('base64'), name, birthday, gender);
        if(is_success)
        {
            res.json({result:"success"});
        }
        else
        {
            res.json({result:"fail"});
        }
    }
    catch(err)
    {
        console.error('userController.registerUser error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }

  };

  exports.loginUser = async(req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {id, passwd} = req.body;
    let encryptedPassword = crypto.pbkdf2Sync(passwd, process.env.SECRET_KEY, 1, 32, 'sha512');

    try
    {
        let is_success = await user.loginUser(id, encryptedPassword.toString('base64'));
        if(is_success)
        {
            res.json({result:"success"});
        }
        else
        {
            res.json({result:"fail"});
        }
    }
    catch(err)
    {
        console.error('userController.loginUser error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }

  };
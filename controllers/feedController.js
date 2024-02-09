const feed = require('../models/feedModel.js');

exports.insertFriendList = async(req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let {id, pw, name, birthday, gender} = req.body;
  let encryptedPassword = crypto.pbkdf2Sync(pw, process.env.SECRET_KEY, 1, 32, 'sha512');

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


exports.getUserList = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {id} = req.body;
    try
    {
        let rows = await user.getUserList(id);
        if(rows !== null)
        {
            res.json({result:"success", items: rows});
        }
        else
        {
            res.json({result:"fail"});
        }
    }
    catch(err)
    {
        console.error('userController.getUserList error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


const chat = require('../models/friendModel.js');



exports.insertFriendList = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {id, friend_id} = req.body;
    try
    {
        let is_success = await user.insertFriendList(id, friend_id);
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
        console.error('friendController.insertFriendList error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}



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
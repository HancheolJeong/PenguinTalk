const chat = require('../models/chatModel.js');

// 채팅 추가
  exports.insertChat = async(sender_id, receiver_id, message) => {

      try
      {
          let is_success = await chat.insertChat(sender_id, receiver_id, message);
          if(is_success)
          {
              return true;
          }
          else
          {
              return false;
          }
      }
      catch(err)
      {
          console.error('chatController.insertChat error:', err);
          return false;
      }
  }


  //채팅 불러오기
exports.getChat = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {sender_id, receiver_id} = req.body;
    try
    {
        let rows = await chat.getChat(sender_id, receiver_id);
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
        console.error('chatController.getChat error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}
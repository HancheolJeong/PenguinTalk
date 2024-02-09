const friend = require('../models/friendModel.js');


//친구 추가
exports.insertFriendList = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {user_id, friend_id} = req.body;
    try
    {
        let is_success = await friend.insertFriendList(user_id, friend_id);
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

//친구 삭제
exports.deleteFriendList = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {user_id, friend_id} = req.body;
    try
    {
        let is_success = await friend.deleteFriendList(user_id, friend_id);
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
        console.error('friendController.deleteFriendList error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


//친구 불러오기
exports.getFriendList = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {user_id} = req.body;
    try
    {
        let rows = await friend.getFriendList(user_id);
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
        console.error('friendController.getFriendList error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


//친구 요청 추가
exports.insertFriendRequest = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {sender_id, receiver_id} = req.body;
    try
    {
        let is_success = await friend.insertFriendRequest(sender_id, receiver_id);
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
        console.error('friendController.insertFriendRequest error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}

//친구 요청 삭제
exports.deleteFriendRequest = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {sender_id, receiver_id} = req.body;
    try
    {
        let is_success = await friend.deleteFriendRequest(sender_id, receiver_id);
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
        console.error('friendController.deleteFriendRequest error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


//내가 보낸 친구 요청 불러오기
exports.getFriendRequestFromMe = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {sender_id} = req.body;
    try
    {
        let rows = await friend.getFriendRequestFromMe(sender_id);
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
        console.error('friendController.getFriendRequestFromMe error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}

//내가 받은 친구 요청 불러오기
exports.getFriendRequestToMe = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {receiver_id} = req.body;
    try
    {
        let rows = await friend.getFriendRequestToMe(receiver_id);
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
        console.error('friendController.getFriendRequestToMe error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


//친구 차단 추가
exports.insertBlockedFriend = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {user_id, blocked_id} = req.body;
    try
    {
        let is_success = await friend.insertBlockedFriend(user_id, blocked_id);
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
        console.error('friendController.insertBlockedFriend error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}

//친구 차단 해제
exports.deleteBlockedFriend = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {user_id, blocked_id} = req.body;
    try
    {
        let is_success = await friend.deleteBlockedFriend(user_id, blocked_id);
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
        console.error('friendController.deleteBlockedFriend error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


//차단 목록
exports.getBlockedFriend = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {user_id} = req.body;
    try
    {
        let rows = await friend.getBlockedFriend(user_id);
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
        console.error('friendController.getBlockedFriend error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


//친구 요청이 가능한 사람 리스트
exports.getFriendToRequestPossible = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {user_id} = req.body;
    try
    {
        let rows = await friend.getFriendToRequestPossible(user_id);
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
        console.error('friendController.getFriendToRequestPossible error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


//친구 차단이 가능한 사람 리스트
exports.getFriendToBlockPossible = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {user_id} = req.body;
    try
    {
        let rows = await friend.getFriendToBlockPossible(user_id);
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
        console.error('friendController.getFriendToBlockPossible error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}


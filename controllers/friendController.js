const friend = require('../models/friendModel.js');


/**
 * 비동기식으로 친구들을 데이터베이스로부터 불러오기
 */
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

/**
 * 비동기식으로 친구를 데이터베이스로부터 삭제하기
 */
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


/**
 * 비동기식으로 사용자의 친구리스트를 데이터베이스로부터 불러오기 + 페이지네이션 적용
 */
exports.getFriendList = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let user_id = req.query.user_id;
    let page = req.query.page;
    page = (page - 1) * 10
    try
    {
        let rows = await friend.getFriendList(user_id, page);
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

/**
 * 비동기식으로 사용자의 친구리스트를 데이터베이스로부터 불러오기
 */
exports.getFriendListAll = async(req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "There is no content."
        });
      }
      let user_id = req.query.user_id;
      try
      {
          let rows = await friend.getFriendListAll(user_id);
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


/**
 * 비동기식으로 사용자의 친구요청을 데이터베이스에 추가하기
 */
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

/**
 * 비동기식으로 사용자의 친구요청을 데이터베이스에서 삭제하기
 */
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


/**
 * 비동기식으로 사용자가 보낸 친구요청을 데이터베이스로부터 불러오기
 */
exports.getFriendRequestFromMe = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let sender_id = req.query.user_id;
    let page = req.query.page;
    page = (page - 1) * 10
    try
    {
        let rows = await friend.getFriendRequestFromMe(sender_id, page);
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

/**
 * 비동기식으로 사용자가 받은 친구요청을 데이터베이스로부터 불러오기
 */
exports.getFriendRequestToMe = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let receiver_id = req.query.user_id;
    let page = req.query.page;
    page = (page - 1) * 10
    try
    {
        let rows = await friend.getFriendRequestToMe(receiver_id, page);
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


/**
 * 비동기식으로 사용자가 차단한 유저목록을 데이터베이스에 추가하기
 */
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

/**
 * 비동기식으로 사용자가 차단한 사용자를 데이터베이스로부터 삭제하기
 */
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


/**
 * 비동기식으로 사용자가 차단한 사용자들을 데이터베이스로부터 불러오기
 */
exports.getBlockedFriend = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let user_id = req.query.user_id;
    let page = req.query.page;
    page = (page - 1) * 10
    try
    {
        let rows = await friend.getBlockedFriend(user_id, page);
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


/**
 * 비동기식으로 사용자가 친구 요청이 가능한 사용자들을 데이터베이스로부터 불러오기
 */
exports.getFriendToRequestPossible = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let user_id = req.query.user_id;
    let page = req.query.page;
    page = (page - 1) * 10
    try
    {
        let rows = await friend.getFriendToRequestPossible(user_id, page);
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


/**
 * 비동기식으로 사용자가 차단 가능한 사용자들을 데이터베이스로부터 불러오기
 */
exports.getFriendToBlockPossible = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let user_id = req.query.user_id;
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


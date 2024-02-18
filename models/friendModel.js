const {pool, transaction} = require("./db.js");


/*
 친구 추가
+ 친구 요청 삭제도 필요 트랜잭션 처리 +++
*/
  exports.insertFriendList = async(user_id, friend_id) =>
  {
    try
    {
      const queries = [
        {
          queryString : `INSERT INTO friend_list (user_id, friend_id) VALUES (?,?)`,
          params: [user_id, friend_id]
        },
        {
          queryString : `INSERT INTO friend_list (user_id, friend_id) VALUES (?,?)`,
          params: [friend_id, user_id]
        }
  
      ];
      const result = await transaction(queries);
      if(result[0].affectedRows === 0 || result[1].affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
    }
    catch(error)
    {
      console.error('friendModel.insertFriendList error:', error);
      throw{message: "Server error", status:500};
    }
  };


/*
친구 삭제
*/
  exports.deleteFriendList = async (user_id, friend_id) => {
    try
    {
      const query = `DELETE FROM friend_list WHERE 
      (user_id = ? AND friend_id = ?) OR 
      (user_id = ? AND friend_id = ?)`;
      const result = await pool(query, [user_id, friend_id, friend_id, user_id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
    }
    catch(error)
    {
      console.error('userModel.registerUser error:', error);
      throw{message: "Server error", status:500};
    }
};


/*
친구 불러오기
*/
  exports.getFriendList = async(user_id, page) =>{
    try
    {
      const query = `
      SELECT id, name, birthday, gender, create_dt, login_dt, picture_url
      FROM user
      WHERE id IN(
          SELECT friend_id 
          FROM friend_list 
          WHERE user_id = ?)
      ORDER BY create_dt DESC
      LIMIT ?, 10
        `;
        const result = await pool(query, [user_id, page]);
        return (result.length < 0)? null : result;
    }
    catch(error)
    {
        console.error('friendModel.getFriendList error:', error);
        throw{message: "Server error", status:500};
    }
    
  };

  /*
친구 불러오기
*/
exports.getFriendListAll = async(user_id, page) =>{
  try
  {
    const query = `
    SELECT id, name, birthday, gender, create_dt, login_dt, picture_url
    FROM user
    WHERE id IN(
        SELECT friend_id 
        FROM friend_list 
        WHERE user_id = ?)
    ORDER BY create_dt DESC
      `;
      const result = await pool(query, [user_id, page]);
      return (result.length < 0)? null : result;
  }
  catch(error)
  {
      console.error('friendModel.getFriendListAll error:', error);
      throw{message: "Server error", status:500};
  }
  
};

  
/*
 친구 요청 추가
*/
exports.insertFriendRequest = async(sender_id, receiver_id) =>{
    try
    {
      const query = `INSERT INTO friend_request (sender_id, receiver_id)
      VALUES (?,?)`;
      const result = await pool(query, [sender_id, receiver_id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
    }
    catch(error)
    {
      console.error('friendModel.insertFriendRequest error:', error);
      throw{message: "Server error", status:500};
    }
  };

/*
 친구 요청 삭제
*/
  exports.deleteFriendRequest = async(sender_id, receiver_id) =>{
    try
    {
      const query = `DELETE FROM friend_request WHERE sender_id = ? AND receiver_id = ?`;
      const result = await pool(query, [sender_id, receiver_id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
    }
    catch(error)
    {
      console.error('friendModel.deleteFriendRequest error:', error);
      throw{message: "Server error", status:500};
    }
  };

/*
친구 요청 목록 (내가 보낸 요청)
*/
exports.getFriendRequestFromMe = async(sender_id, page) =>{
    try
    {
      const query = `
      SELECT id, name, birthday, gender, l.create_dt as create_dt, picture_url  
      FROM friend_request as l 
      JOIN user as r 
      ON l.receiver_id = r.id 
      WHERE l.sender_id = ?
      ORDER BY l.create_dt DESC
      LIMIT ?,10
        `;
        const result = await pool(query, [sender_id, page]);
        return (result.length < 0)? null : result;
    }
    catch(error)
    {
        console.error('friendModel.getFriendRequestFromMe error:', error);
        throw{message: "Server error", status:500};
    }
    
  };

/*
친구 요청 목록 (내가 받은 요청)
*/
exports.getFriendRequestToMe = async(receiver_id, page) =>{
    try
    {
      const query = `
      SELECT id, name, birthday, gender, l.create_dt as create_dt, picture_url  
      FROM friend_request as l 
      JOIN user as r 
      ON l.sender_id = r.id 
      WHERE l.receiver_id = ?
      ORDER BY l.create_dt DESC
      LIMIT ?, 10
        `;
        const result = await pool(query, [receiver_id, page]);
        return (result.length < 0)? null : result;
    }
    catch(error)
    {
        console.error('friendModel.getFriendListToMe error:', error);
        throw{message: "Server error", status:500};
    }
  };


  
/*
 친구 차단 추가
 + 친구 요청 삭제
 + 친구 목록 삭제도 같이 해야함. 트랜잭션 필요.
*/
exports.insertBlockedFriend = async(user_id, blocked_user_id) =>{
    try
    {
      const query = `INSERT INTO friend_blocking (user_id, blocked_user_id)
      VALUES (?,?)`;
      const result = await pool(query, [user_id, blocked_user_id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
    }
    catch(error)
    {
      console.error('friendModel.insertBlockedFriend error:', error);
      throw{message: "Server error", status:500};
    }
  };

/*
 친구 차단 삭제
*/
  exports.deleteBlockedFriend = async(user_id, blocked_user_id) =>{
    try
    {
      const query = `DELETE FROM friend_blocking WHERE user_id = ? AND blocked_user_id = ?`;
      const result = await pool(query, [user_id, blocked_user_id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
    }
    catch(error)
    {
      console.error('friendModel.deleteBlockedFriend error:', error);
      throw{message: "Server error", status:500};
    }
  };

/*
차단 친구 목록
*/
exports.getBlockedFriend = async(user_id, page) =>{
    try
    {
      const query = `
      SELECT id, name, birthday, gender, l.create_dt as create_dt, picture_url
      FROM friend_blocking as l 
      JOIN user as r
      ON l.blocked_user_id = r.id
      WHERE l.user_id = ?
      ORDER BY l.create_dt
      LIMIT ?, 10
        `;
        const result = await pool(query, [user_id, page]);
        return (result.length < 0)? null : result;
    }
    catch(error)
    {
        console.error('friendModel.getBlockedFriend error:', error);
        throw{message: "Server error", status:500};
    }
    
  };

/*
친구 요청이 가능한 사람
*/
exports.getFriendToRequestPossible = async(id, page) =>{
  try
  {
    const query = `
    SELECT id, name, birthday, gender, picture_url, create_dt FROM user WHERE id != ? AND (
      (id NOT IN (SELECT blocked_user_id FROM friend_blocking WHERE user_id = ?))AND
      (id NOT IN (SELECT sender_id FROM friend_request WHERE receiver_id = ?)) AND 
      (id NOT IN (SELECT receiver_id FROM friend_request WHERE sender_id = ?)) AND
      (id NOT IN (SELECT friend_id FROM friend_list WHERE user_id = ?))
      )
      ORDER BY create_dt DESC
      LIMIT ?, 10
    `;
    const result = await pool(query, [id, id, id, id, id, page]);
    return (result.length < 0)? null : result;
  }
  catch(error)
  {
    console.error('friendModel.getFriendToRequestPossible error:', error);
    throw{message: "Server error", status:500};
  }
  
};

/*
친구 차단이 가능한 사람
*/
exports.getFriendToBlockPossible = async(id) =>{
  try
  {
    const query = `
    SELECT id, name, birthday, gender, picture_url FROM user WHERE id != ? AND 
    id NOT IN (SELECT blocked_user_id FROM friend_blocking WHERE user_id = ?)
    `;
    const result = await pool(query, [id, id]);
    return (result.length < 0)? null : result;
  }
  catch(error)
  {
    console.error('friendModel.getFriendToBlockPossible error:', error);
    throw{message: "Server error", status:500};
  }
  
};
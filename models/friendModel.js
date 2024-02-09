const {pool, transaction} = require("./db.js");


/*
 친구 불러오기
*/
exports.insertFriendList = async(user_id, friend_id) =>{
    try
    {
      const query = `INSERT INTO friend_list (user_id, friend_id)
      VALUES (?,?)`;
      const result = await pool(query, [user_id, friend_id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
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
    try {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            const query = `DELETE FROM friend_list WHERE 
                (user_id = ? AND friend_id = ?) OR 
                (user_id = ? AND friend_id = ?)`;
            const result = await connection.query(query, [user_id, friend_id, friend_id, user_id]);

            await connection.commit();

            if (result.affectedRows === 0) {
                throw { message: 'No records deleted', status: 404 };
            }

            return result;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('friendModel.deleteFriendList error:', error);
        throw { message: 'Server error', status: 500 };
    }
};


/*
친구 불러오기
*/
  exports.getFriendList = async(user_id) =>{
    try
    {
      const query = `
      SELECT id, name, birthday, gender, create_dt, login_dt, picture_url
      FROM user
      WHERE id IN(
          SELECT friend_id 
          FROM friend_list 
          WHERE user_id = ?)
        `;
        const result = await pool(query, [user_id]);
        return (result.length < 0)? null : result[0];;
    }
    catch(error)
    {
        console.error('friendModel.getFriendList error:', error);
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
      return result;
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
      return result;
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
exports.getFriendRequestFromMe = async(sender_id) =>{
    try
    {
      const query = `SELECT receiver_id, create_dt FROM friend_request WHERE sender_id = ?
        `;
        const result = await pool(query, [sender_id]);
        return (result.length < 0)? null : result[0];;
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
exports.getFriendListToMe = async(receiver_id) =>{
    try
    {
      const query = `SELECT sender_id, create_dt FROM friend_request WHERE receiver_id = ?
        `;
        const result = await pool(query, [receiver_id]);
        return (result.length < 0)? null : result[0];;
    }
    catch(error)
    {
        console.error('friendModel.getFriendListToMe error:', error);
        throw{message: "Server error", status:500};
    }
  };


  
/*
 친구 차단 추가
*/
exports.insertFriendBlocking = async(user_id, blocked_user_id) =>{
    try
    {
      const query = `INSERT INTO friend_blocking (?, ?)
      VALUES (?,?)`;
      const result = await pool(query, [user_id, blocked_user_id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
    }
    catch(error)
    {
      console.error('friendModel.insertFriendBlocking error:', error);
      throw{message: "Server error", status:500};
    }
  };

/*
 친구 차단 삭제
*/
  exports.deleteFriendRequest = async(user_id, blocked_user_id) =>{
    try
    {
      const query = `DELETE FROM friend_blocking WHERE user_id = ? AND blocked_user_id = ?`;
      const result = await pool(query, [user_id, blocked_user_id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
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
exports.getFriendBlocking = async(user_id) =>{
    try
    {
      const query = `SELECT blocked_user_id FROM friend_request WHERE user_id = ?
        `;
        const result = await pool(query, [user_id]);
        return (result.length < 0)? null : result[0];;
    }
    catch(error)
    {
        console.error('friendModel.getFriendRequestFromMe error:', error);
        throw{message: "Server error", status:500};
    }
    
  };

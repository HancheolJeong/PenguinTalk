const { pool, executeQuery } = require("./db.js");

  exports.registerUser = async(id, passwd, name, birthday, gender) =>{
    try
    {
      const query = `INSERT INTO user (id, passwd, name, birthday, gender)
      VALUES (?,?,?,?,?)`;
      const result = await executeQuery(query, [id, passwd, name, birthday, gender]);
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

  exports.updateUser = async(name, birthday, gender, id) =>{
    try
    {
      const query = `UPDATE user SET name = ?, birthday = ?, gender = ? WHERE id = ?`;
      const result = await executeQuery(query, [name, birthday, gender, id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
    }
    catch(error)
    {
      console.error('userModel.updateUser error:', error);
      throw{message: "Server error", status:500};
    }
  };

  exports.updatePictureUrl = async(picture_url, id) =>{
    try
    {
      const query = `UPDATE user SET picture_url = ? WHERE id = ?`;
      const result = await executeQuery(query, [picture_url, id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
    }
    catch(error)
    {
      console.error('userModel.updateUser error:', error);
      throw{message: "Server error", status:500};
    }
  };

  exports.updatePassword = async(passwd, id) =>{
    try
    {
      const query = `UPDATE user SET passwd = ? WHERE id = ?`;
      const result = await executeQuery(query, [passwd, id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
    }
    catch(error)
    {
      console.error('userModel.updatePassword error:', error);
      throw{message: "Server error", status:500};
    }
  };


  exports.deleteUser = async(id) =>{
    try
    {
      const query = `DELETE FROM user WHERE id = ?`;
      const result = await executeQuery(query, [id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
    }
    catch(error)
    {
      console.error('userModel.deleteUser error:', error);
      throw{message: "Server error", status:500};
    }
  };

  exports.loginUser = async(id, passwd) =>
  {
    const connection = await pool.getConnection();
    connection.beginTransaction();
    const results = [];
    try{
      await connection.beginTransaction();
      let query = `SELECT id FROM user WHERE id = ? AND passwd = ?`;
      let [res] = await connection.execute(query, [id, passwd]);
      results.push(res);
  
      query = `UPDATE user SET login_dt = CURRENT_TIMESTAMP WHERE id = ?`;
      [res] = await connection.execute(query, [id]);
      results.push(res);

      await connection.commit();
    }
    catch (error)
    {
      console.error('error occured ', error);
      await connection.rollback();
      return false;
    }finally{
      connection.release();
    }
    return true;

  }

  exports.getUser = async(id) =>{
    try
    {
      const query = `SELECT id, name, birthday, gender, create_dt, login_dt, picture_url FROM user WHERE id = ?;`;
      const result = await executeQuery(query, [id]);
      return (result.length < 0)? null : result;
    }
    catch(error)
    {
      console.error('userModel.getUser error:', error);
      throw{message: "Server error", status:500};
    }
    
  };


  exports.getUserName = async(id) =>{
    try
    {
      const query = `SELECT name FROM user WHERE id = ?;`;
      const result = await executeQuery(query, [id]);
      return (result.length < 0)? null : result;
    }
    catch(error)
    {
      console.error('userModel.getUserName error:', error);
      throw{message: "Server error", status:500};
    }
    
  };


  exports.getUserPictureUrl = async(id) =>{
    try
    {
      const query = `SELECT picture_url FROM user WHERE id = ?;`;
      const result = await executeQuery(query, [id]);
      return (result.length < 0)? null : result;
    }
    catch(error)
    {
      console.error('userModel.getUserPictureUrl error:', error);
      throw{message: "Server error", status:500};
    }
    
  };

  //차단된 친구를 제외한 모든 사람 출력 차단 가능한 사람들..
  exports.getUserList = async(id) =>{
    try
    {
      const query = `SELECT id, name, birthday, gender, picture_url FROM user WHERE id != ? AND id NOT IN (SELECT blocked_user_id FROM friend_blocking WHERE user_id = ?);`;
      const result = await executeQuery(query, [id, id]);
      return (result.length < 0)? null : result;
    }
    catch(error)
    {
      console.error('userModel.getUserList error:', error);
      throw{message: "Server error", status:500};
    }
    
  };


  
const sql = require("./db.js");

/*패스워드 보안작업 필요 */
  exports.registerUser = async(id, passwd, name, birthday, gender, create_dt, login_dt, picture_url) =>{
    try
    {
      const query = `INSERT INTO user (id, passwd, name, birthday, gender, create_dt, login_dt, picture_url)
      VALUES (?,?,?,?,?,?,?,?)`;
      const result = await pool(query, [id, passwd, name, birthday, gender, create_dt, login_dt, picture_url]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
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
      const result = await pool(query, [name, birthday, gender, id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
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
      const result = await pool(query, [passwd, id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
    }
    catch(error)
    {
      console.error('userModel.updatePassword error:', error);
      throw{message: "Server error", status:500};
    }
  };


  exports.updatelogin_dt = async(passwd, id) =>{
    try
    {
      const query = `UPDATE user SET login_dt = ? WHERE id = ?`;
      const result = await pool(query, [login_dt, id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
    }
    catch(error)
    {
      console.error('userModel.updatelogin_dt error:', error);
      throw{message: "Server error", status:500};
    }
  };


  exports.deleteUser = async(id) =>{
    try
    {
      const query = `DELETE FROM user WHERE id = ?`;
      const result = await pool(query, [id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
    }
    catch(error)
    {
      console.error('userModel.deleteUser error:', error);
      throw{message: "Server error", status:500};
    }
  };


  exports.getUser = async(id) =>{
    try
    {
      const query = `SELECT id, name, birthday, gender, create_dt, login_dt, picture_url WHERE id = ?;`;
      const result = await pool(query, [id]);
      return (result.length < 0)? null : result[0];;
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
      const query = `SELECT name WHERE id = ?;`;
      const result = await pool(query, [id]);
      return (result.length < 0)? null : result[0];;
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
      const query = `SELECT picturl_url WHERE id = ?;`;
      const result = await pool(query, [id]);
      return (result.length < 0)? null : result[0];;
    }
    catch(error)
    {
      console.error('userModel.getUserPictureUrl error:', error);
      throw{message: "Server error", status:500};
    }
    
  };


  
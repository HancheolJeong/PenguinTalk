const { pool, executeQuery } = require("./db.js");

/**
 * 회원을 추가하는 함수
 * @param {string} id : 회원 ID
 * @param {string} passwd : 회원 패스워드
 * @param {string} name : 회원 이름
 * @param {date} birthday : 회원 생일
 * @param {int} gender : 회원 성별 0:남자 1:여자
 * @returns true or false
 */  
exports.registerUser = async(id, passwd, name, birthday, gender) =>{
    try
    {
      const query = `INSERT INTO user (id, passwd, name, birthday, gender)
      VALUES (?,?,?,?,?)`;
      const result = await executeQuery(query, [id, passwd, name, birthday, gender]);
      if(result.affectedRows === 0)
      {
        return false;
      }
      return true;
    }
    catch(error)
    {
      console.error('userModel.registerUser error:', error);
      throw{message: "Server error", status:500};
    }
  };

  /**
   * 회원정보를 업데이트하는 함수
   * @param {string} name : 회원 이름
   * @param {date} birthday : 회원 생일
   * @param {int} gender : 회원 성별 0:남자 1:여자
   * @param {string} id : 회원 ID
   * @returns true or false
   */
  exports.updateUser = async(name, birthday, gender, id) =>{
    try
    {
      const query = `UPDATE user SET name = ?, birthday = ?, gender = ? WHERE id = ?`;
      const result = await executeQuery(query, [name, birthday, gender, id]);
      if(result.affectedRows === 0)
      {
        return false;
      }
      return true;
    }
    catch(error)
    {
      console.error('userModel.updateUser error:', error);
      throw{message: "Server error", status:500};
    }
  };

  /**
   * 회원사진을 업데이트하는 함수
   * @param {string} picture_url : 이미지 경로
   * @param {string} id : 회원 ID
   * @returns true or false
   */
  exports.updatePictureUrl = async(picture_url, id) =>{
    try
    {
      const query = `UPDATE user SET picture_url = ? WHERE id = ?`;
      const result = await executeQuery(query, [picture_url, id]);
      if(result.affectedRows === 0)
      {
        return false;
      }
      return true;
    }
    catch(error)
    {
      console.error('userModel.updateUser error:', error);
      throw{message: "Server error", status:500};
    }
  };

  /**
   * 회원 패스워드를 변경하는 함수
   * @param {string} passwd : 회원 패스워드
   * @param {string} id : 회원 ID
   * @returns true or false
   */
  exports.updatePassword = async(passwd, id) =>{
    try
    {
      const query = `UPDATE user SET passwd = ? WHERE id = ?`;
      const result = await executeQuery(query, [passwd, id]);
      if(result.affectedRows === 0)
      {
        return false;
      }
      return true;
    }
    catch(error)
    {
      console.error('userModel.updatePassword error:', error);
      throw{message: "Server error", status:500};
    }
  };


  /**
   * 회원 삭제하는 함수 회원 ID를 기준으로 삭제
   * @param {string} id : 회원 ID
   * @returns json
   */
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

  /**
   * 회원 로그인하는 함수
   * @param {string} id 
   * @param {string} passwd 
   * @returns true or false
   */
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
      if (res.length === 0) {
        await connection.rollback();
        return false;
      }
  
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

  /**
   * 회원 정보를 불러오는 함수 id를 기준으로 가져온다.
   * @param {string} id : 회원 ID
   * @returns json
   */
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

/**
 * 회원 ID를 기준으로 회원 이름을 불러오는 함수. (미사용)
 * @param {string} id : 회원 ID
 * @returns json
 */
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

/**
 * 회원id를 기준으로 이미지를 불러오는 함수
 * @param {string} id : 회원 ID
 * @returns json
 */
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

/**
 * 회원 ID를 기준으로 친구요청이 가능한 사용자 목록을 불러온다. (미사용)
 * @param {string} id : 회원 ID
 * @returns json
 */
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


  
const { pool, executeQuery } = require("./db.js");

/**
 * 친구 추가하는 함수 
 * @param {string} user_id : 사용자 ID
 * @param {string} friend_id : 사용자의 친구 ID
 * @returns true or false
 * 트랜잭션 처리, 친구 목록은 사용자 ID와 친구 ID 쌍으로 저장하며
 * 친구 요청 테이블 레코드를 동시에 삭제 함
 */
exports.insertFriendList = async (user_id, friend_id) => {
  const connection = await pool.getConnection();
  connection.beginTransaction();
  const results = [];
  try{
    await connection.beginTransaction();
    let query = `INSERT INTO friend_list (user_id, friend_id) VALUES (?,?)`;
    let [res] = await connection.execute(query, [user_id, friend_id]);
    results.push(res);

    query = `INSERT INTO friend_list (user_id, friend_id) VALUES (?,?)`;
    [res] = await connection.execute(query, [friend_id, user_id]);
    results.push(res);

    query = `DELETE FROM friend_request WHERE sender_id = ? AND receiver_id = ?`;
    [res] = await connection.execute(query, [friend_id, user_id]);
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
};


/**
 * 친구 삭제하는 함수
 * @param {string} user_id : 사용자 ID
 * @param {string} friend_id : 사용자의 친구 ID
 * @returns true or false
 */
exports.deleteFriendList = async (user_id, friend_id) => {
  try {
    const query = `DELETE FROM friend_list WHERE 
      (user_id = ? AND friend_id = ?) OR 
      (user_id = ? AND friend_id = ?)`;
    const result = await executeQuery(query, [user_id, friend_id, friend_id, user_id]);
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }
  catch (error) {
    console.error('userModel.registerUser error:', error);
    throw { message: "Server error", status: 500 };
  }
};


/**
 * 친구 목록을 사용자 ID 기준으로 불러오는 함수
 * @param {string} user_id : 사용자 ID
 * @param {int} page : 페이지 번호
 * @returns json
 */
exports.getFriendList = async (user_id, page) => {
  try {
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
    const result = await executeQuery(query, [user_id, page]);
    return (result.length < 0) ? null : result;
  }
  catch (error) {
    console.error('friendModel.getFriendList error:', error);
    throw { message: "Server error", status: 500 };
  }

};

/**
 * 찬구목록 전체 다 가져오는 함수
 * @param {string} user_id : 사용자 ID
 * @returns {string} : json
 */
exports.getFriendListAll = async (user_id) => {
  try {
    const query = `
    SELECT id, name, birthday, gender, create_dt, login_dt, picture_url
    FROM user
    WHERE id IN(
        SELECT friend_id 
        FROM friend_list 
        WHERE user_id = ?)
    ORDER BY create_dt DESC
      `;
    const result = await executeQuery(query, [user_id]);
    return (result.length < 0) ? null : result;
  }
  catch (error) {
    console.error('friendModel.getFriendListAll error:', error);
    throw { message: "Server error", status: 500 };
  }

};

/**
 * 친구 요청 추가
 * @param {string} sender_id : 친구 요청한 사용자 ID
 * @param {string} receiver_id : 친구 요청받은 사용자 ID
 * @returns true or false
 */
exports.insertFriendRequest = async (sender_id, receiver_id) => {
  try {
    const query = `INSERT INTO friend_request (sender_id, receiver_id)
      VALUES (?,?)`;
    const result = await executeQuery(query, [sender_id, receiver_id]);
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }
  catch (error) {
    console.error('friendModel.insertFriendRequest error:', error);
    throw { message: "Server error", status: 500 };
  }
};



/**
 * 친구 요청 삭제
 * @param {string} sender_id : 친구 요청한 사용자 ID
 * @param {string} receiver_id : 친구 요청받은 사용자 ID
 * @returns true or false
 */
exports.deleteFriendRequest = async (sender_id, receiver_id) => {
  try {
    const query = `DELETE FROM friend_request WHERE sender_id = ? AND receiver_id = ?`;
    const result = await executeQuery(query, [sender_id, receiver_id]);
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }
  catch (error) {
    console.error('friendModel.deleteFriendRequest error:', error);
    throw { message: "Server error", status: 500 };
  }
};


/**
 * 사용자가 보낸 친구요청 목록 불러오는 함수
 * @param {string} sender_id : 친구요청한 사용자 ID 
 * @param {int} page : 페이지 번호
 * @returns json
 */
exports.getFriendRequestFromMe = async (sender_id, page) => {
  try {
    const query = `
      SELECT id, name, birthday, gender, l.create_dt as create_dt, picture_url  
      FROM friend_request as l 
      JOIN user as r 
      ON l.receiver_id = r.id 
      WHERE l.sender_id = ?
      ORDER BY l.create_dt DESC
      LIMIT ?,10
        `;
    const result = await executeQuery(query, [sender_id, page]);
    return (result.length < 0) ? null : result;
  }
  catch (error) {
    console.error('friendModel.getFriendRequestFromMe error:', error);
    throw { message: "Server error", status: 500 };
  }

};

/**
 * 사용자가 받은 친구요청 목록 불러오는 함수
 * @param {string} sender_id : 친구요청받은 사용자 ID 
 * @param {int} page : 페이지 번호
 * @returns json
 */
exports.getFriendRequestToMe = async (receiver_id, page) => {
  try {
    const query = `
      SELECT id, name, birthday, gender, l.create_dt as create_dt, picture_url  
      FROM friend_request as l 
      JOIN user as r 
      ON l.sender_id = r.id 
      WHERE l.receiver_id = ?
      ORDER BY l.create_dt DESC
      LIMIT ?, 10
        `;
    const result = await executeQuery(query, [receiver_id, page]);
    return (result.length < 0) ? null : result;
  }
  catch (error) {
    console.error('friendModel.getFriendListToMe error:', error);
    throw { message: "Server error", status: 500 };
  }
};



/**
 * 차단할 사용자 추가
 * @param {string} user_id : 차단한 사용자 ID
 * @param {string} blocked_user_id : 차단된 사용자 ID
 * @returns ture or false
 * 트랜잭션 처리 , 유저를 차단 할 때, 친구목록에서 삭제하고, 친구 요청도 삭제한다.
 */
exports.insertBlockedFriend = async (user_id, friend_id) => {
  const connection = await pool.getConnection();
  connection.beginTransaction();
  const results = [];
  try{
    await connection.beginTransaction();
    let query = `INSERT INTO friend_blocking (user_id, blocked_user_id) VALUES (?,?)`;
    let [res] = await connection.execute(query, [user_id, friend_id]);
    results.push(res);

    query = `DELETE FROM friend_list WHERE user_id = ? AND friend_id = ?`;
    [res] = await connection.execute(query, [user_id, friend_id]);
    results.push(res);

    query = `DELETE FROM friend_list WHERE user_id = ? AND friend_id = ?`;
    [res] = await connection.execute(query, [friend_id, user_id]);
    results.push(res);

    query = `DELETE FROM friend_request WHERE sender_id = ? AND receiver_id = ?`;
    [res] = await connection.execute(query, [user_id, friend_id]);
    results.push(res);

    query = `DELETE FROM friend_request WHERE sender_id = ? AND receiver_id = ?`;
    [res] = await connection.execute(query, [friend_id, user_id]);
    results.push(res);

    await connection.commit();
  }catch(error)
  {
    console.error('error occured ', error);
    await connection.rollback();
    return false;
  }finally
  {
    connection.release();
  }

  return true;
};


/**
 * 친구 차단 해제하는 함수
 * @param {string} user_id : 사용자 ID 
 * @param {string} blocked_user_id : 차단된 사용자 ID
 * @returns true or false
 */
exports.deleteBlockedFriend = async (user_id, blocked_user_id) => {
  try {
    const query = `DELETE FROM friend_blocking WHERE user_id = ? AND blocked_user_id = ?`;
    const result = await executeQuery(query, [user_id, blocked_user_id]);
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }
  catch (error) {
    console.error('friendModel.deleteBlockedFriend error:', error);
    throw { message: "Server error", status: 500 };
  }
};



/**
 * 차단된 사용자정보를 가져오는 함수
 * @param {string} user_id : 사용자 ID
 * @param {int} page : 페이지 번호
 * @returns json
 */
exports.getBlockedFriend = async (user_id, page) => {
  try {
    const query = `
      SELECT id, name, birthday, gender, l.create_dt as create_dt, picture_url
      FROM friend_blocking as l 
      JOIN user as r
      ON l.blocked_user_id = r.id
      WHERE l.user_id = ?
      ORDER BY l.create_dt
      LIMIT ?, 10
        `;
    const result = await executeQuery(query, [user_id, page]);
    return (result.length < 0) ? null : result;
  }
  catch (error) {
    console.error('friendModel.getBlockedFriend error:', error);
    throw { message: "Server error", status: 500 };
  }

};


/**
 * 친구 요청이 가능한 사용자 목록을 리턴하는 함수
 * @param {string} id : 사용자 ID
 * @param {int} page : 페이지 번호
 * @returns json
 * 친구, 차단, 친구요청 상태가 없는 사용자 목록
 */
exports.getFriendToRequestPossible = async (id, page) => {
  try {
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
    const result = await executeQuery(query, [id, id, id, id, id, page]);
    return (result.length < 0) ? null : result;
  }
  catch (error) {
    console.error('friendModel.getFriendToRequestPossible error:', error);
    throw { message: "Server error", status: 500 };
  }

};


/**
 * 차단이 가능한 사용자 목록을 리턴하는 함수
 * @param {string} id : 사용자 ID 
 * @returns json
 */
exports.getFriendToBlockPossible = async (id) => {
  try {
    const query = `
    SELECT id, name, birthday, gender, picture_url FROM user WHERE id != ? AND 
    id NOT IN (SELECT blocked_user_id FROM friend_blocking WHERE user_id = ?)
    `;
    const result = await executeQuery(query, [id, id]);
    return (result.length < 0) ? null : result;
  }
  catch (error) {
    console.error('friendModel.getFriendToBlockPossible error:', error);
    throw { message: "Server error", status: 500 };
  }

};
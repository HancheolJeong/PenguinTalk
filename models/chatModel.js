const { executeQuery } = require("./db.js");

/**
 * 채팅기록을 저장하는 함수
 * @param {string} sender_id : 메시지를 보낸 사용자 ID
 * @param {string} receiver_id : 메시지를 받은 사용자 ID
 * @param {string} message_content : 메시지 내용
 * @returns true or false
 */
  exports.insertChat = async(sender_id, receiver_id, message_content) =>{
    try
    {
      const query = `INSERT INTO chat_history (sender_id, receiver_id, message_content)
      VALUES (?,?,?)`;
      const result = await executeQuery(query, [sender_id, receiver_id, message_content]);
      if(result.affectedRows === 0)
      {
        return false;
      }
      return true;
    }
    catch(error)
    {
      console.error('chatModel.insertChat error:', error);
      throw{message: "Server error", status:500};
    }
  };


/**
 * 채팅기록을 불러오는 함수
 * @param {string} sender_id : 메시지를 보낸 사용자 ID
 * @param {string} receiver_id : 메시지를 받은 사용자 ID
 * @returns json
 */
  exports.getChat = async(sender_id, receiver_id) =>{
    try
    {
      const query = `
      SELECT id, sender_id, receiver_id, message_content, create_dt 
      FROM chat_history 
      WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) 
      ORDER BY create_dt DESC
      LIMIT 0, 10
        `;
        const result = await executeQuery(query, [sender_id, receiver_id, receiver_id, sender_id]);
        return (result.length < 0)? null : result;
    }
    catch(error)
    {
        console.error('chatModel.getChat error:', error);
        throw{message: "Server error", status:500};
    }
    
  };

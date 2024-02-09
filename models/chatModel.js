const {pool} = require("./db.js");
/*
채팅 추가
*/
  exports.insertChat = async(sender_id, receiver_id, message_content) =>{
    try
    {
      const query = `INSERT INTO chat_history (sender_id, receiver_id, message_content)
      VALUES (?,?,?)`;
      const result = await pool(query, [sender_id, receiver_id, message_content]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
    }
    catch(error)
    {
      console.error('chatModel.insertChat error:', error);
      throw{message: "Server error", status:500};
    }
  };

/*
글 불러오기 scope 0 : 전체, 1 : 친구만, 2 : 나만보기
*/
  exports.getChat = async(sender_id, receiver_id) =>{
    try
    {
      const query = `
      SELECT id, sender_id, receiver_id, message_content, create_dt 
      FROM chat_history 
      WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) 
      
        `;
        const result = await pool(query, [sender_id, receiver_id, receiver_id, sender_id]);
        return (result.length < 0)? null : result[0];;
    }
    catch(error)
    {
        console.error('chatModel.getChat error:', error);
        throw{message: "Server error", status:500};
    }
    
  };

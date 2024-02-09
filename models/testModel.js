const {pool, transaction, commentTransaction} = require("./db.js");


/*
댓글 추가
*/
exports.Test = async(post_id, user_id, content, taggedUsers) =>{
    try
    {
        const queries = [
            {
                queryString : `INSERT INTO comments (post_id, user_id, content) VALUES (?,?,?)`,
                params: [post_id, user_id, content]
            }
        ];

      const result = await commentTransaction(queries, taggedUsers);
      console.log(result[0]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
    }
    catch(error)
    {
      console.error('feedModel.Test error:', error);
      throw{message: "Server error", status:500};
    }
  };
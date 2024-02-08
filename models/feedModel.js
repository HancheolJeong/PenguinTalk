const pool = require("./db.js");



/*
글 추가
*/
  exports.insertPost = async(user_id, title, content_url, scope) =>{
    try
    {
      const query = `INSERT INTO post (user_id, title, content_url, scope)
      VALUES (?,?,?,?)`;
      const result = await pool(query, [user_id, title, content_url, scope]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
    }
    catch(error)
    {
      console.error('feedModel.insertPost error:', error);
      throw{message: "Server error", status:500};
    }
  };
  
/*
글 수정
*/
  exports.updatePost = async(title, content_url, scope, id) =>{
    try
    {
        const query = `UPDATE post SET title = ?, content_url = ?, scope = ?
        WHERE id = ?`;
        const result = await pool(query, [title, content_url, scope, id]);
        if(result.affectedRows === 0)
        {
            throw{message: 'db error', status:404};
        }
        return result;
    }
    catch(error)
    {
        console.error('feedModel.updatePost error:', error);
        throw{message: "Server error", status:500};
    }
  };

/*
글 삭제
*/
  exports.deletepost = async(id) =>{
    try
    {
        const query = `DELETE FROM post WHERE id = ?`;
        const result = await pool(query, [id]);
        if(result.affectedRows === 0)
        {
            throw{message: 'db error', status:404};
        }
        return result;
    }
    catch(error)
    {
        console.error('feedModel.deletepost error:', error);
        throw{message: "Server error", status:500};
    }
  };

/*
글 불러오기 scope 0 : 전체, 1 : 친구만, 2 : 나만보기
*/
  exports.getPost = async(user_id, start, end) =>{
    try
    {
      const query = `
      SELECT *
      FROM(
        SELECT id, user_id, title, content_url, scope, create_dt 
        FROM (
          SELECT * 
          FROM post 
          WHERE user_id NOT IN (
            SELECT blocked_user_id 
            FROM friend_blocking 
            WHERE user_id = ?)) as l
        WHERE scope = 0 OR user_id = ?

        UNION ALL

        SELECT l.id, l.user_id, l.title, l.content_url, l.scope, l.create_dt 
        FROM (
          SELECT * 
          FROM post 
          WHERE scope = 1) as l 
        JOIN (
          SELECT * 
          FROM friend_list 
          WHERE user_id = ?) as r 
        ON l.user_id = r.friend_id
      ) as res
      ORDER BY res.create_dt desc
      LIMIT ?,?
        `;
        const result = await pool(query, [user_id, user_id, user_id, start, end]);
        return (result.length < 0)? null : result[0];;
    }
    catch(error)
    {
        console.error('feedModel.getPost error:', error);
        throw{message: "Server error", status:500};
    }
    
  };

/*
댓글 추가
*/
  exports.insertComment = async(post_id, user_id, content) =>{
    try
    {
      const query = `INSERT INTO comments (post_id, user_id, content)
      VALUES (?,?,?)`;
      const result = await pool(query, [post_id, user_id, content]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
    }
    catch(error)
    {
      console.error('feedModel.insertComment error:', error);
      throw{message: "Server error", status:500};
    }
  };
  
/*
댓글 수정
*/
  exports.updateComment = async(content, id) =>{
    try
    {
      const query = `UPDATE comments SET content = ?
      WHERE id = ?`;
      const result = await pool(query, [content, id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
    }
    catch(error)
    {
      console.error('feedModel.updateComment error:', error);
      throw{message: "Server error", status:500};
    }
  };


/*
댓글 삭제
*/
  exports.deletecomment = async(id) =>{
    try
    {
      const query = `DELETE FROM comments WHERE id = ?`;
      const result = await pool(query, [id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
    }
    catch(error)
    {
      console.error('feedModel.deletecomment error:', error);
      throw{message: "Server error", status:500};
    }
  };


  /*
  댓글 보기 + 태그된 사람의 수
  */
  exports.getComment = async(post_id, start, end) =>{
    try
    {
      const query = `
      SELECT l.id as id, l.post_id as post_id, l.user_id as user_id, l.content as content, l.create_dt as create_dt, COUNT(r.comment_id) as comment_id
      FROM comments as l
      LEFT JOIN tags as r ON l.id = r.comment_id
      WHERE l.post_id = ?
      GROUP BY l.id
      LIMIT ?, ?
        `;
        const result = await pool(query, [post_id, start, end]);
        return (result.length < 0)? null : result[0];;
    }
    catch(error)
    {
        console.error('feedModel.getComment error:', error);
        throw{message: "Server error", status:500};
    }
    
  };

  /*
  태그 추가
  */
  exports.insertTag = async(comment_id, user_id) =>{
    try
    {
      const query = `INSERT INTO tags (comment_id, user_id)
      VALUES (?,?)`;
      const result = await pool(query, [comment_id, user_id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
    }
    catch(error)
    {
      console.error('feedModel.insertTag error:', error);
      throw{message: "Server error", status:500};
    }
  };
/*
태그 수정
*/
  exports.UpdateTag = async(comment_id, user_id) =>{
    try
    {
      const query = `INSERT INTO tags (comment_id, user_id)
      VALUES (?,?)`;
      const result = await pool(query, [comment_id, user_id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return result;
    }
    catch(error)
    {
      console.error('feedModel.UpdateTag error:', error);
      throw{message: "Server error", status:500};
    }
  };

/*
태그된 친구 불러오기
*/
  exports.getTag = async(comment_id) =>{
    try
    {
      const query = `SELECT comment_id, user_id, create_dt, checking FROM tags WHERE post_id = ? order by create_dt desc LIMIT ?, ?;`;
      const result = await pool(query, [comment_id]);
      return (result.length < 0)? null : result[0];;
    }
    catch(error)
    {
      console.error('feedModel.getTag error:', error);
      throw{message: "Server error", status:500};
    }
    
  };
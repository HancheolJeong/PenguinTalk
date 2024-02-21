const { pool, executeQuery } = require("./db.js");


/*
글 추가
*/
  exports.insertPost = async(user_id, title, content_url, scope) =>{
    try
    {
      const query = `INSERT INTO post (user_id, title, content_url, scope)
      VALUES (?,?,?,?)`;
      const result = await executeQuery(query, [user_id, title, content_url, scope]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
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
        const result = await executeQuery(query, [title, content_url, scope, id]);
        if(result.affectedRows === 0)
        {
            throw{message: 'db error', status:404};
        }
        return true;
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
  exports.deletePost = async(id) =>{
    try
    {
        const query = `DELETE FROM post WHERE id = ?`;
        const result = await executeQuery(query, [id]);
        if(result.affectedRows === 0)
        {
            throw{message: 'db error', status:404};
        }
        return true;
    }
    catch(error)
    {
        console.error('feedModel.deletepost error:', error);
        throw{message: "Server error", status:500};
    }
  };

/*
글 불러오기 scope 0 : 전체, 1 : 친구만, 2 : 나만보기 (로그인 상태)
*/
  exports.getPostWhileLogin = async(user_id, page) =>{
    try
    {
      const query = `
      SELECT l.id as id, l.user_id as user_id, l.title as title, l.content_url as content_url, 
      l.scope as scope, l.create_dt as create_dt, r.name as name, IFNULL(c.cnt, 0) as count_comment
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
        ) as l
		    LEFT JOIN (
          SELECT COUNT(*) AS cnt, post_id 
          FROM comments 
          GROUP BY post_id) as c
        ON l.id = c.post_id
        JOIN user as r
        ON l.user_id = r.id
        ORDER BY create_dt desc
        LIMIT ?,10
        `;
        const result = await executeQuery(query, [user_id, user_id, user_id, page]);
        return (result.length < 0)? null : result;
    }
    catch(error)
    {
        console.error('feedModel.getPost error:', error);
        throw{message: "Server error", status:500};
    }
    
  };

  /*
글 불러오기 scope 0 : 전체, 1 : 친구만, 2 : 나만보기 (로그인 상태)
*/
exports.getSearchedPostWhileLogin = async(user_id, page, keyword) =>{
  try
  {
    const query = `
    SELECT l.id as id, l.user_id as user_id, l.title as title, l.content_url as content_url, 
    l.scope as scope, l.create_dt as create_dt, r.name as name, IFNULL(c.cnt, 0) as count_comment
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
      ) as l
      LEFT JOIN (
        SELECT COUNT(*) AS cnt, post_id 
        FROM comments 
        GROUP BY post_id) as c
      ON l.id = c.post_id
      JOIN user as r
      ON l.user_id = r.id
      WHERE l.title LIKE ?
      ORDER BY create_dt desc
      LIMIT ?,10
      `;
      const result = await executeQuery(query, [user_id, user_id, user_id, `%${keyword}%`, page]);
      return (result.length < 0)? null : result;
  }
  catch(error)
  {
      console.error('feedModel.getSearchedPostWhileLogin error:', error);
      throw{message: "Server error", status:500};
  }
  
};

  /*
글 불러오기 scope 0 : 전체, 1 : 친구만, 2 : 나만보기 (로그아웃 상태)
*/
exports.getPostWhileLogout = async(page) =>{
  try
  {
    const query = `
    SELECT l.id as id, l.user_id as user_id, l.title as title, l.content_url as content_url, 
    l.scope as scope, l.create_dt as create_dt, r.name as name, IFNULL(c.cnt, 0) AS count_comment
    FROM post as l
    LEFT JOIN (SELECT post_id, count(*) AS cnt FROM comments GROUP BY post_id) AS c
    ON l.id = c.post_id
    JOIN user as r
    ON l.user_id = r.id
    WHERE l.scope = 0
    ORDER BY l.create_dt DESC
    LIMIT ?, 10
      `;
      const result = await executeQuery(query, [ page]);
      return (result.length < 0)? null : result;
  }
  catch(error)
  {
      console.error('feedModel.getPost error:', error);
      throw{message: "Server error", status:500};
  }
  
};

exports.getSearchedPostWhileLogout = async(keyword,page) =>{
  try
  {
    const query = `
    SELECT l.id as id, l.user_id as user_id, l.title as title, l.content_url as content_url, 
    l.scope as scope, l.create_dt as create_dt, r.name as name, IFNULL(c.cnt, 0) AS count_comment
    FROM post as l
    LEFT JOIN (SELECT post_id, count(*) AS cnt FROM comments GROUP BY post_id) AS c
    ON l.id = c.post_id
    JOIN user as r
    ON l.user_id = r.id
    WHERE l.scope = 0 AND l.title LIKE %?% 
    ORDER BY l.create_dt DESC
    LIMIT ?, 10
      `; // 전체 공개는 0이므로 where scope = 0
      const result = await executeQuery(query, [keyword, page]);
      return (result.length < 0)? null : result;
  }
  catch(error)
  {
      console.error('feedModel.getPost error:', error);
      throw{message: "Server error", status:500};
  }
  
};

/**
 * 나의 게시글을 불러오는 함수
 * @param {string} id : 사용자 ID 
 * @param {string} page : 불러올 데이터 페이지
 * @returns json
 */
exports.getMyPosts = async(id,page) =>{
  try
  {
    const query = `
    SELECT l.id as id, l.user_id as user_id, l.title as title, l.content_url as content_url, l.scope as scope, l.create_dt as create_dt, r.name as name, IFNULL(c.cnt, 0) as count_comment
    FROM post as l
    LEFT JOIN (
	    SELECT COUNT(*) AS cnt, post_id 
	    FROM comments 
	    GROUP BY post_id) as c
	  ON l.id = c.post_id
    JOIN user as r
    ON l.user_id = r.id
    WHERE l.user_id = ? AND (l.scope IN (0, 1, 2))
    ORDER BY create_dt desc
    LIMIT ?,10
      `;
      const result = await executeQuery(query, [id, page]);
      return (result.length < 0)? null : result;
  }
  catch(error)
  {
      console.error('feedModel.getMyPosts error:', error);
      throw{message: "Server error", status:500};
  }
  
};

/**
 * 친구 게시글을 불러오는 함수
 * @param {string} id : 사용자 ID 
 * @param {string} page : 불러올 데이터 페이지
 * @returns json
 */
exports.getFriendPosts = async(id,page) =>{
  try
  {
    const query = `
    SELECT l.id as id, l.user_id as user_id, l.title as title, l.content_url as content_url, l.scope as scope, l.create_dt as create_dt, r.name as name, IFNULL(c.cnt, 0) as count_comment
    FROM post as l
    LEFT JOIN (
	    SELECT COUNT(*) AS cnt, post_id 
	    FROM comments 
	    GROUP BY post_id) as c
	  ON l.id = c.post_id
    JOIN user as r
    ON l.user_id = r.id
    WHERE l.user_id = ? AND (l.scope IN (0, 1))
    ORDER BY create_dt desc
    LIMIT ?,10
      `;
      const result = await executeQuery(query, [id, page]);
      return (result.length < 0)? null : result;
  }
  catch(error)
  {
      console.error('feedModel.getFriendPosts error:', error);
      throw{message: "Server error", status:500};
  }
  
};

/**
 * 친구가 아닌 유저의 게시글을 불러오는 함수
 * @param {string} id : 사용자 ID 
 * @param {string} page : 불러올 데이터 페이지
 * @returns json
 */
exports.getNonFriendPosts = async(id,page) =>{
  try
  {
    const query = `
    SELECT l.id as id, l.user_id as user_id, l.title as title, l.content_url as content_url, l.scope as scope, l.create_dt as create_dt, r.name as name, IFNULL(c.cnt, 0) as count_comment
    FROM post as l
    LEFT JOIN (
	    SELECT COUNT(*) AS cnt, post_id 
	    FROM comments 
	    GROUP BY post_id) as c
	  ON l.id = c.post_id
    JOIN user as r
    ON l.user_id = r.id
    WHERE l.user_id = ? AND l.scope = 0
    ORDER BY create_dt desc
    LIMIT ?,10
      `;
      const result = await executeQuery(query, [id, page]);
      return (result.length < 0)? null : result;
  }
  catch(error)
  {
      console.error('feedModel.getNonFriendPosts error:', error);
      throw{message: "Server error", status:500};
  }
  
};


/**
 * 친구가 아닌 유저의 게시글을 불러오는 함수
 * @param {string} id : 사용자 ID 
 * @param {string} page : 불러올 데이터 페이지
 * @returns json
 */
exports.getPostwithTags = async(id) =>{
  try
  {
    const query = `
    SELECT l.id as id, l.user_id as user_id, l.title as title, l.content_url as content_url, l.scope as scope, l.create_dt as create_dt, r.name as name, IFNULL(c.cnt, 0) as count_comment
    FROM post as l
    LEFT JOIN (
	    SELECT COUNT(*) AS cnt, post_id 
	    FROM comments 
	    GROUP BY post_id) as c
	  ON l.id = c.post_id
    JOIN user as r
    ON l.user_id = r.id
    WHERE l.id = ?
      `;
      const result = await executeQuery(query, [id]);
      return (result.length < 0)? null : result;
  }
  catch(error)
  {
      console.error('feedModel.getPostwithTags error:', error);
      throw{message: "Server error", status:500};
  }
  
};



/*
댓글 추가
*/
  exports.insertCommentAndTags = async(post_id, user_id, content, taggedUsers) =>{

    const connection = await pool.getConnection();
    connection.beginTransaction();
    const results = [];
    try{
      await connection.beginTransaction();
      let query = `INSERT INTO comments (post_id, user_id, content) VALUES (?,?,?)`; // 댓글 추가
      let [res] = await connection.execute(query, [post_id, user_id, content]);
      let commentId = res.insertId;
      results.push(res);

      for(let i = 0; i < taggedUsers.length; i++)
      {
        query = `INSERT INTO tags (comment_id, user_id) VALUES (?,?)`;
        [res] = await connection.execute(query, [commentId, taggedUsers[i]]);
        results.push(res);
      }
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
  
/*
댓글 수정
*/
  exports.updateComment = async(content, id) =>{
    try
    {
      const query = `UPDATE comments SET content = ?
      WHERE id = ?`;
      const result = await executeQuery(query, [content, id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
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
  exports.deleteComment = async(id) =>{
    try
    {
      const query = `DELETE FROM comments WHERE id = ?`;
      const result = await executeQuery(query, [id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
    }
    catch(error)
    {
      console.error('feedModel.deleteComment error:', error);
      throw{message: "Server error", status:500};
    }
  };


  /*
  댓글 보기 + 태그된 사람의 수
  */
  exports.getComment = async(post_id, page) =>{
    try
    {
      const query = `
      SELECT l.id as id, l.post_id as post_id, l.user_id as user_id, l.content as content, l.create_dt as create_dt, COUNT(r.comment_id) as tagged_count
      FROM comments as l
      LEFT JOIN tags as r ON l.id = r.comment_id
      WHERE l.post_id = ?
      GROUP BY l.id
      ORDER BY l.create_dt DESC
      LIMIT ?, 10
      `;
        const result = await executeQuery(query, [post_id, page]);
        return (result.length < 0)? null : result;
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
      const result = await executeQuery(query, [comment_id, user_id]);
      if(result.affectedRows === 0)
      {
        throw{message: 'db error', status:404};
      }
      return true;
    }
    catch(error)
    {
      console.error('feedModel.insertTag error:', error);
      throw{message: "Server error", status:500};
    }
  };

/*
태그된 친구 불러오기
*/
  exports.getTag = async(user_id) =>{
    try
    {
      const query = `
      SELECT p.id as p_id, c_id, title, t.content as comments, t.user_id as user_id, name, t.create_dt as create_dt
      FROM post AS p
      JOIN  
        (SELECT l.id as c_id, post_id, l.user_id as user_id, content, name, r.create_dt as create_dt 
          FROM comments as l 
          JOIN 
        (SELECT * FROM tags WHERE user_id = ?) AS r
        ON l.id = r.comment_id
          JOIN user as u
          ON l.user_id = u.id
          ) AS t
      ON p.id = t.post_id
      ORDER BY create_dt DESC
      LIMIT 0,10
      `;
      console.log(`
      SELECT p.id as p_id, c_id, title, t.content as comments, t.user_id as user_id, name, t.create_dt as create_dt
      FROM post AS p
      JOIN  
        (SELECT l.id as c_id, post_id, l.user_id as user_id, content, name, r.create_dt as create_dt 
          FROM comments as l 
          JOIN 
        (SELECT * FROM tags WHERE user_id = ${user_id}) AS r
        ON l.id = r.comment_id
          JOIN user as u
          ON l.user_id = u.id
          ) AS t
      ON p.id = t.post_id
      ORDER BY create_dt DESC
      LIMIT 0,10
      `)
      const result = await executeQuery(query, [user_id]);
      return (result.length < 0)? null : result;
    }
    catch(error)
    {
      console.error('feedModel.getTag error:', error);
      throw{message: "Server error", status:500};
    }
    
  };
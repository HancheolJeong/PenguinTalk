const feed = require('../models/feedModel.js');
const path = require('path');
const fs = require('fs').promises;

/**
 * 비동기식으로 새로운 피드를 데이터베이스에 추가
 */
exports.insertPost = async (req, res) => {
  if (!req.body) { //처리할 데이터가 없을 시..
    return res.status(400).send({ message: "There is no content." });
  }

  let { id, title, content_url, scope } = req.body;

  const contentDir = path.join(__dirname, `../resources/contents/${id}`);

  //비동기에서 디렉터리 없을때 디렉터리 생성
  try {
    await fs.access(contentDir);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(contentDir, { recursive: true });
    } else {
      throw err;
    }
  }

  const filename = `${id}_${Date.now()}.html`; 
  const filePath = path.join(contentDir, filename); // 디렉터리 + 파일명

  try {
    fs.writeFile(filePath, content_url);

    let is_success = await feed.insertPost(id, title, filePath, scope);

    if (is_success) {
      res.json({ result: "success" });
    } else {
      res.json({ result: "fail" });
    }
  } catch (err) {
    console.error('feedController.insertPost error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
};

/**
 * 비동기식으로 새로운 피드를 데이터베이스에 업데이트
 */
exports.updatePost = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let { id, title, content_url, scope } = req.body;
  try {
    let is_success = await feed.updatePost(title, content_url, scope, id);
    if (is_success) {
      res.json({ result: "success" });
    }
    else {
      res.json({ result: "fail" });
    }
  }
  catch (err) {
    console.error('feedController.updatePost error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
}


/**
 * 비동기식으로 피드를 데이터베이스에서 삭제
 */
exports.deletePost = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let { id } = req.body;
  try {
    let is_success = await feed.deletePost(id);
    if (is_success) {
      res.json({ result: "success" });
    }
    else {
      res.json({ result: "fail" });
    }
  }
  catch (err) {
    console.error('feedController.deletePost error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
}



/**
 * 비동기식으로 로그인 상태에서 불러오는 피드를 데이터베이스로 부터 불러오기
 */
exports.getPostWhileLogin = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "There is no content."
    });
  }

  let { id, page } = req.body;
  page = (page - 1) * 10; // LIMIT에 적용하기 위해 페이지를 연산을 미리해둔다.

  try {
    let rows = await feed.getPostWhileLogin(id, page);
    if (rows !== null) {
      const items = await Promise.all(rows.map(async (row) => {
        try {
          const filePath = path.resolve(__dirname, '../resources/contents', row.content_url); 
          console.log('Reading file:', filePath)
          const content = await fs.readFile(row.content_url, 'utf8');
          return {
            ...row,
            content_url: content, 
          };
        } catch (err) {
          console.error('Error reading file:', row.content_url, err);
          return {
            ...row,
            content_url: 'Error reading content',
          };
        }
      }));

      res.json({ result: "success", items });
    } else {
      res.json({ result: "fail" });
    }
  } catch (err) {
    console.error('feedController.getPostWhileLogin error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
};


/**
 * 비동기식으로 로그인 상태에서 키워드 검색을 통해 불러오는 피드를 데이터베이스로부터 불러오기
 */
exports.getSearchedPostWhileLogin = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let { id, page, keyword } = req.body;
  page = (page - 1) * 10
  try {
    let rows = await feed.getSearchedPostWhileLogin(id, page, keyword);
    if (rows !== null) {
      // Process each row to read the file content
      const items = await Promise.all(rows.map(async (row) => {
        try {
          // Read the content of the file specified by content_url
          const filePath = path.resolve(__dirname, '../resources/contents', row.content_url); // Adjust based on actual path
          console.log('Reading file:', filePath)
          const content = await fs.readFile(row.content_url, 'utf8');
          return {
            ...row,
            content_url: content, // Replace the file path with the file content
          };
        } catch (err) {
          console.error('Error reading file:', row.content_url, err);
          return {
            ...row,
            content_url: 'Error reading content', // Handle file read error
          };
        }
      }));

      res.json({ result: "success", items });
    } else {
      res.json({ result: "fail" });
    }
  }
  catch (err) {
    console.error('feedController.getSearchedPostWhileLogin error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
}



/**
 * 비동기식으로 로그아웃 상태에서 피드를 데이터베이스로부터 불러오기
 */
exports.getPostWhileLogout = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "There is no content."
    });
  }

  let page = req.query.page;
  page = (page - 1) * 10

  try {
    let rows = await feed.getPostWhileLogout(page);
    if (rows !== null) {
      // Process each row to read the file content
      const items = await Promise.all(rows.map(async (row) => {
        try {
          // Read the content of the file specified by content_url
          const filePath = path.resolve(__dirname, '../resources/contents', row.content_url); // Adjust based on actual path
          console.log('Reading file:', filePath)
          const content = await fs.readFile(row.content_url, 'utf8');
          return {
            ...row,
            content_url: content, // Replace the file path with the file content
          };
        } catch (err) {
          console.error('Error reading file:', row.content_url, err);
          return {
            ...row,
            content_url: 'Error reading content', // Handle file read error
          };
        }
      }));

      res.json({ result: "success", items });
    } else {
      res.json({ result: "fail" });
    }
  } catch (err) {
    console.error('feedController.getPostWhileLogout error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
};

/**
 * 비동기식으로 로그아웃 상태에서 키워드 검색을 통해 피드를 데이터베이스로부터 불러오기
 */
exports.getSearchedPostWhileLogout = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let page = req.query.page;
  let keyword = req.query.keyword;
  page = (page - 1) * 10
  try {
    let rows = await feed.getPostWhileLogout(keyword, page);
    if (rows !== null) {
      // Process each row to read the file content
      const items = await Promise.all(rows.map(async (row) => {
        try {
          // Read the content of the file specified by content_url
          const filePath = path.resolve(__dirname, '../resources/contents', row.content_url); // Adjust based on actual path
          console.log('Reading file:', filePath)
          const content = await fs.readFile(row.content_url, 'utf8');
          return {
            ...row,
            content_url: content, // Replace the file path with the file content
          };
        } catch (err) {
          console.error('Error reading file:', row.content_url, err);
          return {
            ...row,
            content_url: 'Error reading content', // Handle file read error
          };
        }
      }));

      res.json({ result: "success", items });
    } else {
      res.json({ result: "fail" });
    }
  }
  catch (err) {
    console.error('feedController.getPostWhileLogout error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
}

/**
 * 비동기식으로 자신이 작성한 피드를 데이터베이스로부터 불러오기
 */
exports.getMyPosts = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let { id, page } = req.body;
  page = (page - 1) * 10
  try {
    let rows = await feed.getMyPosts(id, page);
    if (rows !== null) {
      // Process each row to read the file content
      const items = await Promise.all(rows.map(async (row) => {
        try {
          // Read the content of the file specified by content_url
          const filePath = path.resolve(__dirname, '../resources/contents', row.content_url); // Adjust based on actual path
          console.log('Reading file:', filePath)
          const content = await fs.readFile(row.content_url, 'utf8');
          return {
            ...row,
            content_url: content, // Replace the file path with the file content
          };
        } catch (err) {
          console.error('Error reading file:', row.content_url, err);
          return {
            ...row,
            content_url: 'Error reading content', // Handle file read error
          };
        }
      }));

      res.json({ result: "success", items });
    } else {
      res.json({ result: "fail" });
    }
  }
  catch (err) {
    console.error('feedController.getMyPosts error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
}


/**
 * 비동기식으로 친구가 작성한 피드를 데이터베이스로부터 불러오기
 */
exports.getFriendPosts = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let { id, page } = req.body;
  page = (page - 1) * 10
  try {
    let rows = await feed.getFriendPosts(id, page);
    if (rows !== null) {
      // Process each row to read the file content
      const items = await Promise.all(rows.map(async (row) => {
        try {
          // Read the content of the file specified by content_url
          const filePath = path.resolve(__dirname, '../resources/contents', row.content_url); // Adjust based on actual path
          console.log('Reading file:', filePath)
          const content = await fs.readFile(row.content_url, 'utf8');
          return {
            ...row,
            content_url: content, // Replace the file path with the file content
          };
        } catch (err) {
          console.error('Error reading file:', row.content_url, err);
          return {
            ...row,
            content_url: 'Error reading content', // Handle file read error
          };
        }
      }));

      res.json({ result: "success", items });
    } else {
      res.json({ result: "fail" });
    }
  }
  catch (err) {
    console.error('feedController.getFriendPosts error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
}


/**
 * 비동기식으로 친구가 아닌 유저가 작성한 피드를 데이터베이스로부터 불러오기
 */
exports.getNonFriendPosts = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let { id, page } = req.body;
  page = (page - 1) * 10
  try {
    let rows = await feed.getNonFriendPosts(id, page);
    if (rows !== null) {
      // Process each row to read the file content
      const items = await Promise.all(rows.map(async (row) => {
        try {
          // Read the content of the file specified by content_url
          const filePath = path.resolve(__dirname, '../resources/contents', row.content_url); // Adjust based on actual path
          console.log('Reading file:', filePath)
          const content = await fs.readFile(row.content_url, 'utf8');
          return {
            ...row,
            content_url: content, // Replace the file path with the file content
          };
        } catch (err) {
          console.error('Error reading file:', row.content_url, err);
          return {
            ...row,
            content_url: 'Error reading content', // Handle file read error
          };
        }
      }));

      res.json({ result: "success", items });
    } else {
      res.json({ result: "fail" });
    }
  }
  catch (err) {
    console.error('feedController.getNonFriendPosts error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
}

/**
 * 비동기식으로 자신이 태그된 피드를 데이터베이스로부터 불러오기
 */
exports.getPostwithTags = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let { id } = req.body;
  try {
    let rows = await feed.getPostwithTags(id);
    if (rows !== null) {
      // Process each row to read the file content
      const items = await Promise.all(rows.map(async (row) => {
        try {
          // Read the content of the file specified by content_url
          const filePath = path.resolve(__dirname, '../resources/contents', row.content_url); // Adjust based on actual path
          console.log('Reading file:', filePath)
          const content = await fs.readFile(row.content_url, 'utf8');
          return {
            ...row,
            content_url: content, // Replace the file path with the file content
          };
        } catch (err) {
          console.error('Error reading file:', row.content_url, err);
          return {
            ...row,
            content_url: 'Error reading content', // Handle file read error
          };
        }
      }));

      res.json({ result: "success", items });
    } else {
      res.json({ result: "fail" });
    }
  }
  catch (err) {
    console.error('feedController.getNonFriendPosts error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
}


/**
 * 비동기식으로 댓글과 태그를 데이터베이스에 추가하기
 */
exports.insertCommentAndTags = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let { post_id, user_id, content, users } = req.body;

  try {
    let is_success = await feed.insertCommentAndTags(post_id, user_id, content, users);
    if (is_success) {
      res.json({ result: "success" });
    }
    else {
      res.json({ result: "fail" });
    }
  }
  catch (err) {
    console.error('feedController.insertCommentAndTags error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
}


/**
 * 비동기식으로 댓글을 데이터베이스로부터 수정하기
 */
exports.updateComment = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let { id, content } = req.body;
  try {
    let is_success = await feed.updateComment(content, id);
    if (is_success) {
      res.json({ result: "success" });
    }
    else {
      res.json({ result: "fail" });
    }
  }
  catch (err) {
    console.error('feedController.updateComment error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
}


/**
 * 비동기식으로 댓글을 데이터베이스로부터 삭제하기
 */
exports.deleteComment = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let { id } = req.body;
  try {
    let is_success = await feed.deleteComment(id);
    if (is_success) {
      res.json({ result: "success" });
    }
    else {
      res.json({ result: "fail" });
    }
  }
  catch (err) {
    console.error('feedController.deleteComment error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
}


/**
 * 비동기식으로 댓글을 데이터베이스로부터 불러오기
 */
exports.getComment = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let { post_id, page } = req.body;
  page = (page - 1) * 10
  try {
    let rows = await feed.getComment(post_id, page);
    if (rows !== null) {
      res.json({ result: "success", items: rows });
    }
    else {
      res.json({ result: "fail" });
    }
  }
  catch (err) {
    console.error('feedController.getComment error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
}


//받은 태그 모두 불러오기
/**
 * 비동기식으로 자신이 받은 태그를 데이터베이스로부터 불러오기
 */
exports.getTag = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "There is no content."
    });
  }
  let { user_id } = req.body;
  try {
    let rows = await feed.getTag(user_id);
    if (rows !== null) {
      res.json({ result: "success", items: rows });
    }
    else {
      res.json({ result: "fail" });
    }
  }
  catch (err) {
    console.error('feedController.getComment error:', err);
    res.status(err.status || 500).json({
      result: "fail",
      message: err.message || "Server error"
    });
  }
}

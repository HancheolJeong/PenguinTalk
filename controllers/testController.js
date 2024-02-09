const test = require('../models/testModel.js');


//친구 추가
exports.Test = async(req, res) => {
  if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }
    let {post_id, user_id, content} = req.body;
    const users = [];
    console.log(1);
    try
    {
        let is_success = await test.Test(post_id, user_id, content, users);
        if(is_success)
        {
            res.json({result:"success"});
        }
        else
        {
            res.json({result:"fail"});
        }
    }
    catch(err)
    {
        console.error('friendController.Test error:', err);
        res.status(err.status || 500).json({
            result: "fail",
            message: err.message || "Server error"
        });
    }
}
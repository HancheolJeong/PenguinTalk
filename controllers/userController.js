const user = require('../models/userModel.js');

exports.registerUser = async(req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "There is no content."
      });
    }

    let {id, passwd, name, birthday, gender, create_dt, login_dt, picturl_url} = req.request.body;
    let encryptedPassword = await crypto.pbkd(passwd, process.env.APP_KEY, 50, 100, 'sha512');

    let {affectedRows} = await user.registerUser(id, encryptedPassword.toString('base64'), name, birthday, gender, create_dt, login_dt, picturl_url);
  
    

    // Save Tutorial in the database
    Tutorial.create(tutorial, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      else res.send(data);
    });
  };
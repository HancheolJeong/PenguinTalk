const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    return next();
  }
  
  catch(error) {
    if (error.name === 'TokenExpireError') {
      return res.status(419).json({
        code: 419,
        message: 'token has expired.'
      });
    }
   return res.status(401).json({
     code: 401,
     message: 'invalid token.'
   });
  }
}
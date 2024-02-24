const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  try {
    // Authorization 헤더에서 토큰 추출
    const token = req.headers.authorization.split(' ')[1]; // 'Bearer TOKEN' 형태를 가정해서 토큰단위로 나누고 첫번째 요소만 불러온다.
    req.decoded = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') { // 인증 만료 될 때
      return res.status(419).json({
        code: 419,
        message: 'token has expired'
      });
    }
    // 그 밖에 다른 인증 에러
    return res.status(401).json({
      code: 401,
      message: 'invalid token'
    });
  }
};
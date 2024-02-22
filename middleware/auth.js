const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  try {
    // Authorization 헤더에서 토큰 추출
    const token = req.headers.authorization.split(' ')[1]; // 'Bearer TOKEN' 형태를 가정
    console.log(req.headers.authorization);
    req.decoded = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') { // 올바른 에러 이름은 'TokenExpiredError'입니다.
      return res.status(419).json({
        code: 419,
        message: 'token has expired'
      });
    }
    // 기타 인증 관련 에러 처리
    return res.status(401).json({
      code: 401,
      message: 'invalid token'
    });
  }
};
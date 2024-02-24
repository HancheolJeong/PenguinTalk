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


/**
 * jwt 토큰에서 id를 추출하고 get파라미터의 id값이 동일한지 확인해서
 * 파라미터 조작을 사전에 방지한다.
 */
exports.verifyMatchId = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // jwt얻기
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // jwt 디코드

    const { userId } = decoded; //payload의 userId값 추출
    console.log(userId);

    const  user_id  = req.query.user_id; // get파라미터 id값 추출
    console.log(user_id);

    if (userId.toString() !== user_id) { // 동일하지 않으면 인증 오류 리턴.
      return res.status(403).json({
        code: 403,
        message: 'Unauthorized access: ID mismatch' // 토큰 탈취의심
      });
    }

    req.decoded = decoded;
    next();
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: 'Token has expired'
      });
    }
    return res.status(401).json({
      code: 401,
      message: 'Invalid token'
    });
  }
};
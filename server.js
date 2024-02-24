require('dotenv').config();
const http = require("http"); //http 서버 생성
const express = require("express");
const cors = require("cors");
const app = express(); // express 초기화
const morgan = require('morgan'); // 로깅
const router = require('./routes/routes'); 
const server = http.createServer(app);

const setupSocketHandler = require('./libs/socketHandler'); //socket 가져오기

// Socket.io 설정
setupSocketHandler(server);



app.use(cors()); // 모든 경로에 대해 cors 사용
app.use(morgan('common')); //로깅 사용
app.use(express.json()); // json 파싱 
app.use(express.urlencoded({ extended: true })); //url로 인코딩된 본문을 해석
app.use('/', router); 

app.use((req, res, next) => { // 기본경로나 /user말고 다른곳 진입했을경우 실행
  res.status(404).send('Not Found');
});

// set port, listen for requests
const PORT = process.env.PORT || 3000; //환경변수 값으로 포트설정
server.listen(PORT, () => { //서버 시작
  console.log(`Server is running on port ${PORT}.`);
});

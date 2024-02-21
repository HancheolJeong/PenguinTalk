require('dotenv').config();
const http = require("http");
const socketIo = require('socket.io');
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require('morgan');
const router = require('./routes/routes')
const server = http.createServer(app);

const setupSocketHandler = require('./libs/socketHandler');

// Socket.io 설정
setupSocketHandler(server);



app.use(cors());
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.use((req, res, next) => { // 기본경로나 /user말고 다른곳 진입했을경우 실행
  res.status(404).send('Not Found');
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const chatController = require("../controllers/chatController.js");

module.exports = (server) => {
    const io = require("socket.io")(server, {
      cors: {
        origin: "http://localhost:3001", //3001의 요청 리소스에 엑세스
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // 해당 요청 메서드 허용
        allowedHeaders: ["my-custom-header"], //사용자 지정 요청 헤더
        credentials: true // 사용자 자격 증명 포함 여부
      }
    });
  
    const userConnections = {};


  io.on('connection', (socket) => {
    console.log('새로운 클라이언트가 접속했습니다.');
  
    socket.on('chat message', (msg) => {
      console.log('Message received: ', msg);
      // 필요한 경우, 메시지를 다른 클라이언트에게 전송
      // 예: socket.broadcast.emit('chat message', msg);
    });
  
    socket.on('register', (userId) => {
      userConnections[userId] = socket.id;
      console.log(`사용자 ID : ${userId}님의 웹소켓을 등록했습니다. socket : ${socket.id}`);
    });
  
    socket.on('send_to_user', async ({ senderId, recipientId, message }) => {
      const recipientSocketId = userConnections[recipientId];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('receive_message', { senderId, message });
        console.log(`메시지 전달 from ${senderId} to ${recipientId}: ${message}`);
      } 

      const is_success = await chatController.insertChat(senderId, recipientId, message);
      if(!is_success)
      {
        console.log('채팅 저장에 실패했습니다.');
      }

    });
    
    socket.on('disconnect', () => {
      console.log('클라이언트 접속을 끊습니다.');
    });
  });

};
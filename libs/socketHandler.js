const chatController = require("../controllers/chatController.js");

module.exports = (server) => {
    const io = require("socket.io")(server, {
      cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
    });
  
    const userConnections = {};


  io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('chat message', (msg) => {
      console.log('Message received: ', msg);
      // 필요한 경우, 메시지를 다른 클라이언트에게 전송
      // 예: socket.broadcast.emit('chat message', msg);
    });
  
    socket.on('register', (userId) => {
      userConnections[userId] = socket.id;
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });
  
    socket.on('send_to_user', async ({ senderId, recipientId, message }) => {
      const recipientSocketId = userConnections[recipientId];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('receive_message', { senderId, message });
        console.log(`Message from ${senderId} to ${recipientId}: ${message}`);
      } 

      const is_success = await chatController.insertChat(senderId, recipientId, message);
      if(!is_success)
      {
        console.log('채팅 저장에 실패했습니다.');
      }

    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

};
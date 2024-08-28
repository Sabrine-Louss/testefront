const socketIo = require('socket.io');
const cors = require('cors');

const startChatServer = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  // Store connected users
  const connectedUsers = new Map();

  io.on('connection', (socket) => {
    console.log('New client connected');

    // Generate a unique user ID
    const userId = `User-${Date.now()}`;
    connectedUsers.set(socket.id, userId);

    socket.on('sendMessage', (message) => {
      const sender = connectedUsers.get(socket.id);
      console.log(`Message received from ${sender}:`, message);

      // Simple bot response
      setTimeout(() => {
        socket.emit('receiveMessage', {
          text: `Thank you for your message: "${message.text}". How can I assist you further?`,
          sender: 'bot'
        });
      }, 1000);
    });

    socket.on('disconnect', () => {
      const sender = connectedUsers.get(socket.id);
      console.log(`${sender} disconnected`);
      connectedUsers.delete(socket.id);
    });
  });
};

module.exports = startChatServer;
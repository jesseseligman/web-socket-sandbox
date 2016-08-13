const express = require ('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(express.static('public'))

io.sockets.on('connection', (socket) => {
  console.log('a user connected');

  // when the client triggers this 'subscribe' event, the server calls socket.join which adds the client to the specific chatroom
  socket.on('subscribe', function(chatroom) {
    socket.join(chatroom);
  });

  // when the client triggers this 'chat message' event, the server emits the message only to the chatroom passed into io.sockets.in([chatroom name])
  socket.on('chat message', (data) => {
    io.sockets.in(data.chatId).emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

http.listen(8000, () => {
  console.log('listening on port 8000');
});

const express = require ('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(express.static('public'))

io.sockets.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('subscribe', function(data) {
    const { username, userAuth, chatroom } = data;

    if (userAuth) {
      socket.join(chatroom);
      io.sockets.in(chatroom).emit('success', { username, chatroom });
    }
  });

  socket.on('chat message', (data) => {
    io.sockets.in(data.chatroom).emit('post message', data);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

http.listen(8000, () => {
  console.log('listening on port 8000');
});

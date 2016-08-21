(function(){
  'use strict';

  $('#join').submit(function(event) {
    event.preventDefault()

    //this starts up a socket connection
    var socket = io();

    var chatroom = $('#chatroom').val();
    var username = $('#username').val();

    $('#join').addClass('hide');
    $('#send').removeClass('hide');

    //this sends a message to the server to join a specific chat room
    socket.emit('subscribe', {
      userAuth: true,
      chatroom: chatroom,
      username: username
    });

    socket.on('success', function(data) {
      $('#room-dwellers').append(`<h3>${data.username} has joined chatroom: ${data.chatroom}</h3>`);
    });

    //an event handler is added to the #send form element that sends a chat message including the username, message, and chatroom id
    $('#send').submit(function(){
      socket.emit('chat message', {
        chatroom: chatroom,
        message: $('#m').val(),
        username: username
      });
      $('#m').val('');
      return false;
    });

    // when the server emits the 'chat message' event back here, the user and message are appended to the #messages <ul> in the DOM
    socket.on('post message', function(data) {
      $('#messages').append($('<li>').text(data.username + ': ' + data.message));
    });

    return false;
  })
})();

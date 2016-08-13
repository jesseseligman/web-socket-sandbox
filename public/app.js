(function(){
  'use strict';

  $('#join').submit(function(event) {
    console.log('submitss');
    event.preventDefault()

    //this starts up a socket connection
    var socket = io();

    var chatroom = $('#chatroom').val();
    var username = $('#username').val();

    $('#join').addClass('hide');
    $('#send').removeClass('hide');
    $('#room-name').text(username + ' you are in chatroom: ' + chatroom);

    //this sends a message to the server to join a specific chat room
    socket.emit('subscribe', chatroom);

    //an event handler is added to the #send form element that sends a chat message including the username, message, and chatroom id
    $('#send').submit(function(){
      socket.emit('chat message', {
        chatId: chatroom,
        message: $('#m').val(),
        username: username
      });
      $('#m').val('');
      return false;
    });

    // when the server emits the 'chat message' event back here, the user and message are appended to the #messages <ul> in the DOM
    socket.on('chat message', function(data) {
      $('#messages').append($('<li>').text(data.username + ': ' + data.message));
    });

    return false;
  })
})();

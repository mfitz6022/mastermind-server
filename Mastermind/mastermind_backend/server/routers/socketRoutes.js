const { Socket } = require('socket.io');
const { join, send, leave } = require('../controllers/messages.js');
const { ready, unReady, transmit } = require('../controllers/gameplay.js');
let clients = 0;

module.exports = {
  socketRouter: async (socket) => {
    console.log(`user: ${socket.id} has connected to the socket channel`);
    clients++;

    socket.on('join', (roomData) => {
      join(socket, roomData);
    })

    socket.on('send_message', (messageData) => {
      console.log(`message sent ${messageData}`)
      send(socket, messageData);
    })

    socket.on('transmit_input', (inputData) => {
      transmit(socket, inputData);
    })

    socket.on('ready', (gameData) => {
      ready(socket, gameData);
    })

    socket.on('un_ready', (gameData) => {
      unReady(socket, gameData);
    })

    socket.on('leave_room', (userData) => {
      leave(socket, userData);
    })

    socket.on('disconnect',  () => {
      console.log(`user: ${socket.id} has disconnected from the socket  channel`);
      clients--;
    })
  }
}
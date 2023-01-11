const { Socket } = require('socket.io');
const { join, send, leave } = require('../controllers/messages.js');
const { ready, unReady } = require('../controllers/gameplay.js');
let clients = 0;

module.exports = {
  socketRouter: async (socket) => {
    console.log(`user: ${socket.id} has connected to the socket channel`);
    clients++;

    socket.on('join_room', (userData) => {
      join(socket, clients, userData);
    })

    socket.on('send_message', (messageData) => {
      send(socket, messageData);
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
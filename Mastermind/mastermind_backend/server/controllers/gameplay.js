module.exports = {
  ready: (socket, gameData) => {
    socket.broadcast.to(gameData.room).emit('player_ready', gameData.status);
  },

  unReady: (socket, gameData) => {
    socket.broadcast.to(gameData.room).emit('player_un_ready', gameData.status);
  },

  transmit: (socket, inputData) => {
    socket.broadcast.to(inputData.room).emit('receive_input', inputData.input);
  }
}
module.exports = {
  setCode: (socket, codeData) => {
    socket.broadcast.to(codeData.room).emit('receive_code', codeData.code)
    console.log(`code to send: ${codeData.code}`);
  },

  ready: (socket, gameData) => {
    socket.broadcast.to(gameData.room).emit('player_ready', gameData.status);
  },

  unReady: (socket, gameData) => {
    socket.broadcast.to(gameData.room).emit('player_un_ready', gameData.status);
  },

  transmit: (socket, inputData) => {
    socket.broadcast.to(inputData.roomData.room).emit('receive_input', inputData);
  },

  submit: (socket, attemptData) => {
    socket.broadcast.to(attemptData.roomData.room).emit('receive_attempt', attemptData);
  }

}
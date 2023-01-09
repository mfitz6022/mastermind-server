module.exports = {
  join: (socket, userData) => {
    socket.join(userData.rooms)
  },

  send: (socket, messageData) => {
    socket.broadcast.to(messageData.room).emit('receive_message', messageData);
  },

  leave: (socket, userData) => {
    const rooms = userData.rooms;
    rooms.forEach((room) => {
      socket.leave(room);
    })
  }
}
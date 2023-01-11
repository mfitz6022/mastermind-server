module.exports = {
  join: (socket, clients, userData) => {
    let room = Math.round(clients/2);
    let data = {
      username: userData,
      room: room
    }
    socket.join(room)
    socket.emit('joined', data);
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
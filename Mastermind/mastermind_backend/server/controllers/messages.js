module.exports = {
  join: async (socket, roomData) => {
    const { username, room } = roomData;
    await socket.join(room);
    console.log(`user: ${username} has joined room: ${room}`);
    socket.emit('joined', roomData);
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
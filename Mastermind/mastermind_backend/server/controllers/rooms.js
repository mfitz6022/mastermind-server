const db = require('../../db/index.js');
const bcrypt = require('bcrypt');

const publicRooms = ['room1', 'room2', 'room3', 'room4', 'room5', 'room6', 'room7', 'room8', 'room9', 'room10']

module.exports = {
  getPublicRooms: async (req, res) => {
    try {
      res.status(200).send(publicRooms)
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getPrivateRooms: async (req, res) => {
    const string = 'SELECT room_id, owner, room_name FROM private_rooms;'
    try {
      const { rows } = await db.query(string);
      res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  createPrivateRooms: async (req, res) => {
    const {body: {roomOwner, roomName, roomPassword}} = req;
    const string = 'INSERT INTO private_rooms(owner, room_name, room_password) VALUES($1, $2, $3)';
    if (roomOwner.length > 15 || roomName.length > 15) {
      throw new Error('invalid room name or owner name length');
    }
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(roomPassword, salt)
      const params = [roomOwner, roomName, hashedPassword];
      const response = db.query(string, params);
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  joinPrivateRooms: async (req, res) => {
    const {body: {roomName, roomPassword}} = req;
    const string = 'SELECT room_password FROM private_rooms WHERE room_name=$1;';
    const params = [roomName]
    try {
      const { rows } = await db.query(string, params);
      const authentication = await bcrypt.compare(roomPassword, rows[0].room_password);
      console.log(authentication);
      res.status(201).send(authentication);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
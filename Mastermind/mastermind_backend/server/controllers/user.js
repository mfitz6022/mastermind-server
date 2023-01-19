const db = require('../../db/index.js');
const bcrypt = require('bcrypt');

module.exports = {

  createUser: async (req, res) => {
    const {body: {username, password}} = req;
    const string = `INSERT INTO users (username, user_password) VALUES ($1, $2);`;
    try {
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(password, salt)
      const params = [username, hashedPassword];
      const response = await db.query(string, params);
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.status(400).send();
    }
  },

  authenticateUser: async (req, res) => {
    const {body: {username, password}} = req;
    const string = `SELECT user_password FROM users WHERE username=$1;`;
    const params = [username];
    try {
      const { rows } = await db.query(string, params);
      const authentication = await bcrypt.compare(password, rows[0].user_password)
      console.log(authentication);
      res.status(201).send(authentication);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  createUserScores: async (req, res) => {
    const {body: { user, difficulty, time, attempts, score }} = req;
    const string = `INSERT INTO user_scores (username, difficulty, time, attempts, score) VALUES ($1, $2, $3, $4, $5);`;
    const params = [user, difficulty, time, attempts, score];
    try {
      await db.query(string, params);
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  readUserScores: async (req, res) => {
    const string = `SELECT * FROM user_scores WHERE username=$1 ORDER BY score DESC;`;
    const params = [req.query.user];
    console.log(req.query.user)
    try {
      const { rows } = await db.query(string, params);
      console.log(rows);
      res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
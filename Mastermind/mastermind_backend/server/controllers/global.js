const db = require('../../db/index.js');

module.exports = {
  createGlobalScores: async (req, res) => {
    const {body: { username, difficulty, time, attempts, hints, score }} = req;
    const string = `INSERT INTO global_leaderboards (username, difficulty, time_elapsed, attempts, hints_used, score) VALUES ($1, $2, $3, $4, $5, $6);`;
    const params = [username, difficulty, time, attempts, hints, score];
    try {
      await db.query(string, params);
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  readGlobalLeaderboards: async (req, res) => {
    const string = `SELECT * FROM global_leaderboards;`;
    try {
      const { rows } = await db.query(string);
      console.log( rows );
      res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
}
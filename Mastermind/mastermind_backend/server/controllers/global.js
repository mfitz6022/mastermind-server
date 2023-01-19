const db = require('../../db/index.js');

module.exports = {
  readGlobalLeaderboards: async (req, res) => {
    const string = `SELECT * FROM user_scores ORDER BY score DESC;`;
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
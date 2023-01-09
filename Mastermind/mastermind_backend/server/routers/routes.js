const Router = require('express-promise-router');
const { createUser, authenticateUser, createUserScores, readUserScores } = require('../controllers/user.js');
const { createGlobalScores, readGlobalLeaderboards } = require('../controllers/global.js');

const router = new Router();

router.post('/users/sign-up', createUser);

router.post('/global/leaderboards', createGlobalScores);

router.post('/users/leaderboards', createUserScores);

router.post('/users/sign-in', authenticateUser);

router.get('/global/leaderboards', readGlobalLeaderboards);

router.get('/users/leaderboards', readUserScores);

module.exports = router;

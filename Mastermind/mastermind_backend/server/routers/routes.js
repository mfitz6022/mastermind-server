const Router = require('express-promise-router');
const { createUser, authenticateUser, createUserScores, readUserScores } = require('../controllers/user.js');
const { createGlobalScores, readGlobalLeaderboards } = require('../controllers/global.js');
const { getPublicRooms, getPrivateRooms, createPrivateRooms, joinPrivateRooms, publicRooms } = require('../controllers/rooms.js');

const router = new Router();

router.post('/users/sign-up', createUser);

router.post('/users/leaderboards', createUserScores);

router.post('/users/sign-in', authenticateUser);

router.post('/global/rooms/private/create', createPrivateRooms);

router.post('/global/rooms/private/join', joinPrivateRooms);

// change to accomodate leaderboard changes
router.get('/global/leaderboards', readGlobalLeaderboards);

router.get('/users/leaderboards', readUserScores);

router.get('/global/rooms/public', getPublicRooms);

router.get('/global/rooms/private', getPrivateRooms);

module.exports = router;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routers/routes.js');
const { socketRouter } = require('./routers/socketRoutes.js');
const { Server } = require("socket.io");

const app = express();
const server = require('http').createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    credentials: 'true',
  }
})

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/', router);

server.listen(process.env.PORT, () => {
  console.log(`App listening on ${process.env.PORT}`);
});

io.on('connect', socketRouter);

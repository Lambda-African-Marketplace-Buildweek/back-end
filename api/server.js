const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// import registration, login and authentication, etc

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json({ base: 'The server is running' });
})

module.exports = server;
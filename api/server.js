const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('../router/auth/auth-router.js');
const usersRouter = require('../router/users/users-router.js');
const graphsRouter = require('../router/graphs/graphs-router.js')

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/graphs', graphsRouter);

server.get('/', (req, res) => {
	res.sendStatus(200);
});

module.exports = server;

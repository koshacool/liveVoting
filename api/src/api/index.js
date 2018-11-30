const express = require('express');

const { socketIO } = require('../sockets');
const { errorHandler } = require('../middleware/index');

const { User } = require('../models/user');
const { Polls } = require('../models/polls');
const { Questions } = require('../models/questions');

const auth = require('../controllers/auth');
const users = require('../controllers/users');
const polls = require('../controllers/polls');
const questions = require('../controllers/questions');

const models = { User, Polls, Questions };

const routersInit = config => {
  const router = express();

  router.use('/auth', auth(models, { config, socketIO }));
  router.use('/user', users(models, { config, socketIO }));
  router.use('/polls', polls(models, { config, socketIO }));
  router.use('/questions', questions(models, { config, socketIO }));

  router.use(errorHandler);

  return router;
};

module.exports = routersInit;

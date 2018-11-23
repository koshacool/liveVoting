const express = require('express');

const { socketIO } = require('../sockets');
const { errorHandler } = require('../middleware/index');

const { User } = require('../models/user');

const auth = require('../controllers/auth');
const users = require('../controllers/users');

const models = { User };

const routersInit = config => {
  const router = express();

  router.use('/auth', auth(models, { config, socketIO }));
  router.use('/user', users(models, { config, socketIO }));

  router.use(errorHandler);

  return router;
};

module.exports = routersInit;

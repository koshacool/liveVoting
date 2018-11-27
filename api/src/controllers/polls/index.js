const { Router: router } = require('express');
const { authenticate } = require('../../middleware');

const getPolls = require('./getPolls');
const create = require('./create');
const list = require('./list');
const update = require('./update');
const remove = require('./remove');


module.exports = (models, { config, socketIO }) => {
  const api = router();

  // api.get('/', authenticate, list(models, { config }));
  // api.get('/private', authenticate, list(models, { config }));
  // api.get('/public', authenticate, list(models, { config }));
  // api.get('/:_id', authenticate, get(models, { config }));
  // api.delete('/:_id', authenticate, isAllow(), remove(models, { config }));

  api.post('/create', authenticate, create(models, { socketIO }));
  api.get('/list', authenticate, getPolls(models, { config }));
  api.patch('/update/:_id', authenticate,  update(models, { config }));


  return api;
};

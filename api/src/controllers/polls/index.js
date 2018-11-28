const { Router: router } = require('express');
const { authenticate } = require('../../middleware');

const getPolls = require('./getPolls');
const create = require('./create');
const list = require('./list');
const update = require('./update');
const remove = require('./remove');


module.exports = (models, { config, socketIO }) => {
  const api = router();

  api.post('/create', authenticate, create(models, { socketIO }));
  api.get('/list', authenticate, getPolls(models, { socketIO }));
  api.patch('/:_id', authenticate,  update(models, { socketIO }));
  api.delete('/:_id', authenticate, remove(models, { socketIO }));

  return api;
};

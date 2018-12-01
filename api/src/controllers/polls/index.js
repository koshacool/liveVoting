const { Router: router } = require('express');
const { authenticate } = require('../../middleware');

const create = require('./create');
const getList = require('./list');
const get = require('./get');
const update = require('./update');
const remove = require('./remove');


module.exports = (models, { config, socketIO }) => {
  const api = router();

  api.post('/create', authenticate, create(models, { socketIO }));
  api.get('/list', authenticate, getList(models, { socketIO }));
  api.get('/:_id', authenticate, get(models, { socketIO }));
  api.patch('/:_id', authenticate,  update(models, { socketIO }));
  api.delete('/:_id', authenticate, remove(models, { socketIO }));

  return api;
};

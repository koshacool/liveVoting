const { Router: router } = require('express');
const { authenticate } = require('../../middleware');

const create = require('./create');
const update = require('./update');
const updateOnVote = require('./updateOnVote');
const remove = require('./remove');

module.exports = (models, { socketIO }) => {
  const api = router();

  api.post('/create', authenticate, create(models, { socketIO }));
  api.patch('/:_id', authenticate, update(models, { socketIO }));
  api.patch('/vote/:_id', authenticate, updateOnVote(models, { socketIO }));
  api.delete('/:_id', authenticate, remove(models, { socketIO }));

  return api;
};

const { Router: router } = require('express');
const { authenticate } = require('../../middleware');
const get = require('./get');

module.exports = (models) => {
  const api = router();

  api.get('/auth', authenticate, get(models));
  api.get('/:_id', authenticate, get(models));
  return api;
};

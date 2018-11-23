const { Router: router } = require('express');
const { authenticate } = require('../../middleware');

const get = require('./get');
const create = require('./create');
const list = require('./list');
const update = require('./update');
const remove = require('./remove');


module.exports = (models, { config, socketIO }) => {
  const api = router();

  const isAllow = ({ User }) => action => async (req, res, next) => {
    next();
  };

    api.get('/', authenticate, list(models, { config }));
  api.get('/private', authenticate, list(models, { config }));
  api.get('/public', authenticate, list(models, { config }));
  api.get('/:_id', authenticate, get(models, { config }));
  // api.delete('/:_id', authenticate, isAllow(), remove(models, { config }));

  api.post('/create', authenticate, create(models, { config }));
  api.patch('/edit/:_id', authenticate,  isAllow(models), update(models, { config }));


  return api;
};

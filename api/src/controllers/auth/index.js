const { Router: router } = require('express');
const { authenticate, generateAccessToken } = require('../../middleware');
const passport = require('passport');
const signIn = require('./sign-in');
const signOut = require('./sign-out');
const get = require('./get');

/**
 * Provide Api for Auth

 POST /api/v1/auth/sign-in - Sign In
 @params
       token (string)
 POST /api/v1/auth/sign-out - Sign Out
 @header
        Authorization: Bearer {token}
 GET /api/v1/user - Get user profile
 @header
        Authorization: Bearer {token}
 **/
module.exports = (models, { config, socketIO }) => {
  const api = router();

  api.post('/sign-in',
    passport.authenticate('google-token', { session: false }),
    generateAccessToken,
    signIn(models));

  api.post('/sign-out', authenticate, signOut(models, { config, socketIO }));
  api.get('/user', authenticate, get(models, { config, socketIO }));


  return api;
};

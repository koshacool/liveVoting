const { Router: router } = require('express');
const { authenticate, generateAccessToken } = require('../../middleware');
const passport = require('passport');
const signIn = require('./sign-in');
const my = require('./my');
const update = require('./update');
const signUp = require('./sign-up');
const signOut = require('./sign-out');
const changePassword = require('./change-password');
const restorePassword = require('./restore-password');

/**
 * Provide Api for Auth

 POST /api/v1/auth/sign-in - Sign In
 @params
       email {string}
       password {string}

 POST /api/v1/auth/sign-up - Sign Un
 @params
       email {string}
       password {string}
       profile: {Object},
       avatar: {File}
 Get /api/v1/auth/my - Get users info by token
 @header
        Authorization: Bearer {token}
 POST /api/v1/auth/sign-out - Sign Out
 @header
        Authorization: Bearer {token}

 POST /api/v1/auth/change-password - Change Password
 @header
       Authorization: Bearer {token}
 @params
       newPassword {string}
       password {string}
 POST /api/v1/auth/restore-password - Restore Password
 @params
       newPassword {string}
       password {string}
 PATCH /api/v1/users/:_id - Update User details
 @header
        Authorization: Bearer {token}
 @params
       email {string}
       avatar {Image}
       documentApproval {
                personalId: Boolean
                scanId: Boolean
             }
       profile: {Object}
 **/

module.exports = (models, { config, socketIO }) => {
  const api = router();


  api.post('/sign-in',
    passport.authenticate('google-token', { session: false }),
    generateAccessToken,
    signIn(models));

  api.post('/sign-out', authenticate, signOut(models, { socketIO }));


  return api;
};

const passport = require('passport');

const { Strategy: GoogleTokenStrategy } = require('passport-google-token');
const { User } = require('../models/user');
const { googleAuth } = require('./googleAuth');
const { config } = require('../../config');

passport.use(new GoogleTokenStrategy({
  clientID: config.google.clientSecret,
  clientSecret: config.google.clientSecret,
}, googleAuth(User)));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = { passport };

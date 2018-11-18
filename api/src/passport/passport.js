const passport = require('passport');

const { Strategy: GoogleTokenStrategy } = require('passport-google-token');
const { User } = require('../models/user');
const { googleAuth } = require('./googleAuth');
const { config } = require('../../config');

passport.use(new GoogleTokenStrategy({
  clientID: config.google.clientSecret,
  clientSecret: config.google.clientSecret,
}, googleAuth(User)));

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

module.exports = { passport };

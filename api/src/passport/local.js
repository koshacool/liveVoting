const { Unauthorized } = require('rest-api-errors');

const localAuth = User => (username, password, done) =>
  User.findOne({ email: username })
    .then(user => {
      if (!user) {
        return done(new Unauthorized(401, 'Incorrect auth.'), false);
      }
      return user.authenticate(password, (err, userData) => {
        if (!userData) {
          return done(new Unauthorized(401, 'Incorrect auth.'), false);
        }
        return done(null, user);
      });
    })
    .catch(done);

module.exports = { localAuth };
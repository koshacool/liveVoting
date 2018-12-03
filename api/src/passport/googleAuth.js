const googleAuth = User => (accessToken, refreshToken, profile, done) =>
  User.findOne({
    'googleProvider.id': profile.id
  })
  .then(user => {
    // No user was found, lets create a new one
    if (!user) {
      const newUser = new User({
        fullName: profile.displayName,
        email: profile.emails[0].value,
        googleProvider: {
          id: profile.id,
          token: accessToken
        }
      });

      return newUser.save()
        .then(savedUser => {
          return done(null, savedUser);
        })
        .catch(done);
    } else {
      return done(null, user);
    }
  })
  .catch(done);

module.exports = { googleAuth };

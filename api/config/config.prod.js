module.exports = {
  tokenTime: 2592000, // 60*60*24*30 -> 30 days
  maxLimitPerQuery: 1000, // -> max count of items GET api/v1/modes
  google: {
    clientSecret: 'qGCf_wXCwGopgEuGYzpepYZX',
    clientId: '332142411235-flt62pef5l0v06bn4ebnuodp7lnjicn6.apps.googleusercontent.com',
    callbackURL: 'http://localhost:4000/auth/google/callback',
  },
};
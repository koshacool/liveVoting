const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { config } = require('../../config');


const { SECRET_TOKEN } = process.env;

const authenticate = expressJwt({ secret: SECRET_TOKEN });


const generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id,
  }, SECRET_TOKEN, {
    expiresIn: config.tokenTime
  });
  next();
};


module.exports =  {
  authenticate,
  generateAccessToken,
};

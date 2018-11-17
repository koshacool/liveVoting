const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { config } = require('../../config');

const authenticate = expressJwt({ secret: process.env.SECRET_TOKEN });

const generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id,
  }, process.env.SECRET_TOKEN, {
    expiresIn: config.tokenTime
  });
  next();
};


module.exports =  {
  authenticate,
  generateAccessToken,
};

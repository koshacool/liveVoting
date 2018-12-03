const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
const { config } = require('./config');
const api = require('./src/api/index');
const { passport } = require('./src/passport');
const { mongoManager } = require('./src/mongo');
const { nocache } = require('./src/middleware');

const app = express();
mongoManager.connect();

// Allow CORS
app.use(cors());


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// middleware
app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

// Authorization
app.use(passport.initialize());

// api routes v1
app.use('/api/v1', api(config));
//if (process.env.NODE_ENV === 'production') {
  app.get('*', nocache, (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'));
  });
//}

module.exports = app;

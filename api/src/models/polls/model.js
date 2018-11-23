const _ = require('lodash');
const mongoose = require('mongoose');
const { schema } = require('./schema');


const Polls = mongoose.model('Polls', schema);
module.exports = { Polls };

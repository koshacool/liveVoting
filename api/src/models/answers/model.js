const mongoose = require('mongoose');
const { schema } = require('./schema');


const Answers = mongoose.model('Answers', schema);
module.exports = { Answers };

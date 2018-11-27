const mongoose = require('mongoose');
const { schema } = require('./schema');


const Questions = mongoose.model('Questions', schema);
module.exports = { Questions };


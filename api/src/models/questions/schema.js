const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  title: { type: String, default: '' },
  showResult: { type: Boolean, default: false },
  pollId: { type: String },
});

module.exports = { schema };

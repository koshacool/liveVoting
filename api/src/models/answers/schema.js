const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  questionId: { type: String },
  title: { type: String, default: '' },
  votedBy: { type: Array, default: [] },
});

module.exports = { schema };

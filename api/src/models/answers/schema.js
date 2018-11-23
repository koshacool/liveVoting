const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
  _id: { type: String },
  createdAt: { type: Date },
  createdBy: { type: String },
  questionId: { type: String },

  title: { type: String },
  votedBy: { type: String },
});


module.exports = { schema };

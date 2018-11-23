const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
  _id: { type: String },
  createdAt: { type: Date },
  createdBy: { type: String },
  pollId: { type: String },

  title: { type: String },
  isEnabled: { type: Boolean },
  isOpen: { type: Boolean },
  showResults: { type: Boolean },
});

module.exports = { schema };

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String },
  title: { type: String },
  isPublic: { type: Boolean, default: false },
});

module.exports = { schema };

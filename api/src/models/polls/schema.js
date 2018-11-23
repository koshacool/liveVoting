const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
  _id: { type: String },
  createdAt: { type: Date },
  createdBy: { type: String },

  title: { type: String },
  isPublic: { type: Boolean },
});

module.exports = { schema };

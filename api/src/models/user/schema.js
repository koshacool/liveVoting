const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
  email: {
    type: String,
    required: [true],
  },
  createAt: {
    type: Date,
    required: [true],
    index: true,
    default: new Date(),
  },
  fullName: String,
  googleProvider: Object
});

module.exports = { schema };
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
  email: {
    type: String,
    required: [true],
    validate: {
      validator: email => EMAIL.test(email),
      message: 'Field [email] wrong format.',
    },
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
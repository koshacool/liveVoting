const _ = require('lodash');
const mongoose = require('mongoose');
const { fieldToSearch } = require('../../utils/mongo');
const { schema } = require('./schema');

// schema.plugin(passportLocalMongoose, {
//   usernameField: 'email',
// });

// schema.methods.fieldsToSearch = search => [
//   'profile.display_name'
// ].map(fieldToSearch(search));


// schema.pre('save', function(next) {
//   const { profile } = this;
//   if (profile.firstName) {
//     this.profile.display_name = `${_.get(profile, 'firstName') || ''} ${_.get(profile, 'lastName') || ''} ${_.get(profile, 'patronymic') || ''}`
//   }
//   next();
// });

schema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    delete ret.hash;
    delete ret.salt;
  },
});

const User = mongoose.model('User', schema);
module.exports = { User };
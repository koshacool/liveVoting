const _ = require('lodash');
const moment = require('moment');
const jsonfile = require('jsonfile');
const path = require('path');
const fs = require('fs');
const { User } = require('../../models/user');
const { Image } = require('../../models/image');

const DIR_PATH = path.resolve(__dirname, '../../../private/assets');
const IMAGE_PATH = './images/users';

const addUser = async (user, imageName) => new Promise((resolve, reject) => {
  fs.readFile(path.resolve(DIR_PATH, IMAGE_PATH, `./${imageName}`), async (err, data) => {
    if (err) throw err;
    const image = new Image({
      data,
      mimetype: 'image/jpeg',
      name: imageName,
      encoding: String,
    });

    const savedImage = await image.save();
    user.profile.imageId = savedImage._id;
    user.profile.gender = _.random(0, 1) ? 'female' : 'male';
    user.profile.birthDate = moment().year(moment().year() - _.random(6, 24)).toDate();
    user.createAt = moment().month(_.random(0, moment().month())).toDate();

    User.register(user, user.password, (err) => {
      if (err) reject(err);
      resolve(user)
    });
  });
});

const addUsersFromJSON = (witResetAdmin = false) => new Promise(async (resolve, reject) => {
  const doc = await User.findOne({});
  const FILE_PATH = path.resolve(DIR_PATH, './users.json');
  if (!doc) {
    jsonfile.readFile(FILE_PATH, async (err, users) => {
      if (err) throw reject(err);
      let saved = 0;
      for(let index=0; index < users.length; index++) {
        const user = users[index];
        const savedUser = await addUser(user, `${index}.jpeg`);
        // eslint-disable-next-line
        console.log(`User [${savedUser.email}] successfully created...`);
        saved++;
        if (saved === users.length) {
          resolve();
        }
      }
    });
  } else {
    jsonfile.readFile(FILE_PATH, async (err, users) => {
      if (err) throw reject(err);
      try {
        const ADMINEMAIL = 'admin@rcyn.com';
        const admin = await User.findOne({ email: ADMINEMAIL });
        await User.remove({ email: ADMINEMAIL });
        const user = users.find(u => u.email === ADMINEMAIL);
        _.extend(user, { _id: admin && admin._id });
        const saved = await addUser(user, '0.jpeg');
        // eslint-disable-next-line
        console.log(`User [${saved.email}] successfully changed...`);
        return resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
});

module.exports = { addUsersFromJSON };
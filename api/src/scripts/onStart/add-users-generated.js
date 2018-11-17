const _ = require('lodash');
const moment = require('moment');
const jsonfile = require('jsonfile');
const path = require('path');
const fs = require('fs');
const { User } = require('../../models/user');
const { Image } = require('../../models/image');

const DIR_PATH = path.resolve(__dirname, '../../../private/assets');
const IMAGE_PATH = './images/users';

const addGeneratedUsersFromJSON = () => new Promise(async (resolve, reject) => {
  const count = await User.find({}).count();
  const FILE_PATH = path.resolve(DIR_PATH, './users_generated.json');
  if (count <= 4) {
    jsonfile.readFile(FILE_PATH, async (err, users) => {
      if (err) throw reject(err);
      let saved = 0;
      for(let index=0; index < users.length; index++) {
        const user = users[index];
        const imageName = `${0}.jpeg`;
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
          user.createAt = moment().month(_.random(0, moment().month())).toDate();
          user.profile.birthDate = moment().year(moment().year() - _.random(6, 24)).toDate();

          User.register(user, user.password, (err) => {
            if (err) reject(err);
            saved++;
            if (saved === users.length) {
              resolve();
              // eslint-disable-next-line
              console.log(`[${saved}] User successfully created...`);
            }
          });
        });
      }
    });
  } else {
    resolve();
  }
});

module.exports = { addGeneratedUsersFromJSON };
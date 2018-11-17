const _ = require('lodash');
const jsonfile = require('jsonfile');
const path = require('path');
const fs = require('fs');
const { User } = require('../../models/user');
const { Activity } = require('../../models/activity');
const { Image } = require('../../models/image');

const DIR_PATH = path.resolve(__dirname, '../../../private/assets');
const IMAGE_PATH = './images/activities';

/**
 * Provide add activities from assets
 *  - will add activities form ../private/assets.activities.json
 *  - will append files for activities ../private/images folder
 *
 **/

const addActivitiesFromJSON = () => new Promise(async (resolve, reject) => {
  try {
    const doc = await Activity.findOne({});
    const user = await User.findOne({ roles: 'super-admin' });
    if (!user) {
      throw new Error('[super-admin] not found :(');
    }
    const FILE_PATH = path.resolve(DIR_PATH, './activities.json');
    if (!doc) {
      jsonfile.readFile(FILE_PATH, async (err, activities) => {
        if (err) throw err;
        for (let index = 0; index < activities.length; index++) {
          const imageName = `${index % 10}.jpeg`;
          fs.readFile(path.resolve(DIR_PATH, IMAGE_PATH, `./${imageName}`), async (err, data) => {
            if (err) throw err;
            const image = new Image({
              data,
              mimetype: 'image/jpeg',
              name: imageName,
              encoding: String,
            });
            const savedImage = await image.save();
            const activity = new Activity(
              _.extend(activities[index], {
                imageId: savedImage._id,
              }));
            activity.createBy = user._id;
            activity.createAt = new Date();
            await activity.save();
            if (index + 1 === activities.length) {
              // eslint-disable-next-line
              console.log(`[${activities.length}] Activities successfully created...`);
              resolve();
            }
          });
        }
      });
    } else {
      resolve();
    }
  } catch (error) {
    reject(error);
  }
});

module.exports = { addActivitiesFromJSON };
const _ = require('lodash');
const jsonfile = require('jsonfile');
const path = require('path');
const { User } = require('../../models/user');
const { Activity } = require('../../models/activity');
const { Group } = require('../../models/group');


const DIR_PATH = path.resolve(__dirname, '../../../private/assets');

/**
 * Provide add activities from assets
 *  - will add activities form ../private/assets.activities.json
 *  - will append files for activities ../private/images folder
 *
 **/

const addGroupsFromJSON = () => new Promise(async (resolve, reject) => {
  try {
    const doc = await Group.findOne({});
    const admin = await User.findOne({ roles: 'super-admin' });
    const users = await User.find({ roles: 'user' });
    const volunteer = await User.findOne({ roles: 'volunteer' });
    if (!admin) {
      throw new Error('[super-admin] not found :(');
    }

    const activities = await Activity.find({ });
    const FILE_PATH = path.resolve(DIR_PATH, './groups.json');
    if (!doc) {
      let added = 0;
      jsonfile.readFile(FILE_PATH, async (err, groups) => {
        if (err) throw err;
        for (let index = 0; index < activities.length; index++) {
          const groupeIndex = ((index + 1) * 2) - 2;

          const groupe1 = groups[groupeIndex];
          const groupe2 = groups[groupeIndex + 1];
          const activity = activities[index];

          _.extend(groupe1, {
            title: groupe1.title.replace('%activity_name%', activity.title),
            activityId: activity._id,
            memberIds: _.range(0, 10).map(() => users[_.random(0, users.length -1)]._id),
            coachIds: [volunteer._id],
            createAt: new Date(),
            createBy: admin._id,
          });

          _.extend(groupe2, {
            title: groupe2.title.replace('%activity_name%', activity.title),
            activityId: activity._id,
            memberIds: [users[_.random(0, users.length -1)]._id],
            coachIds: [volunteer._id],
            createAt: new Date(),
            createBy: admin._id,
          });
          await new Group(groupe1).save();
          await new Group(groupe2).save();
          added = added + 2;
        }
        // eslint-disable-next-line
        console.log(`[${groups.length}] Groups successfully created...`);
        if (added === groups.length) {
          resolve();
        }
      });
    } else {
      resolve();
    }
  } catch (error) {
    reject(error);
  }
});

module.exports = { addGroupsFromJSON };
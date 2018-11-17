const _ = require('lodash');
const jsonfile = require('jsonfile');
const path = require('path');
const { User } = require('../../models/user');
const { Activity } = require('../../models/activity');
const { Note } = require('../../models/note');


const DIR_PATH = path.resolve(__dirname, '../../../private/assets');

/**
 * Provide add notes from assets
 *  - will add notes form ../private/assets.notes.json
 *
 **/

const addNotesFromJSON = () => new Promise(async (resolve, reject) => {
  try {
    const doc = await Note.findOne({});
    const users = await User.find({ roles: { $in: ['volunteer', 'admin'] } }, { _id: 1 });

    const activities = await Activity.find({ });
    const FILE_PATH = path.resolve(DIR_PATH, './notes.json');
    if (!doc) {
      let added = 0;
      jsonfile.readFile(FILE_PATH, async (err, notes) => {
        if (err) throw err;
        for (let index = 0; index < activities.length; index++) {
          const noteIndex = ((index + 1) * 2) - 2;

          const note1 = notes[noteIndex];
          const note2 = notes[noteIndex + 1];
          const activity = activities[index];

          _.extend(note1, {
            title: note1.title.replace('%activity_name%', activity.title),
            activityId: activity._id,
            createBy: users[_.random(0, users.length - 1)]._id,
          });

          _.extend(note2, {
            title: note2.title.replace('%activity_name%', activity.title),
            activityId: activity._id,
            createBy: users[_.random(0, users.length - 1)]._id,
          });
          await new Note(note1).save();
          await new Note(note2).save();
          added = added + 2;
        }
        // eslint-disable-next-line
        console.log(`[${added}] Notes successfully created...`);
        if (added === notes.length) {
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

module.exports = { addNotesFromJSON };
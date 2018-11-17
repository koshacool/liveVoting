const _ = require('lodash');
const jsonfile = require('jsonfile');
const path = require('path');
const { User } = require('../../models/user');
const { Message } = require('../../models/message');


const DIR_PATH = path.resolve(__dirname, '../../../private/assets');

/**
 * Provide add notes from assets
 *  - will add notes form ../private/assets.notes.json
 *
 **/

const addMessagesFromJSON = () => new Promise(async (resolve, reject) => {
  try {
    const doc = await Message.findOne({});
    const senders = await User.find({ roles: { $in: ['volunteer', 'admin'] } }, { _id: 1 });
    const users = await User.find({ roles: 'user' }, { _id: 1 });

    const FILE_PATH = path.resolve(DIR_PATH, './messages.json');
    if (!doc) {
      const userIds = users.map(u => u._id);
      let added = 0;
      jsonfile.readFile(FILE_PATH, async (err, messages) => {
        if (err) throw err;
        for (let index = 0; index < messages.length; index++) {

          const message = messages[index];

          _.extend(message, {
            createBy: senders[_.random(0, senders.length - 1)]._id,
            createAt: new Date(),
            userIds,
          });

          await new Message(message).save();
          added = added + 1;
        }
        // eslint-disable-next-line
        console.log(`[${added}] Messages successfully created...`);
        if (added === messages.length) {
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

module.exports = { addMessagesFromJSON };
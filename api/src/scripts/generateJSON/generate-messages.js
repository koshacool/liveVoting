const _ = require('lodash');
const moment = require('moment');
const randomstring = require('randomstring');
const jsonfile = require('jsonfile');
const path = require('path');

const DIR_PATH = path.resolve(__dirname, '../../../private/assets');

const generateMessages = count => {
  const group = [];
  const FILE_PATH = path.resolve(DIR_PATH, './messages.json');
  for(let index=0; index < count; index++) {
    const activity = {
      title: `Message ${index}`,
      description: _.range(10).map(() => randomstring.generate(125)).join(' '),
      createAt: moment().month(_.random(0, 11)).day(_.random(0, 29)).hour(_.random(0, 23)).minute(_.random(0, 95)).toDate(),
    };
    group.push(activity);
  }
  jsonfile.writeFile(FILE_PATH, group, function (err) {
    /* eslint-disable */
    if (err) console.error(err)
    console.log(`[${count}] messages successfully added for:`);
    console.log('--->' , FILE_PATH)
    /* eslint-disable */
  });
};


generateMessages(100);
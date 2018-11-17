const _ = require('lodash');
const moment = require('moment');
const randomstring = require('randomstring');
const jsonfile = require('jsonfile');
const path = require('path');

const DIR_PATH = path.resolve(__dirname, '../../../private/assets');

const generateGroups = count => {
  const group = [];
  const FILE_PATH = path.resolve(DIR_PATH, './notes.json');
  for(let index=0; index < count; index++) {
    const activity = {
      title: `Note of %activity_name%`,
      description: _.range(10).map(() => randomstring.generate(125)).join(' '),
      createAt: moment().month(_.random(0, 11)).day(_.random(0, 29)).hour(_.random(0, 23)).minute(_.random(0, 95)).toDate()
    };
    group.push(activity);
  }
  jsonfile.writeFile(FILE_PATH, group, function (err) {
    /* eslint-disable */
    if (err) console.error(err)
    console.log(`[${count}] notes successfully added for:`);
    console.log('--->' , FILE_PATH)
    /* eslint-disable */
  });
};


generateGroups(200);
const moment = require('moment');
const mongoose = require('mongoose');
const randomstring = require('randomstring');
const jsonfile = require('jsonfile');
const path = require('path');

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

const DIR_PATH = path.resolve(__dirname, '../../../private/assets');

const generateGroups = count => {
  const group = [];
  const FILE_PATH = path.resolve(DIR_PATH, './groups.json');
  for(let index=0; index < count; index++) {
    const startAt = [Math.round(getRandomArbitrary(10, 18)), Math.round(getRandomArbitrary(1, 9))];
    const activity = {
      title: `Group of %activity_name%`,
      description: randomstring.generate(125),
      schedule: [{
        _id: mongoose.Types.ObjectId(),
        startAt: moment().hour(startAt[0]).minute(0).toDate(),
        endAt: moment().hour(startAt[0] + 1).minute(0).toDate() ,
        day: Math.round(getRandomArbitrary(1, 6)),
        recurring: false,
      }, {
        _id: mongoose.Types.ObjectId(),
        startAt: moment().hour(startAt[1]).minute(0).toDate(),
        endAt: moment().hour(startAt[1] +1).minute(0).toDate() ,
        day: Math.round(getRandomArbitrary(1, 6)),
        recurring: false,
      }]
    };
    group.push(activity);
  }
  jsonfile.writeFile(FILE_PATH, group, function (err) {
    /* eslint-disable */
    if (err) console.error(err)
    console.log(`[${count}] group successfully added for:`);
    console.log('--->' , FILE_PATH)
    /* eslint-disable */
  });
};


generateGroups(200);
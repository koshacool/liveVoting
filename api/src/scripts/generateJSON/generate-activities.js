const random_name = require('node-random-name');
const randomstring = require('randomstring');
const jsonfile = require('jsonfile');
const path = require('path');

const DIR_PATH = path.resolve(__dirname, '../../../private/assets');

const generateActivities = count => {
  const activities = [];
  const FILE_PATH = path.resolve(DIR_PATH, './activities.json');
  for(let index=0; index < count; index++) {
    const activity = {
      title: `Activity of ${random_name({ first: true, gender: "male" })} ${index + 1}`,
      description: randomstring.generate(125),
      contact: random_name({ gender: "women" })
    };
    activities.push(activity);
  }
  jsonfile.writeFile(FILE_PATH, activities, function (err) {
    /* eslint-disable */
    if (err) console.error(err)
    console.log(`[${count}] activities successfully added for:`);
    console.log('--->' , FILE_PATH)
    /* eslint-disable */
  });
};


generateActivities(100);
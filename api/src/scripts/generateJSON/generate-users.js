const random_name = require('node-random-name');
const path = require('path');
const jsonfile = require('jsonfile');

const DIR_PATH = path.resolve(__dirname, '../../../private/assets');

const generateGroups = count => {
  const users = [];
  const FILE_PATH = path.resolve(DIR_PATH, './users_generated.json');
  const roles = ['volunteer', 'user']
  for (let index = 0; index < count; index++) {
    const role = index > (count / 2) ? roles[0] : roles[1];
    const user = {
      email: `${role}${index}@rcyn.com`,
      password: "password12345",
      profile: {
        firstName: random_name({ first: true }),
        lastName: random_name({ last: true }),
        patronymic: `generated [${index}]`,
      },
      approved: false,
      createAt: new Date(),
      roles: [role]
    };
    const profile = user.profile;
    user.profile.display_name = `${profile.firstName} ${profile.lastName} ${profile.patronymic}`;
      users.push(user);
  }
  jsonfile.writeFile(FILE_PATH, users, function (err) {
    /* eslint-disable */
    if (err) console.error(err)
    console.log(`[${count}] users successfully added for:`);
    console.log('--->', FILE_PATH)
    /* eslint-disable */
  });
};


generateGroups(100);
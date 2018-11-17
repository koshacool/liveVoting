const _ = require('lodash');
const moment = require('moment');
const { Statistic } = require('../../models/statistics');
const { VOLUNTEER, USER } = require('../../middleware/permission-checker/roles');

const addUsersStatistics = () => new Promise(async (resolve, reject) => {
  try {
    const doc = await Statistic.findOne({});
    if (!doc) {
      const days = moment().diff(moment().dayOfYear(1), 'days');
      const MAX = 2;
      const previous = [];
      for (let index = 0; index < days; index++) {
        const prevPayload = previous[index - 1] && previous[index - 1].payload || {};
        const payload = {
          [`${USER}-female`]: (prevPayload[`${USER}-female`] || 0) + _.random(MAX),
          [`${USER}-male`]: (prevPayload[`${USER}-male`] || 0) + _.random(MAX),
          [`${VOLUNTEER}-female`]: (prevPayload[`${VOLUNTEER}-female`] || 0) + _.random(MAX),
          [`${VOLUNTEER}-male`]: (prevPayload[`${VOLUNTEER}-male`] || 0) + _.random(MAX),
        };
        payload[USER] = payload[`${USER}-female`] + payload[`${USER}-male`];
        payload[VOLUNTEER] = payload[`${VOLUNTEER}-female`] + payload[`${VOLUNTEER}-male`];
        payload[`${USER}-${VOLUNTEER}`] = payload[VOLUNTEER] + payload[USER];

        const statistic = new Statistic({
          type: 'user',
          timestamp: moment().dayOfYear(index + 1).toDate(),
          payload,
        });
        previous.push(statistic);

        await statistic.save();
      }
      // eslint-disable-next-line
      console.log(`Statistics [${days}] points successfully generated...`);
    } else {
      resolve();
    }
  } catch (error) {
    reject();
  }
});

module.exports = { addUsersStatistics };
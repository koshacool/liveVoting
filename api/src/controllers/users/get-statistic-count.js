const moment = require('moment');
const { sendOne } = require('../../middleware/index');
const { VOLUNTEER, USER } = require('../../middleware/permission-checker/roles');

const getStatisticCount = ({ User }) => async (req, res, next) => {
  try {
    const moment18YearAgo = moment().year(moment().year() - 18);
    const moment13YearAgo = moment().year(moment().year() - 13);

    Promise.all([
      User.find({
        'roles': { $in: [VOLUNTEER, USER] },
        'profile.birthDate': { $gte: moment13YearAgo.toDate() },
        'profile.birthDate': { $lte: moment18YearAgo.toDate() }
      }).count(),
      User.find({
        'roles': { $in: [VOLUNTEER, USER] },
        'profile.birthDate': { $gt: moment18YearAgo.toDate() },
      }).count(),
    ])
      .then(result => sendOne(res, { gte13: result[0], gte18: result[1] }))
      .catch(next);
  } catch (error) {
    next(error);
  }
};

module.exports = { getStatisticCount };

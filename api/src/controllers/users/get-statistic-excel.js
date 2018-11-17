const _ = require('lodash');
const moment = require('moment');
const { getUserStatistic } = require('./get-statistic');
const json2xls = require('json2xls');
const { queryToObject } = require('../../utils/requests');

const getStatisticExcel = ({ User, Group, Activity }) => async (req, res, next) => {
  try {
    const statictics = await getUserStatistic({ User, Group })(req, res, next);
    let { filter } = queryToObject(req.query);
    let { from, to, activityId, groupId } = filter || {};

    const activity = await Activity.findOne({ _id: activityId }, { title: 1 });
    const group = await Group.findOne({ _id: groupId }, { title: 1 });

    const xls = json2xls(statictics.map((statictic, i) => {
      const filter = {
        [res.__('from')]: i == 0 && from && moment(from).toDate(),
        [res.__('to')]: i == 0 && to && moment(to).toDate(),
        [res.__('activity')]: i == 0 && _.get(activity, 'title'),
        [res.__('team')]: i == 0 && _.get(group, 'title'),
      };
      const result = {};
      _.keys(statictic).map(key => _.extend(result, {
        [res.__(key)]: statictic[key],
      }));
      return _.extend(filter, result);
    }));

    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    res.end(xls, 'binary');

  } catch (error) {
    next(error);
  }
};

module.exports = getStatisticExcel;

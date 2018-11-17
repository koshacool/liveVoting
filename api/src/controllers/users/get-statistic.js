const _ = require('lodash');
const { sendList } = require('../../middleware/index');
const { queryToObject } = require('../../utils/requests');
const { VOLUNTEER, USER, ADMIN, SUPER_ADMIN } = require('../../middleware/permission-checker/roles');

const getUserStatistic =  ({ User, Group }) => async (req, res, next) => {
  try {
    let { filter } = queryToObject(req.query);
    let { from, to, activityId, groupId } = filter || {};

    const usersQuery = {};
    if (to) {
      usersQuery.createAt = usersQuery.createAt || {};
      _.extend(usersQuery.createAt, { $lte: new Date(to) });
    }
    if (from) {
      usersQuery.createAt = usersQuery.createAt || {};
      _.extend(usersQuery.createAt, { $gte: new Date(from) });
    }

    const groupsQuery = {};
    if (activityId && !groupId) {
      _.extend(groupsQuery, { activityId })
    }

    if (groupId) {
      _.extend(groupsQuery, { _id: groupId });
    }

    if(!_.isEmpty(groupsQuery)) {
      const groups = await Group.find(groupsQuery, { _id: 1, memberIds: 1, coachIds: 1 });
      const userIds = _.flatten(groups.map(g =>
        _.union(g.memberIds, g.coachIds)));
      _.extend(usersQuery, { _id: { $in:  userIds } });
    }

    const grouped = await User.aggregate([
      { $match: _.extend({ roles: { $nin: [ADMIN, SUPER_ADMIN] } }, usersQuery) },
      { $sort: { createAt: 1 } },
      {$group: {
          _id: { $substr: ['$createAt', 5, 5] },
          users: {
            $push: {
              createAt: "$createAt",
              roles: "$roles",
              gender: "$profile.gender"
            }
          }
        }
      },
    ]);
    return grouped.map(group => {
      const users =  group.users.filter(user => user.roles.includes(USER));
      const volunteer =  group.users.filter(user => user.roles.includes(VOLUNTEER));
      return {
        createAt: group.users[0].createAt,
        [USER]: users.length,
        [VOLUNTEER]: volunteer.length,
        [`${USER}-${VOLUNTEER}`]: volunteer.length + users.length,
        [`${USER}-female`]: users.filter(user => user.gender === 'male').length,
        [`${USER}-male`]: users.filter(user => user.gender === 'female').length,
        [`${VOLUNTEER}-female`]: volunteer.filter(user => user.gender === 'female').length,
        [`${VOLUNTEER}-male`]: volunteer.filter(user => user.gender === 'male').length,
      };
    });
  } catch (error) {
    next(error);
  }
};

const getStatistic = ({ User, Group }) => async (req, res, next) => {
  try {
    const statistics = await getUserStatistic({ User, Group })(req, res, next);
    sendList(res, { statistics })
  } catch (error) {
    next(error);
  }
};

module.exports = { getStatistic, getUserStatistic };

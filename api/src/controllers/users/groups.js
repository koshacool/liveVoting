const _ = require('lodash');
const { NotAcceptable } = require('rest-api-errors');
const { sendList } = require('../../middleware/index');
const { VOLUNTEER, USER } = require('../../middleware/permission-checker/roles');

const groups = ({ User, Group }, { config }) => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params._id });
    if (!user) {
      throw new NotAcceptable(406, 'NotAcceptable')
    }

    let { limit, skip } = req.query;

    skip = skip ? parseInt(skip, 10) : 0;
    limit = parseInt(limit, 10);
    limit = limit && limit < config.maxLimitPerQuery ? limit : config.maxLimitPerQuery;

    const query = {};
    if(user.roles.includes(VOLUNTEER)) {
      _.extend(query, { coachIds: user._id });
    } else if(user.roles.includes(USER)) {
      _.extend(query, { memberIds: user._id });
    }

    if(!_.isEmpty(query)) {
      const count = await Group.find(query).count();
      const groups = await Group.find(query)
        .skip(skip)
        .limit(limit);
      return sendList(res, { groups, count });
    }

    return sendList(res, { groups: [], count: 0 });
  } catch (error) {
    next(error);
  }
};

module.exports = groups;

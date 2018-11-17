const _ = require('lodash');
const { sendList } = require('../../middleware/index');
const { onlyDefined } = require('../../utils/requests');

const getList = ({ User }, { config }) => async (req, res, next) => {
  try {
    let { limit, skip, search, type, isApproved, isAgreeGDPR } = req.query;

    skip = skip ? parseInt(skip, 10) : 0;
    limit = parseInt(limit, 10);
    limit = limit && limit < config.maxLimitPerQuery ? limit : config.maxLimitPerQuery;

    const query = _.pickBy({ roles: type, approved: isApproved, isAgreeGDPR }, onlyDefined);
    if (search) {
      const fieldToSearch = new User().fieldsToSearch(search);
      _.extend(query, { $or: fieldToSearch })
    }

    const count = await User.find(query).count();
    const users = await User.find(query)
      .sort({ approved: 1 })
      .skip(skip)
      .limit(limit);

    return sendList(res, { users, count });
  } catch (error) {
    next(error);
  }
};

module.exports = getList;

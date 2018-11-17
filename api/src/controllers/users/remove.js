const { sendDeleted } = require('../../middleware/index');
const { MethodNotAllowed } = require('rest-api-errors');
const { SUPER_ADMIN } = require('../../middleware/permission-checker/roles');

const remove = ({ User, Image }) => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params._id });
    if(!user || user.roles.includes(SUPER_ADMIN)) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }
    await User.remove({ _id: req.params._id });
    await Image.remove({ _id: user.profile.imageId });

    return sendDeleted(res, { user });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;

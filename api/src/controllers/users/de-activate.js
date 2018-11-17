const { MethodNotAllowed } = require('rest-api-errors');
const { sendOne } = require('../../middleware/index');

const deActivate = ({ User }) => async (req, res, next) => {
  try {
    const { _id, value } = req.params;
    const user = await User.findById(_id);
    if (!user) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }
    user.active = value;

    await user.save();
    return sendOne(res, { user });
  } catch (error) {
    next(error)
  }
} ;

module.exports = deActivate;
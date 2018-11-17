const { sendOne } = require('../../middleware/index');
const { MethodNotAllowed } = require('rest-api-errors');

const my = ({ User }) => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user.approved) {
      throw new MethodNotAllowed(405, 'Is not approved yet.');
    }
    return sendOne(res, { user });

  } catch (error) {
    next(error);
  }
};

module.exports = my;

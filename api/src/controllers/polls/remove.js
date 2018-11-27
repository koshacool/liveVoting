const { sendDeleted } = require('../../middleware/index');
const { MethodNotAllowed } = require('rest-api-errors');

const remove = ({ User, Polls }) => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const { _id } = req.params;
    const poll = await Polls.findOne({ _id, createdBy: user._id });

    if (!user) {
      throw new MethodNotAllowed(405, 'Some went wrong.');
    }
    if (!poll) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }

    await Polls.remove({ _id });

    return sendDeleted(res, { poll });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;

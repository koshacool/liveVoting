const { MethodNotAllowed } = require('rest-api-errors');
const { sendDeleted } = require('../../middleware/index');
const { ANSWER_REMOVE } = require('../../sockets/events');

const remove = ({ User, Answers }, { socketIO }) => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const { _id } = req.params;

    if (!user) {
      throw new MethodNotAllowed(405, 'Some went wrong.');
    }

    await Answers.remove({ _id });

    socketIO.emitNotFor(user._id, ANSWER_REMOVE, { _id });

    return sendDeleted(res, { _id });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;

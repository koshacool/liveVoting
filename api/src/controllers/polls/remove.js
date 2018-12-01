const { sendDeleted } = require('../../middleware/index');
const { MethodNotAllowed } = require('rest-api-errors');
const { POLL_REMOVE } = require('../../sockets/events');

const remove = ({ User, Polls, Questions, Answers }, { socketIO }) => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const { _id } = req.params;
    const poll = await Polls.findOne({ _id, createdBy: user._id });
    const question = await Questions.findOne({ pollId: _id });

    if (!user) {
      throw new MethodNotAllowed(405, 'Some went wrong.');
    }
    if (!poll) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }

    await Polls.deleteOne({ _id });
    await Questions.deleteOne({ pollId: _id });

    if(question) {

      await Answers.deleteMany({ questionId: question._id });
    }

    if (poll.isPublic) {
      socketIO.emitNotFor(_id, POLL_REMOVE, { poll });
    }

    return sendDeleted(res, { poll });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;

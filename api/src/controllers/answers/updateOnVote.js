const _ = require('lodash');
const { MethodNotAllowed } = require('rest-api-errors');
const { sendOne } = require('../../middleware/index');
const { ANSWERS_UPDATE_ON_VOTE } = require('../../sockets/events');

const updateOnVote = ({ User, Answers }, { socketIO }) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    const { _id } = req.params;
    const answer = await Answers.findOne({ _id });

    if (!user) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }


    await Answers.updateMany(
      { questionId: answer.questionId },
      { $pull: { votedBy: userId } },
    );

    await Answers.updateOne({ _id }, { $addToSet: { votedBy: userId } });

    const updatedAnswers = await Answers.find({ questionId: answer.questionId });

    socketIO.emitNotFor(userId, ANSWERS_UPDATE_ON_VOTE, { answers: updatedAnswers });

    return sendOne(res, { answers: updatedAnswers });
  } catch (error) {
    next(error);
  }
};

module.exports = updateOnVote;

const _ = require('lodash');
const { sendOne } = require('../../middleware/index');
const { POLL_UNPUBLIC, POLL_ON_PUBLIC, POLL_UPDATE } = require('../../sockets/events');
const { MethodNotAllowed } = require('rest-api-errors');

const update = ({ User, Answers }, { socketIO }) => async (req, res, next) => {
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

    return sendOne(res, { answers: updatedAnswers });
  } catch (error) {
    next(error);
  }
};

module.exports = update;

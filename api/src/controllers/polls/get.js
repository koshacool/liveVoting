const { sendOne } = require('../../middleware');
const { MethodNotAllowed } = require('rest-api-errors');

const get = ({ User, Polls, Questions, Answers }) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    const { _id } = req.params;
    const poll = await Polls.findOne({
      _id,
      $or: [
        { createdBy: user._id },
        { isPublic: true },
  ] });

    if (!user || !poll) {
      throw new MethodNotAllowed(405, 'Some went wrong.');
    }

    const question = await Questions.findOne({ pollId: _id });
    const answers = question
      ? await Answers.find({ questionId: question._id })
      : [];

    return sendOne(res, { poll, question, answers });
  } catch (error) {
    next(error);
  }
};

module.exports = get;

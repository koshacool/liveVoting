const { sendOne } = require('../../middleware');
const { MethodNotAllowed } = require('rest-api-errors');

const get = ({ User, Polls }, { socketIO }) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    const { _id } = req.params;
    const poll = await Polls.findOne({ _id, createdBy: user._id });

    if (!user) {
      throw new MethodNotAllowed(405, 'Some went wrong.');
    }

    if (!poll) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }
    // TODO: get questions and answers

    return sendOne(res, { poll, question: null, answers: [] });
  } catch (error) {
    next(error);
  }
};

module.exports = get;

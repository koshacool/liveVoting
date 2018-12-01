const { sendDeleted } = require('../../middleware/index');
const { MethodNotAllowed } = require('rest-api-errors');

const remove = ({ User, Questions, Answers }, { socketIO }) => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const { _id } = req.params;

    if (!user) {
      throw new MethodNotAllowed(405, 'Some went wrong.');
    }

    await Questions.deleteOne({ _id });
    await Answers.deleteMany({ questionId: _id });

    return sendDeleted(res, { _id });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;

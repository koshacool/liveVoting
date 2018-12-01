const { sendOne } = require('../../middleware');
const { MethodNotAllowed } = require('rest-api-errors');

const create = ({ User, Answers }, { socketIO }) => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const { questionId } = req.body;

    if (!user) {
      throw new MethodNotAllowed(405, 'Permission denied.');
    }

    const answer = new Answers({ questionId });
    const saved = await answer.save();

    return sendOne(res, { answer: saved });
  } catch (error) {
    next(error);
  }
};

module.exports = create;

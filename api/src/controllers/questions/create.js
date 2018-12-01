const { sendOne } = require('../../middleware');
const { MethodNotAllowed } = require('rest-api-errors');

const create = ({ User, Questions }, { socketIO }) => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const { pollId } = req.body;

    if (!user) {
      throw new MethodNotAllowed(405, 'Some went wrong.');
    }

    const question = new Questions({ pollId });
    const saved = await question.save();

    return sendOne(res, { question: saved });
  } catch (error) {
    next(error);
  }
};

module.exports = create;

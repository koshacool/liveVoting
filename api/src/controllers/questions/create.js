const { MethodNotAllowed } = require('rest-api-errors');
const { sendOne } = require('../../middleware');
const { QUESTION_CREATE } = require('../../sockets/events');

const create = ({ User, Questions }, { socketIO }) => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const { pollId } = req.body;

    if (!user) {
      throw new MethodNotAllowed(405, 'Some went wrong.');
    }

    const question = new Questions({ pollId });
    const saved = await question.save();

    socketIO.emitNotFor(user._id, QUESTION_CREATE, { question: saved });

    return sendOne(res, { question: saved });
  } catch (error) {
    next(error);
  }
};

module.exports = create;

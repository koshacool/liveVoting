const { MethodNotAllowed } = require('rest-api-errors');
const { sendOne } = require('../../middleware');
const { ANSWER_CREATE } = require('../../sockets/events');

const create = ({ User, Answers }, { socketIO }) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    const { questionId } = req.body;

    if (!user) {
      throw new MethodNotAllowed(405, 'Permission denied.');
    }

    const answer = new Answers({ questionId });
    const saved = await answer.save();

    socketIO.emitNotFor(userId, ANSWER_CREATE, { answer: saved });

    return sendOne(res, { answer: saved });
  } catch (error) {
    next(error);
  }
};

module.exports = create;

const _ = require('lodash');
const { MethodNotAllowed } = require('rest-api-errors');
const { sendOne } = require('../../middleware/index');
const { QUESTION_UPDATE } = require('../../sockets/events');

const update = ({ User, Questions }, { socketIO }) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    const partToUpdate = req.body;
    const { _id } = req.params;
    const question = await Questions.findOne({ _id });

    if (!user) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }

    _.extend(question, partToUpdate);
    const saved = await question.save();

    socketIO.emitNotFor(userId, QUESTION_UPDATE, { question: saved });

    return sendOne(res, { question: saved });
  } catch (error) {
    next(error);
  }
};

module.exports = update;

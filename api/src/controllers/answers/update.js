const _ = require('lodash');
const { MethodNotAllowed } = require('rest-api-errors');
const { sendOne } = require('../../middleware/index');
const { ANSWER_UPDATE } = require('../../sockets/events');

const update = ({ User, Answers }, { socketIO }) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    const partToUpdate = req.body;
    const { _id } = req.params;
    const answer = await Answers.findOne({ _id });

    if (!user) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }

    _.extend(answer, partToUpdate);
    const saved = await answer.save();

console.log(saved)
    socketIO.emitNotFor(userId, ANSWER_UPDATE, { answer: saved });


    return sendOne(res, { answer: saved });
  } catch (error) {
    next(error);
  }
};

module.exports = update;

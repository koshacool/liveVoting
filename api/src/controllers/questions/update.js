const _ = require('lodash');
const { sendOne } = require('../../middleware/index');
const { POLL_UNPUBLIC, POLL_ON_PUBLIC, POLL_UPDATE } = require('../../sockets/events');
const { MethodNotAllowed } = require('rest-api-errors');

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


    return sendOne(res, { question: saved });
  } catch (error) {
    next(error);
  }
};

module.exports = update;

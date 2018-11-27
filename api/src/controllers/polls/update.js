const _ = require('lodash');
const { sendOne } = require('../../middleware/index');
const { POLL_TOGGLE_PUBLIC } = require('../../sockets/events');
const { MethodNotAllowed } = require('rest-api-errors');

const update = ({ User, Polls }, { socketIO }) => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const partToUpdate = req.body;
    const { _id } = req.params;
    const poll = await Polls.findOne({ _id, createdBy: user._id });

    if (!user) {
      throw new MethodNotAllowed(405, 'Some went wrong.');
    }

    if (!poll) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }

    _.extend(poll, partToUpdate);
    const saved = await poll.save();
    console.log(socketIO.getConnected())
    socketIO.emitAll(POLL_TOGGLE_PUBLIC, { poll });

    return sendOne(res, { poll: saved });
  } catch (error) {
    next(error);
  }
};

module.exports = update;

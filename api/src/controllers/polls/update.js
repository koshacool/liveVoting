const _ = require('lodash');
const { sendOne } = require('../../middleware/index');
const { POLL_UNPUBLIC, POLL_ON_PUBLIC, POLL_UPDATE } = require('../../sockets/events');
const { MethodNotAllowed } = require('rest-api-errors');

const getSocketMessageName = (poll, partToUpdate) => {
  let messageName = '';

  if (poll.isPublic) {
    messageName = !partToUpdate.isPublic
      ? POLL_UNPUBLIC
      : POLL_UPDATE;
  } else if (partToUpdate.isPublic && !poll.isPublic) {
    messageName = POLL_ON_PUBLIC;
  }

  return messageName;
};

const update = ({ User, Polls }, { socketIO }) => async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    const partToUpdate = req.body;
    const { _id } = req.params;
    const poll = await Polls.findOne({ _id, createdBy: user._id });

    if (!user) {
      throw new MethodNotAllowed(405, 'Some went wrong.');
    }

    if (!poll) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }

    const socketMessageName = getSocketMessageName(poll, partToUpdate);

    _.extend(poll, partToUpdate);
    const saved = await poll.save();

    if (socketMessageName) {
      socketIO.emitNotFor(userId, socketMessageName, { poll: saved });
    }

    return sendOne(res, { poll: saved });
  } catch (error) {
    next(error);
  }
};

module.exports = update;

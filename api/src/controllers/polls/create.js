const { sendOne } = require('../../middleware');
const { NEW_POLL } = require('../../sockets/events');
const { MethodNotAllowed } = require('rest-api-errors');

const create = ({ User, Polls }, { socketIO }) => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id }, { email: 1, fullName: 1 });

    if (!user) {
      throw new MethodNotAllowed(405, 'Some went wrong.');
    }

    const poll = new Polls({ createdBy: user._id });
    await poll.save();

    socketIO.emitFor(user._id, NEW_POLL, { poll });

    return sendOne(res, { poll });
  } catch (error) {
    next(error);
  }
};

module.exports = create;

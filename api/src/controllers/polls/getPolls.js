const { sendOne } = require('../../middleware');
const { MethodNotAllowed } = require('rest-api-errors');

const get = ({ User, Polls }) => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id },
      { email: 1, fullName: 1 });

    if (!user) {
      throw new MethodNotAllowed(405, 'Some went wrong.');
    }

    const polls = await Polls.find({
      $or: [
        { createdBy: user._id },
        { isPublic: true },
      ],
    }).sort({ createdAt: -1 });

    return sendOne(res, { polls });
  } catch (error) {
    next(error);
  }
};

module.exports = get;

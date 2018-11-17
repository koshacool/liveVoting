const { sendOne } = require('../../middleware');
const { MethodNotAllowed } = require('rest-api-errors');

const signIn = ({ User }) => async (req, res, next) => {
  const { token } = req;
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (!user.approved) {
      throw new MethodNotAllowed(405, 'Is not approved yet.');
    }
    if (!user.active) {
      throw new MethodNotAllowed(405, 'Is de-active user.');
    }
    return sendOne(res, { user, token});
  } catch (error) {
    next(error);
  }
};

module.exports = signIn;

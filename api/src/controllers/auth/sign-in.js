const { sendOne } = require('../../middleware');
const { MethodNotAllowed } = require('rest-api-errors');

const signIn = ({ User }) => async (req, res, next) => {
  const { token } = req;

  try {
    const user = await User.findOne({ _id: req.user.id }, { email: 1, fullName: 1 });

    if (!user) {
      throw new MethodNotAllowed(405, 'Some went wrong.');
    }

    return sendOne(res, { user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = signIn;

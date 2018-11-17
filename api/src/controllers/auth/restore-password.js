const { sendUpdated, withoutErrors } = require('../../middleware');
const { MethodNotAllowed, NotAcceptable } = require('rest-api-errors');
const generator = require('generate-password');
const EmailSender = require('../../utils/EmailSender');
const { EMAIL } = require('../../utils/regexes');

const restorePassword = ({ User }) => async (req, res, next) => {
  try {
    const { email } =  req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new MethodNotAllowed(405, 'User not found');
    }
    if (!EMAIL.test(email)) {
      throw new NotAcceptable(406, 'Email is in wrong format.');
    }

    const password = generator.generate({
      length: 10,
      numbers: true
    });
    user.isTemporaryPassword = true;

    return user.setPassword(password,
      withoutErrors(next, async updatedUser => {
       await updatedUser.save();
       new EmailSender('Restore Email', 'forgot-password-email', { password })
         .sendFor(email, () => {});
        sendUpdated(res, { success: true });
      }));
  } catch (error) {
    next(error);
  }
};

module.exports = restorePassword;

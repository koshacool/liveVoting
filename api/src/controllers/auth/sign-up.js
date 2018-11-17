const _ = require('lodash');
const { withoutErrors } = require('../../middleware');
const { NotAcceptable } = require('rest-api-errors');
const { PASSWORD } = require('../../utils/regexes');
const { parseFormDataBody } = require('../../utils/requests');

const signUp = ({ User, Image }) => async (req, res, next) => {
  const { email, password, profile, type } = parseFormDataBody(req.body);

  if (!PASSWORD.test(password)) {
    return next(new NotAcceptable(406, 'Password is in wrong format.'));
  }
  if (['admin', 'super-admin'].includes(type)) {
    return next(new NotAcceptable(406, 'Rules Not Acceptable'));
  }
  try {
    const user = new User({
      email,
      roles: [type],
      profile,
      approved: false,
      documentApproval: {},
      createAt: new Date(),
    });

    User.register(user, password,
      withoutErrors(next, async savedUser => {
        const avatar = _.get(req, 'files.avatar');
        if (avatar) {
          const image = new Image(avatar);
          const savedImage = await image.save();
          savedUser.profile.imageId = savedImage._id;
          await savedUser.save();
          return next();
        }
        return next();
      }));
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;

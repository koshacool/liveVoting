const { MethodNotAllowed } = require('rest-api-errors');
const { sendOne } = require('../../middleware/index');

const approve = ({ User }) => async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }
    user.documentApproval = {
      personalId: true,
      scanId: true
    };
    user.approved = true;

    await user.save();
    return sendOne(res, { user });
  } catch (error) {
    next(error)
  }
} ;

module.exports = approve;
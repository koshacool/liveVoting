// const _ = require('lodash');
// const { sendOne } = require('../../middleware/index');
// const { MethodNotAllowed } = require('rest-api-errors');
// const { parseFormDataBody } = require('../../utils/requests');

const update = ({ User, Image }) => async (req, res, next) => {
  // try {
  //   const { email, documentApproval, isAgreeGDPR, profile } = parseFormDataBody(req.body);
  //   const user = await User.findOne({ _id: req.user.id });
  //   if (!user) {
  //     throw new MethodNotAllowed(405, 'Permission denied');
  //   }
  //   const newDocumentApproval = _.extend(user.documentApproval, documentApproval || {});
  //   const newProfile = _.extend(user.profile, profile || {});
  //
  //   _.extend(user, {
  //     email: email || user.email,
	// 		isAgreeGDPR: _.isUndefined(isAgreeGDPR) ? user.isAgreeGDPR : isAgreeGDPR,
  //     documentApproval: newDocumentApproval,
  //     profile: newProfile,
  //   });
  //
  //   const avatar = _.get(req, 'files.avatar');
  //   if (avatar) {
  //     user.validateSync();
  //     await Image.remove({ _id: user.profile.imageId });
  //     const image = new Image(avatar);
  //     const savedImage = await image.save();
  //     user.profile.imageId = savedImage._id;
  //   }
  //
  //   await user.save();
  //   return sendOne(res, { user });
  //
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = update;

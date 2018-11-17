const _ = require('lodash');
const { sendOne } = require('../../middleware/index');
const { MethodNotAllowed } = require('rest-api-errors');
const { parseFormDataBody } = require('../../utils/requests');
const { isAllowChangeRole } = require('../../middleware/permission-checker');
const { idToString } = require('../../utils/helpers');

const update = ({ User, Image, File }) => async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (req.user._id.toString() === _id) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }

    const user = await User.findById(_id);
    const { email, documentApproval, profile, role, filesToRemove, isAgreeGDPR } = parseFormDataBody(req.body);

    if (!user) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }

    isAllowChangeRole(req.user.roles, user.roles, role);

    const newDocumentApproval = _.extend(user.documentApproval, documentApproval || {});
    const newProfile = _.extend(user.profile, profile || {});
    const newRoles = _.extend(user.roles, role && [role]);

    _.extend(user, {
      email: email || user.email,
      documentApproval: newDocumentApproval,
			isAgreeGDPR: _.isUndefined(isAgreeGDPR) ? user.isAgreeGDPR : isAgreeGDPR,
      profile: newProfile,
      roles: newRoles,
    });
    user.roles = newRoles;
    user.markModified('roles');

    const files = parseFormDataBody(_.get(req, 'files') || {});
    if (files.avatar || files.attachments) {
      user.validateSync();
    }
    if (files.avatar) {
      await Image.remove({ _id: user.profile.imageId });
      const image = new Image(files.avatar);
      const savedImage = await image.save();
      user.profile.imageId = savedImage._id;
    }
    if (_.get(files, 'attachments.length')) {
      const { attachments } = files;
      for(let index = 0; index < attachments.length; index ++) {
        const attachment = attachments[index];
        const file = new File(attachment);
        const savedFile = await file.save();
        user.attachments = user.attachments || [];
        user.attachments.push(savedFile._id);
      }
    }

    user.attachments = _.difference(user.attachments.map(idToString), filesToRemove);

    if (filesToRemove && filesToRemove.length) {
      for(let index = 0; index < filesToRemove.length; index++) {
        await File.remove({ _id: filesToRemove[index] });
      }
    }

    await user.save();
    return sendOne(res, { user });

  } catch (error) {
    next(error);
  }
};

module.exports = update;

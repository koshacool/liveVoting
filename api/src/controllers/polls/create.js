

const create = ({ User }) => async (req, res, next) => {
  // try {
  //   const { email, documentApproval, profile, role } = parseFormDataBody(req.body);
  //
  //   const userObject = {
  //     email,
  //     documentApproval,
  //     profile,
  //     roles: [role],
  //     isTemporaryPassword: true,
  //     approved: role === ADMIN,
  //     createAt: new Date(),
  //   };
  //   const password = generator.generate({
  //     length: 10,
  //     numbers: true
  //   });
  //
  //   const user = await registerUser(User, userObject, password);
  //
  //   const files = parseFormDataBody(_.get(req, 'files') || {});
  //   if (files.avatar) {
  //     const image = new Image(files.avatar);
  //     const savedImage = await image.save();
  //     user.profile.imageId = savedImage._id;
  //   }
  //   if (_.get(files, 'attachments.length')) {
  //     const { attachments } = files;
  //     for(let index = 0; index < attachments.length; index ++) {
  //       const attachment = attachments[index];
  //       const file = new File(attachment);
  //       const savedFile = await file.save();
  //       user.attachments = user.attachments || [];
  //       user.attachments.push(savedFile._id);
  //     }
  //     // because bug of mongoose
  //     _.extend(user, { attachments: user.attachments.toObject() });
  //   }
  //   await user.save();
  //   new EmailSender('New account', 'created-account-email', {
  //     password,
  //     hostUrl: EmailSender.hrefFor(req, ''),
  //     firstName: user.profile.firstName,
  //     lastName: user.profile.lastName,
  //   }).sendFor(email, () => {});
  //
  //   return sendOne(res, { user });
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = create;

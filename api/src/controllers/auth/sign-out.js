const { sendAccepted } = require('../../middleware');

const signOut = ({}, { socketIO }) => (req, res) => {
  socketIO.remove(req.user.id);
  req.logOut();
  sendAccepted(res)();
};

module.exports = signOut;

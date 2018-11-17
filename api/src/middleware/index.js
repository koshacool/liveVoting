const { errorHandler } = require('./error-handler');
const { authenticate, generateAccessToken } = require('./auth');
const { nocache } = require('./no-cache');
const {
  sendOne,
  sendList,
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendAccepted,
  withoutErrors,
} = require('./requests-helpers');

module.exports = {
  sendOne,
  sendList,
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendAccepted,
  authenticate,
  generateAccessToken,
  withoutErrors,
  errorHandler,
	nocache,
};
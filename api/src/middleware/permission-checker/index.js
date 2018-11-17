const _ = require('lodash');
const permissions = require('./permissions');
const actions = require('./constants');
const { STATUS_CODES } = require('http');
const { Unauthorized, MethodNotAllowed } = require('rest-api-errors');
const { SUPER_ADMIN, ADMIN } = require('./roles');

const approvedUserField = 'approved';
const activeUserField = 'active';
const privacyPolicyField = 'isAgreeGDPR';

// string => array => array
const isRoleHasPermission = action => role =>
  _.includes(permissions[role], actions.ALL_RIGHT) || _.includes(permissions[role], action);
/**
 *
   Permissions middleware for route
      register action type for role inside -> ./permission.js

   @example
           const permission = require('../../middleware/permission-checker');
           const { VIEW_ACTIVITY } = permission.actions; <-- here action type

           module.exports = (models) => {
            const api = router();
            const isAllow = permission.isAllow(models);

            api.get('/', authenticate, isAllow(VIEW_ACTIVITY), list(models)); <-- here middleware
            ....

            return api;
           };


   Check permissions inside controller

   @example
          if (!hasPermissionTo(actions.CREATE_LANDLORD, users, res)) {
                throw new MethodNotAllowed();
          }
**/

const hasPermissionTo = (action, user) => {
  const userPermissions = user && user[approvedUserField] && user.roles.map(isRoleHasPermission(action));

  if (!(userPermissions && _.includes(userPermissions, true))) {
    throw new MethodNotAllowed(405, 'Permission denied');
  }

  return true;
};

const isAllow = ({ User }) => action => async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }
    if (!user[approvedUserField]) {
      throw new MethodNotAllowed(405, 'User is not approved.');
    }
    if (!user[activeUserField]) {
      throw new MethodNotAllowed(405, 'User is not active.');
    }
		if (!user[privacyPolicyField]) {
			throw new MethodNotAllowed(405, 'Privacy Policy Permission denied.');
		}
    const actions = _.isArray(action) && action || [action];
    actions.forEach(singleAction => {
      const userPermissions = user.roles.map(isRoleHasPermission(singleAction));

      if (!(userPermissions && _.includes(userPermissions, true))) {
        throw new MethodNotAllowed(405, 'Permission denied');
      }
    });
    req.user = user;
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({
        code: error.code || 500,
        message: error.message || STATUS_CODES[error.status],
      });
  }
  next();
};

const isAllowChangeRole = (changerRoles, oldRoles, newRole) => {
  if(_.difference(oldRoles, [newRole]).length) {
    if (newRole === SUPER_ADMIN || oldRoles.includes(SUPER_ADMIN))
      throw new MethodNotAllowed(405, 'Permission denied');
    // <-- only ADMIN and SUPER_ADMIN can change permission of another users
    if (!(changerRoles.includes(ADMIN) || changerRoles.includes(SUPER_ADMIN))) {
      throw new MethodNotAllowed(405, 'Permission denied');
    }
  }
};

module.exports = {
  isAllow,
  hasPermissionTo,
  isAllowChangeRole,
  actions,
};


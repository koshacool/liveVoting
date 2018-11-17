const actions = require('./constants');
const { USER, ADMIN, SUPER_ADMIN, VOLUNTEER } = require('./roles');

module.exports = {
  [USER]: [
    actions.VIEW_ACTIVITY,
    actions.VIEW_GROUP,
    actions.VIEW_LESSON,
    actions.VIEW_NOTE,
    actions.SUBSCRIBE_GROUP,
    actions.UNSUBSCRIBE_GROUP,
    actions.READ_MESSAGE,
    actions.CHECKIN_LESSON,
  ],
  [VOLUNTEER]: [
    actions.VIEW_ACTIVITY,

    actions.VIEW_GROUP,

    actions.CREATE_LESSON,
    actions.VIEW_LESSON,
    actions.EDIT_LESSON,

    actions.CREATE_MESSAGE,
    actions.EDIT_MESSAGE,
    actions.VIEW_MESSAGE,
    actions.READ_MESSAGE,

    actions.CREATE_NOTE,
    actions.VIEW_NOTE,
    actions.EDIT_NOTE,
    actions.REMOVE_NOTE,

    actions.EDIT_GROUP,
  ],
  [ADMIN]: [
    actions.VIEW_ACTIVITY,
    actions.EDIT_ACTIVITY,
    actions.CREATE_ACTIVITY,
    actions.REMOVE_ACTIVITY,

    actions.VIEW_GROUP,
    actions.EDIT_GROUP,
    actions.REMOVE_GROUP,
    actions.CREATE_GROUP,

    actions.VIEW_LESSON,
    actions.EDIT_LESSON,

    actions.VIEW_MESSAGE,
    actions.VIEW_LESSON_STATISTIC,
    actions.CREATE_MESSAGE,
    actions.REMOVE_MESSAGE,
    actions.EDIT_MESSAGE,
    actions.READ_MESSAGE,

    actions.CREATE_NOTE,
    actions.VIEW_NOTE,
    actions.EDIT_NOTE,
    actions.REMOVE_NOTE,

    actions.CREATE_USER,
    actions.EDIT_USER,
    actions.EDIT_SETTING,

    actions.VIEW_STATISTICS,
    actions.REMOVE_USER,
  ],
  [SUPER_ADMIN]: [
    actions.ALL_RIGHT,
  ],
};

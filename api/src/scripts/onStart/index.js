const { addUsersFromJSON } = require('./add-users');
const { addActivitiesFromJSON } = require('./add-activities');
const { addGroupsFromJSON } = require('./add-groups');
const { addNotesFromJSON } = require('./add-notes');
const { addGeneratedUsersFromJSON } = require('./add-users-generated');
const { addMessagesFromJSON } = require('./add-messsages');
const { addLessons } = require('./add-lesons');
const { addUsersStatistics } = require('./add-statistics');
module.exports = {
  addUsersFromJSON,
  addActivitiesFromJSON,
  addGroupsFromJSON,
  addNotesFromJSON,
  addGeneratedUsersFromJSON,
  addMessagesFromJSON,
  addLessons,
  addUsersStatistics,
};
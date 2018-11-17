const _ = require('lodash');
const moment = require('moment');
const { User } = require('../../models/user');
const { Group } = require('../../models/group');
const { Lesson } = require('../../models/lesson');

/**
 * Provide add lessons for groups
 *
 **/

const addLessons = () => new Promise(async (resolve, reject) => {
  try {
    const doc = await Lesson.findOne({});
    const groups = await Group.find({});

    if (!doc) {
      let added = 0;
      for (let index = 0; index < groups.length; index++) {
        const group = groups[index];
        const memberIds = group.memberIds.map(v => v.toString());
        for (let j = 0; j < group.schedule.length; j++) {
          const schedule =  group.schedule[j];
          const { startAt, endAt, day } = schedule;
          const from = moment(startAt).day(day).hour(moment(startAt).hour()).minute(moment(startAt).minute());
          const to = moment(startAt).day(day).hour(moment(endAt).hour()).minute(moment(endAt).minute());

          const lesson = new Lesson({
            groupId: group._id,
            scheduleId: schedule._id,
            memberIds: _.uniq(_.range(0, 7)
              .map(() =>memberIds[_.random(0, memberIds.length -1)])),
            startAt: from.day(from.day() -6).toDate(),
            endAt: to.day(to.day() -6).toDate()
          });

          await lesson.save();
          added = added + 1;
        }
      }
      // add many lessons for 1 user
      const user = await User.findOne({ email: 'user10@rcyn.com' });
      const group = groups[0];
      const days = moment().diff(moment().dayOfYear(1), 'days');
      for (let index = 0; index < days; index++) {
        const lesson = new Lesson({
          groupId: group._id,
          scheduleId: group.schedule[0]._id,
          memberIds: [user._id],
          startAt: moment().dayOfYear(index),
          endAt: moment().dayOfYear(index),
        });
        await lesson.save();
      }
      // eslint-disable-next-line
      console.log(`[${added}] Lessons successfully created...`);
      resolve();
    } else {
      resolve();
    }
  } catch (error) {
    reject(error);
  }
});

module.exports = { addLessons };
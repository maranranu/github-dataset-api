const moment = require('moment');
const _ = require('lodash');
const models = require('../../models');
const Promise = require('bluebird');

const streakProcessing = (events) => {
  const streakInfo = {};
  events.forEach((event) => {
    const { actorId, created_at } = event;
    if (streakInfo[actorId]) {
      const actorStreak = streakInfo[actorId];
      const lastStreakTime = moment(actorStreak.lastStreakTime, 'YYYY-MM-DD');
      const currentEvent = moment(created_at, 'YYYY-MM-DD');
      const daysDiff = lastStreakTime.diff(currentEvent, 'days');
      if (daysDiff === 1) {
        actorStreak.currentStreak += 1;
        if (actorStreak.currentStreak > actorStreak.maxStreaks) {
          actorStreak.maxStreaks = actorStreak.currentStreak;
        }
      } if (daysDiff > 1) {
        actorStreak.currentStreak = 0;
      }
      actorStreak.lastStreakTime = created_at;
    } else {
      streakInfo[actorId] = {
        currentStreak: 0,
        maxStreaks: 0,
        lastStreakTime: created_at,
        latestStreakTime: moment(created_at).valueOf(),
        login: event.actor.login,
      };
    }
  });
  return streakInfo;
};

const getStreak = async (req, res) => {
  const allEvents = await models.event.findAll({
    include: [models.actor],
    order: [
      ['actorId'],
      ['created_at', 'DESC'],
    ],
  });
  const streaks = streakProcessing(allEvents);
  const streakArray = Object.keys(streaks).map(actorId => ({
      actorId,
      maxStreaks: streaks[actorId].maxStreaks,
      latestStreakTime: streaks[actorId].latestStreakTime,
      login: streaks[actorId].login,
  }));
  const sortedStreaks = _.orderBy(
    streakArray,
    ['maxStreaks', 'latestStreakTime', 'login'],
    ['desc', 'desc', 'asc'],
  );
  const actorsId = sortedStreaks.map(info => Number(info.actorId));
  const actors = await Promise.mapSeries(actorsId, async(actorId) => 
   models.actor.findOne({
    where: {
      id: actorId,
    },
    attributes: {
      include: ['id', 'login', 'avatar_url']
    },
  }));
  return res.status(200).send(actors);
};

module.exports = getStreak;

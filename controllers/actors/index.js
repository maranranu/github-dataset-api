const getAllActors = require('./getAllActors');
const updateActor = require('./updateActor');
const getStreak = require('./getStreak');
const { callbackHandler } = require('../callbackHandling');

module.exports = {
  updateActor: callbackHandler(updateActor),
  getAllActors: callbackHandler(getAllActors),
  getStreak: callbackHandler(getStreak),
};

const addEvent = require('./addEvent');
const getAllEvents = require('./getAllEvents');
const getByActor = require('./getByActor');
const eraseEvents = require('./eraseEvents');
const { callbackHandler } = require('../callbackHandling');

module.exports = {
  getAllEvents: callbackHandler(getAllEvents),
  addEvent: callbackHandler(addEvent),
  getByActor: callbackHandler(getByActor),
  eraseEvents: callbackHandler(eraseEvents),
};

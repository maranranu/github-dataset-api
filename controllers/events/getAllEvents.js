const models = require('../../models');

const getAllEvents= async (req, res) => {
  try {
    const events = await models.event.findAll({
      attributes: {
        exclude: ['actorId', 'repoId']
      },
      include: [{
        model:  models.actor
      }, {
        model:  models.repository
      }],
      order:[['id']]
    })
	  return res.status(200).send(events);
  } catch (error) {
	  return res.status(500).send(error);
  } 
}; 

module.exports = getAllEvents;

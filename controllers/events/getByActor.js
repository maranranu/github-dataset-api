const models = require('../../models');

const getByActor = async function(req, res) {
  try {
    const actorId = req.params.actorID;
    const events = await models.event.findAll({
      where: {
        actorId: actorId
      },
      attributes: {
        exclude: ['actorId', 'repoId']
      },
      include: [{
        model:  models.actor,
      }, {
        model:  models.repository
      }],
      order:[['id', 'ASC']]
    })
    if (events.length) {
      return res.status(200).send(events);
    } else {
      return res.status(404).send();
    }
  } catch (error) {
    return res.status(500).send(error);
  } 
};

module.exports = getByActor;

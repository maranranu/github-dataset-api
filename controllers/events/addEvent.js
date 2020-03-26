const models = require('../../models');

const addEvent = async (req, res) => {
  const params = req.body;
  const eventId = params.id;
  const actorObj = params.actor;
  const repoObj = params.repo;
  try {
    const [event, actor, repo] = await Promise.all([
      models.event.findByPk(eventId),
      models.actor.findByPk(params.actor.id),
      models.repository.findByPk(params.repo.id)
    ]);
    if (event) {
      return res.status(400).send();
    } else {
      if (!actor) {
        await models.actor.create(actorObj);
      }
      if(!repo) {
        await models.repository.create(repoObj);
      }
      const created = await models.event.create({
        id: params.id,
        type: params.type,
        actorId: actorObj.id,
        repoId: repoObj.id,
        created_at: params.created_at
      });
          return res.status(201).send();
    }
  } catch(error) {
    return res.status(500).send(error);
  }
}

module.exports = addEvent;

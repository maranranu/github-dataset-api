const models = require('../../models');

const updateActor = async (req, res) => {
  const { id, avatar_url, login } = req.body;
  try {
    const actor = await models.actor.findByPk(id);
    if(actor) {
      if(actor.login !== login) {
        return res.status(400).send();
      } else {
        const d = await models.actor.update({
          avatar_url,
        }, {
          where: {
              id,
        }
      });
        return res.status(200).send(d);
      }
    } else {
      return res.status(404).send();
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = updateActor;

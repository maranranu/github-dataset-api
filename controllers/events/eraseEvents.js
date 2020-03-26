const models = require('../../models');

const eraseEvents = async (req, res) => {
  try {
    await Promise.all([
       models.event.destroy({where: {}, truncate: true}),
       models.repository.destroy({where: {}, truncate: true}),
       models.actor.destroy({where: {}, truncate: true})
    ]);
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send(error);
  } 
};

module.exports = eraseEvents;

const Sequelize = require('sequelize');
const models = require('../../models');

const getAllActors = async (req, res) => {
  try {
    const actors = await models.actor.findAll({
    attributes:{
      include: ['id', 'login', 'avatar_url',
        [Sequelize.fn('COUNT', Sequelize.col('events.actorId')), 'num_events'],
        [Sequelize.fn('max', Sequelize.col('events.created_at')), 'latest_event']
      ]
    },
    include:[{
      model: models.event,
      attributes: []
    }],
    group: ['events.actorId'],
    order:[
      [Sequelize.literal('num_events'), 'DESC'],
      [Sequelize.literal('latest_event'), 'DESC'],
      ['login']
    ]
  });
  const result = actors.map(a => ({
    'id': a.id,
    'login': a.login,
    'avatar_url': a.avatar_url
  }));
  return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = getAllActors;

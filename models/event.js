const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const eventModel = sequelize.define('event', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    type: { type: DataTypes.STRING },
    actorId: { type: DataTypes.INTEGER },
    repoId: { type: DataTypes.INTEGER },
    created_at: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {timestamps: false});
  eventModel.associate = (models) => {
    eventModel.belongsTo(models.actor);
    eventModel.belongsTo(models.repository);
  }
  return eventModel;
}
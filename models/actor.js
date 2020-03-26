module.exports = (sequelize, DataTypes) => {
  const actorModel = sequelize.define('actor', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    login: { type: DataTypes.STRING },
    avatar_url: { type: DataTypes.TEXT }
  }, {timestamps: false});
  actorModel.associate = (models) => {
    actorModel.hasMany(models.event);
  }
  return actorModel;
}

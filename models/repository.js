module.exports = (sequelize, DataTypes) => {
  const repositoryModel = sequelize.define('repo', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    name: { type: DataTypes.STRING },
    url: { type: DataTypes.TEXT }
  }, {timestamps: false});
  repositoryModel.associate = (models) => {
    repositoryModel.hasMany(models.event);
  }
  return repositoryModel;
}

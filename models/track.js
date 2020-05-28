'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    name: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    album_id: DataTypes.INTEGER,
  }, {});
  Track.associate = function(models) {
    Track.belongsTo(models.Artist);
  };
  return Track;
};
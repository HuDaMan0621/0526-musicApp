'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    name: DataTypes.STRING
  }, {});
  Artist.associate = function(models) {
    // Artist.hasMany(models.Album, { foreignKey: 'artistid'})
  };
  return Artist;
};
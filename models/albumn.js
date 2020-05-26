'use strict';
module.exports = (sequelize, DataTypes) => {
  const Albumn = sequelize.define('Albumn', {
    albumn_name: DataTypes.STRING
  }, {});
  Albumn.associate = function(models) {
    // associations can be defined here
  };
  return Albumn;
};
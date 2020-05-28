'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {return queryInterface.addColumn(
    'Albums',
    'ArtistId',
    {
    type: Sequelize.DataTypes.INTEGER,  //UUID or Integer will also work, just follow the db
    references: {
      model: 'Artists', // name of Target model
      foreignKey: 'id', // key in Target model
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }

  )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Albums', // name of Source model
      'ArtistId', // key we want to remove
    )}
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {queryInterface.addColumn(
    'Albums',
    'artist_id',
    {
    type: Sequelize.Integer,  //UUID or Integer will also work, just follow the db
    references: {
      model: 'Artist', // name of Target model
      key: 'id', // key in Target model
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }

  )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Album', // name of Source model
      'Artist_id', // key we want to remove
    )}
};

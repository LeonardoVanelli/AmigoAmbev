module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('atividades', 'premio_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('atividades', 'premio_id');
  },
};

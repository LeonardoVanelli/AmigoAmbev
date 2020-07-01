module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tipos_processos', 'processo_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('tipos_processos', 'processo_id');
  },
};

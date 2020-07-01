module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('atividades', 'validado', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('atividades', 'validado');
  },
};

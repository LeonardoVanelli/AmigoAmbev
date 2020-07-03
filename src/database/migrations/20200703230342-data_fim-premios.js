module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('premios', 'data_fim', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: queryInterface => {
    return queryInterface.changeColumn('premios', 'data_fim');
  },
};

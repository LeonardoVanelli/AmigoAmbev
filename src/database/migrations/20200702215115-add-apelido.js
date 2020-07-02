module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'apelido', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('atividades', 'validado');
  },
};

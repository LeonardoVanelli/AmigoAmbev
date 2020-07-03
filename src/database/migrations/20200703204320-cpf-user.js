module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'cpf', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'cpf');
  },
};

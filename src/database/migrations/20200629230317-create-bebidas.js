module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bebidas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      pontos_comercio: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pontos_bar: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('bebidas');
  },
};

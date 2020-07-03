module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('premios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_inicio: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false,
      },
      data_fim: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false,
      },
      pontos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      data_hora: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
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
    return queryInterface.dropTable('premios');
  },
};

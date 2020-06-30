module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('codigos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      hash_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bebida_id: {
        type: Sequelize.INTEGER,
        references: { model: 'bebidas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      usuario_utilizacao_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      data_hora_gerado: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false,
      },
      data_hora_utilizado: {
        type: Sequelize.DATE,
        allowNull: true,
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
    return queryInterface.dropTable('codigos');
  },
};

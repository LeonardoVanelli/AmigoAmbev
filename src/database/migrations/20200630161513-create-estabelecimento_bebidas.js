module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('estabelecimento_bebidas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      valor: {
        type: Sequelize.REAL,
        allowNull: false,
      },
      estabelecimento_id: {
        type: Sequelize.INTEGER,
        references: { model: 'estabelecimentos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      bebida_id: {
        type: Sequelize.INTEGER,
        references: { model: 'bebidas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    return queryInterface.dropTable('estabelecimento_bebidas');
  },
};

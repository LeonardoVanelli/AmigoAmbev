module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('postagens', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      texto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imagem_id: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      tipo_id: {
        type: Sequelize.INTEGER,
        references: { model: 'tipo_postagems', key: 'tipo_postagem_id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      data_hora: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    return queryInterface.dropTable('postagens');
  },
};

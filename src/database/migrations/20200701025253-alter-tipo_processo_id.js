module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('atividades', 'tipo_processo_id', {
      type: Sequelize.INTEGER,
      references: { model: 'tipos_processos', key: 'processo_id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('atividades', 'tipo_processo_id');
  },
};

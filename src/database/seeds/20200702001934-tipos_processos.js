module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('tipos_processos', [
      {
        nome: 'Compra no mercado',
        descricao: 'Cliente comprou a bebida em um mercado',
        created_at: new Date(),
        updated_at: new Date(),
        processo_id: 2,
      },
      {
        nome: 'Compra no bar',
        descricao: 'Cliente comprou a bebida em um bar',
        created_at: new Date(),
        updated_at: new Date(),
        processo_id: 1,
      },
      {
        nome: 'Validação de compra pelo caixa',
        descricao: 'Atendente do caia validou o consumo do cliente no bar',
        created_at: new Date(),
        updated_at: new Date(),
        processo_id: 3,
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('tipos_processos', null, {});
  },
};

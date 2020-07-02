module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('enderecos', [
      {
        pais: 'Brasil',
        estado: 'Santa Catarina',
        cidade: 'Blumenau',
        bairro: 'Progresso',
        rua: 'Principal',
        cartesiano_x: 23.987026,
        cartesiano_y: 27.689784,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('enderecos', null, {});
  },
};

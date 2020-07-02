module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('tipo_postagems', [
      {
        nome: 'Cliente',
        descricao: 'Postagem realizada pelo cliente',
        tipo_postagem_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Bar',
        descricao: 'Postagem realizada pelo bar',
        tipo_postagem_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Ambev',
        descricao: 'Postagem realizada pela empresa',
        tipo_postagem_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Empresa',
        descricao: 'Postagem realizada pelo empresa do app',
        tipo_postagem_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('tipo_postagems', null, {});
  },
};

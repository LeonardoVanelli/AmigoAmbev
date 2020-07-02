module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('bebidas', [
      {
        nome: 'Adriática',
        pontos_comercio: 10,
        pontos_bar: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Antarctica Sub Zero',
        pontos_comercio: 10,
        pontos_bar: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Antarctica',
        pontos_comercio: 10,
        pontos_bar: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: `Beck's`,
        pontos_comercio: 10,
        pontos_bar: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: `Brahma`,
        pontos_comercio: 10,
        pontos_bar: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: `Brahma Zero`,
        pontos_comercio: 10,
        pontos_bar: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: `Bohemia`,
        pontos_comercio: 10,
        pontos_bar: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: `Brahma Light`,
        pontos_comercio: 10,
        pontos_bar: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('bebidas', null, {});
  },
};

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Usuario Sa',
        email: 'usuario.sa@teste.com',
        password_hash:
          '$2a$08$lOPaQ3OuMyMVNaxg6b9kzukz/N1OhOSSLj2lGImfOT39sQgHuF/o.',
        hash_code: 'ksoOuPmn',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};

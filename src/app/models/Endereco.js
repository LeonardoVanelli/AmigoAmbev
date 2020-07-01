import Sequelize, { Model } from 'sequelize';

class Endereco extends Model {
  static init(sequelize) {
    super.init(
      {
        pais: Sequelize.STRING,
        estado: Sequelize.STRING,
        cidade: Sequelize.STRING,
        bairro: Sequelize.STRING,
        rua: Sequelize.STRING,
        cartesianoX: Sequelize.DOUBLE,
        cartesianoY: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Endereco;

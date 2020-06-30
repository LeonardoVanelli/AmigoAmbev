import Sequelize, { Model } from 'sequelize';

class Bebidas extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING(100),
        pontos_bar: Sequelize.INTEGER,
        pontos_comercio: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Bebidas;

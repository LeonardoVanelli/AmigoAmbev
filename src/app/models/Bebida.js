import Sequelize, { Model } from 'sequelize';

class Bebida extends Model {
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

export default Bebida;

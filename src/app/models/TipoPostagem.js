import Sequelize, { Model } from 'sequelize';

class TipoPostagem extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default TipoPostagem;

import Sequelize, { Model } from 'sequelize';

class TiposProcesso extends Model {
  static init(sequelize) {
    super.init(
      {
        processo_id: Sequelize.INTEGER,
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        validado: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default TiposProcesso;

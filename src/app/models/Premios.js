import Sequelize, { Model } from 'sequelize';

class Premios extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        data_inicio: Sequelize.DATE,
        data_fim: Sequelize.DATE,
        pontos: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Premios;

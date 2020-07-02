import Sequelize, { Model } from 'sequelize';

class TipoPostagem extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        tipo_postagem_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default TipoPostagem;

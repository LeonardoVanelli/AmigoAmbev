import Sequelize, { Model } from 'sequelize';

class Comentarios extends Model {
  static init(sequelize) {
    super.init(
      {
        texto: Sequelize.STRING,
        datahora: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Postagens, {
      foreignKey: 'postagem_id',
      as: 'postagem',
    });

    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export default Comentarios;

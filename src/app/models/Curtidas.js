import Sequelize, { Model } from 'sequelize';

class Curtidas extends Model {
  static init(sequelize) {
    super.init(
      {
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

export default Curtidas;

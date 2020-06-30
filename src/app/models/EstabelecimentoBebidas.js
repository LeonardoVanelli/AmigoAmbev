import Sequelize, { Model } from 'sequelize';

class EstabelecimentoBebidas extends Model {
  static init(sequelize) {
    super.init(
      {
        valor: Sequelize.REAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Estabelecimento, {
      foreignKey: 'estabelecimento_id',
      as: 'estabelecimento',
    });
    this.belongsTo(models.User, {
      foreignKey: 'bebida_id',
      as: 'bebida',
    });
  }
}

export default EstabelecimentoBebidas;

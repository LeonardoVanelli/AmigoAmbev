import Sequelize, { Model } from 'sequelize';

class Atividade extends Model {
  static init(sequelize) {
    super.init(
      {
        created_at: Sequelize.DATE,
        validado: Sequelize.BOOLEAN,
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
    this.belongsTo(models.Bebida, {
      foreignKey: 'bebida_id',
      as: 'bebida',
    });
    this.belongsTo(models.User, {
      foreignKey: 'usuario_id',
      as: 'usuario',
    });
    this.belongsTo(models.TiposProcesso, {
      foreignKey: 'tipo_processo_id',
      as: 'tipo_processo',
    });
    this.belongsTo(models.Premios, {
      foreignKey: 'premio_id',
      as: 'premio',
    });
  }
}

export default Atividade;

import Sequelize, { Model } from 'sequelize';
import generateHash from 'random-hash';

class Codigo extends Model {
  static init(sequelize) {
    super.init(
      {
        hash_code: Sequelize.STRING,
        data_hora_gerado: Sequelize.DATE,
        data_hora_utilizado: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async codigo => {
      // eslint-disable-next-line no-param-reassign
      codigo.hash_code = generateHash({
        length: 8,
        charset:
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_',
      });
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'usuario_utilizacao_id',
      as: 'usuarioUtilizacao',
    });
    this.belongsTo(models.Bebida, {
      foreignKey: 'bebida_id',
      as: 'bebida',
    });
  }
}

export default Codigo;

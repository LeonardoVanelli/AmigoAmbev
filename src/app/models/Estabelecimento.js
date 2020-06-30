import Sequelize, { Model } from 'sequelize';
import generateHash from 'random-hash';

class Estabelecimento extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        telefone: Sequelize.STRING,
        pontos: Sequelize.INTEGER,
        hash_code: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      // eslint-disable-next-line no-param-reassign
      user.hash_code = generateHash({
        length: 8,
        charset:
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_',
      });
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Endereco, {
      foreignKey: 'endereco_id',
      as: 'endereco',
    });
    this.belongsTo(models.User, {
      foreignKey: 'responsavel_id',
      as: 'responsavel',
    });
  }
}

export default Estabelecimento;

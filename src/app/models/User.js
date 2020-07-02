import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import generateHash from 'random-hash';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
        pontos: Sequelize.INTEGER,
        hash_code: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        apelido: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password)
        // eslint-disable-next-line no-param-reassign
        user.password_hash = await bcrypt.hash(user.password, 8);
    });

    this.addHook('beforeCreate', async user => {
      // eslint-disable-next-line no-param-reassign
      user.hash_code = generateHash({
        length: 8,
        charset:
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_',
      });

      const userNameHash = Math.random() * 99;
      const firstName = user.name.split(' ')[0];

      const duasPrimeirasLetras = firstName.substr(0, 2);
      // eslint-disable-next-line no-param-reassign
      user.apelido = ` ${firstName}.${duasPrimeirasLetras.toUpperCase()}${userNameHash.toFixed()}`;
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.Endereco, {
      foreignKey: 'endereco_id',
      as: 'endereco',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;

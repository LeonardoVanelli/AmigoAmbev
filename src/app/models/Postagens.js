import Sequelize, { Model } from 'sequelize';

class Postagens extends Model {
  static init(sequelize) {
    super.init(
      {
        texto: Sequelize.STRING,
        data_hora: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'imagem_id',
      as: 'file',
    });

    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    this.belongsTo(models.TipoPostagem, {
      foreignKey: 'tipo_id',
      as: 'tipopostagem',
    });

    this.hasMany(models.Curtidas, {
      foreignKey: 'postagem_id',
      as: 'curtidas',
    });

    this.hasMany(models.Comentarios, {
      foreignKey: 'postagem_id',
      as: 'comentarios',
    });
  }
}

export default Postagens;

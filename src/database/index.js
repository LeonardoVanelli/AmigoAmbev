import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import DatabaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
import Bebida from '../app/models/Bebida';
import Endereco from '../app/models/Endereco';
import Estabelecimento from '../app/models/Estabelecimento';
import EstabelecimentoBebidas from '../app/models/EstabelecimentoBebidas';
import TiposProcesso from '../app/models/TiposProcesso';
import Atividade from '../app/models/Atividade';
import Codigo from '../app/models/Codigo';
import TipoPostagem from '../app/models/TipoPostagem';
import Postagens from '../app/models/Postagens';
import Curtidas from '../app/models/Curtidas';
import Comentarios from '../app/models/Comentarios';

const Models = [
  Appointment,
  Atividade,
  Bebida,
  Endereco,
  Estabelecimento,
  EstabelecimentoBebidas,
  File,
  TiposProcesso,
  User,
  Codigo,
  TipoPostagem,
  Postagens,
  Curtidas,
  Comentarios,
];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.Connection = new Sequelize(DatabaseConfig);

    Models.map(model => model.init(this.Connection)).map(
      model => model.associate && model.associate(this.Connection.models)
    );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();

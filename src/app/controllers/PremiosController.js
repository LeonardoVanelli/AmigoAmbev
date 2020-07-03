import Premios from '../models/Premios';
import { Op } from 'sequelize';

class PremiosController {
  async store(req, res) {
    try {
      const {
        nome,
        descricao,
        data_inicio,
        data_fim,
        pontos,
        data_hora,
      } = req.body;
      console.log(nome, descricao, data_inicio, data_fim, pontos, data_hora);
      const premios = await Premios.create({
        nome,
        descricao,
        data_inicio,
        data_fim,
        pontos,
        data_hora,
      });

      return res.send(premios);
    } catch (error) {
      return res.status(400).send({ error, message: error.message });
    }
  }

  async index(req, res) {
    try {
      const { premio_id } = req.params;
      const dados = await Premios.findByPk(premio_id, {
        attributes: [
          'id',
          'nome',
          'descricao',
          'data_inicio',
          'data_fim',
          'pontos',
        ],
      });

      return res.json(dados);
    } catch (error) {
      return res.status(400).send({ error, message: error.message });
    }
  }

  async show(req, res) {
    try {
      const dataAgora = new Date();
      const dados = await Premios.findAll({
        where: {
          data_inicio: { [Op.lte]: dataAgora },
          data_fim: { [Op.gte]: dataAgora },
        },
        attributes: ['id', 'nome', 'descricao', 'data_fim', 'pontos'],
      });

      return res.json(dados);
    } catch (error) {
      return res.status(400).send({ error, message: error.message });
    }
  }
}

export default new PremiosController();

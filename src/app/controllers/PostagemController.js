import Curtida from '../models/Curtidas';
import Comentarios from '../models/Comentarios';
import User from '../models/User';
import Postagens from '../models/Postagens';

class PostagemController {
  async Show(req, res) {
    try {
      const dados = await Postagens.findAll({
        attributes: ['id', 'texto'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name'],
          },
          {
            model: Curtida,
            as: 'curtidas',
            attributes: ['id', 'data_hora'],
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'name'],
              },
            ],
          },
          {
            model: Comentarios,
            as: 'comentarios',
            attributes: ['id', 'data_hora', 'texto'],
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      });
      return res.json(dados);
    } catch (error) {
      return res.status(500).send(error.messagem);
    }
  }

  async store(req, res) {
    try {
      const { texto, user_id, tipo_id } = req.body;
      const { data_hora } = await Postagens.create({
        texto,
        user_id,
        tipo_id,
      });
      return res.send({ texto, user_id, data_hora });
    } catch (error) {
      return res.status(400).send({ error, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { postagen_id } = req.params;
      const postagem = await Postagens.findByPk(postagen_id);

      postagem.update(req.body);
      return res.send(postagem);
    } catch (error) {
      return res.status(400).send({ error, message: error.message });
    }
  }
}

export default new PostagemController();

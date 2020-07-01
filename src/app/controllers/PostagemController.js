import Postagens from '../models/Postagens';
import Curtida from '../models/Curtidas';
import User from '../models/User';

class PostagemController {
  async Show(req, res) {
    try {
      const dados = await Postagens.findAll({
        attributes: ['id', 'texto'],
        include: [
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
        ],
      });
      return res.json(dados);
    } catch (error) {
      return res.status(500).send(error.messagem);
    }
  }
}

export default new PostagemController();

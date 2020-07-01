import Postagens from '../models/Postagens';

class PostagemController {
  async Show(req, res) {
    try {
      const dados = await Postagens.findAll({
        attributes: ['id', 'texto'],
      });
      return res.json(dados);
    } catch (error) {
      return res.status(500).send(error.messagem);
    }
  }
}

export default new PostagemController();

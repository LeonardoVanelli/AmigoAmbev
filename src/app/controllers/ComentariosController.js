import Comentarios from '../models/Comentarios';

class ComentariosController {
  async store(req, res) {
    try {
      const { postagem_id, user_id, texto } = req.body;
      const { data_hora } = await Comentarios.create({
        postagem_id,
        user_id,
        texto,
      });
      return res.send({ postagem_id, user_id, data_hora, texto });
    } catch (error) {
      return res.status(400).send({ error, message: error.message });
    }
  }
}

export default new ComentariosController();

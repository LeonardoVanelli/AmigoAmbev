import Comentarios from '../models/Comentarios';

class TesteController {
  async store(req, res) {
    try {
      const tipoProcesso = await Comentarios.create({
        postagem_id: 1,
        user_id: 1,
        data_hora: new Date(),
        texto: 'Comentario de teste de postagem',
      });

      res.send({ tipoProcesso });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: 'Algo deu errado!', error: error.message });
    }
  }
}

export default new TesteController();

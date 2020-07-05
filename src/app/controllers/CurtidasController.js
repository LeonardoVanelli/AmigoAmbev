import Curtidas from '../models/Curtidas';

class CurtidasController {
  async store(req, res) {
    try {
      const { postagem_id, user_id } = req.body;

      const curdida = await Curtidas.findOne({
        where: { postagem_id, user_id },
      });
      if (!curdida) {
        const { data_hora } = await Curtidas.create({
          postagem_id,
          user_id,
        });
        return res.send({ postagem_id, user_id, data_hora });
      }

      await curdida.destroy();
      return res.send('Curtida excluida com sucesso');
    } catch (error) {
      return res.status(400).send({ error, message: error.message });
    }
  }
}

export default new CurtidasController();

import Curtidas from '../models/Curtidas';

class CurtidasController {
  async store(req, res) {
    try {
      const { curtindo } = req.body;
      const { postagem_id, user_id } = req.body;
      if (curtindo) {
        const { data_hora } = await Curtidas.create({
          postagem_id,
          user_id,
        });
        return res.send({ postagem_id, user_id, data_hora });
      }
      Curtidas.destroy({ where: { postagem_id, user_id } });

      return res.send('Postagem excluida com sucesso');
    } catch (error) {
      return res.status(400).send({ error, message: error.message });
    }
  }
}

export default new CurtidasController();

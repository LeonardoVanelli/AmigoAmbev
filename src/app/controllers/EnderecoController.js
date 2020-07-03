import Endereco from '../models/Endereco';
import User from '../models/User';

class EnderecoController {
  async store(req, res) {
    try {
      const { user_id } = req.body;
      const {
        pais,
        estado,
        cidade,
        bairro,
        rua,
        cartesiano_x,
        cartesiano_y,
      } = req.body;

      const user = await User.findByPk(user_id);
      const endereco = await Endereco.create({
        pais,
        estado,
        cidade,
        bairro,
        rua,
        cartesiano_x,
        cartesiano_y,
      });

      user.update({ endereco_id: endereco.id });
      return res.send(endereco);
    } catch (error) {
      return res.status(400).send({ error, message: error.message });
    }
  }
}

export default new EnderecoController();

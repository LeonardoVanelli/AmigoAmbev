import User from '../models/User';
import Endereco from '../models/Endereco';

class ProfileController {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      attributes: [
        'name',
        'email',
        'telefone',
        'pontos',
        'hash_code',
        'apelido',
        'created_at',
      ],
      include: [
        {
          model: Endereco,
          as: 'endereco',
          attributes: ['pais', 'estado', 'cidade', 'bairro', 'rua'],
        },
      ],
    });

    res.send({ user });
  }
}

export default new ProfileController();

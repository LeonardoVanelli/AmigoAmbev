import Atividades from '../models/Atividade';
import User from '../models/User';
import Premio from '../models/Premios';

class SolicitaBrindeController {
  async store(req, res) {
    const user = await User.findByPk(req.userId);

    const premio = await Premio.findByPk(req.body.premio_id, {
      attributes: ['id', 'nome', 'pontos'],
    });

    if (premio.pontos > user.pontos)
      return res
        .status(500)
        .send({ error: 'Pontos insuficientes para essa premiação' });

    await Atividades.create({
      tipo_processo_id: 4,
      usuario_id: user.id,
      validado: false,
      premio_id: premio.id,
    });

    return res.send(premio);
  }
}

export default new SolicitaBrindeController();

import { Op } from 'sequelize';

import Codigos from '../models/Codigo';
import Usuario from '../models/User';
import Atividade from '../models/Atividade';

class ConsumoController {
  async store(req, res) {
    const { noBar, usuario_id, hash_code } = req.body;
    const codigo = await Codigos.findOne({
      where: {
        hash_code,
        data_hora_utilizado: {
          [Op.eq]: null,
        },
      },
    });
    if (!codigo) return res.status(500).send('Código inválido');

    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) return res.status(500).send('Usuário não encontrado');

    if (!noBar) {
      codigo.update({
        usuario_utilizacao_id: usuario_id,
        data_hora_utilizado: new Date(),
      });

      await Atividade.update({
        tipo_processo_id: 2,
        usuario_id,
        validado: true,
      });
    }

    res.send(req.body);
  }
}

export default new ConsumoController();

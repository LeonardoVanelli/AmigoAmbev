import { startOfWeek } from 'date-fns';
import { Op } from 'sequelize';

import Atividades from '../models/Atividade';

class ConquistasController {
  async index(req, res) {
    const { user_id } = req.params;

    const startWeek = startOfWeek(new Date());
    const atividades = await Atividades.findAll({
      where: {
        usuario_id: user_id,
        created_at: { [Op.lte]: startWeek },
        tipo_processo_id: 2,
        validado: true,
      },
    });

    if (atividades.length > 6) await res.send(req.params);

    res.send({
      conquista: {
        nome: 'TOMADOR DE CANA',
        mensagem: 'Você tomou mais de 6 cervejas nos bares',
      },
    });
  }
}

export default new ConquistasController();

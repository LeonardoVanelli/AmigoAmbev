import { Op } from 'sequelize';

import Codigos from '../models/Codigo';
import Usuario from '../models/User';
import Atividade from '../models/Atividade';
import Bebida from '../models/Bebida';

class ConsumoController {
  async store(req, res) {
    try {
      const { noBar, usuario_id, hash_code } = req.body;
      const codigo = await Codigos.findOne({
        where: {
          hash_code,
          data_hora_utilizado: {
            [Op.eq]: null,
          },
        },
      });
      if (!codigo) return res.status(500).send({ error: 'Código inválido' });

      const usuario = await Usuario.findByPk(usuario_id, {
        attributes: ['id', 'name', 'pontos'],
      });
      if (!usuario)
        return res.status(500).send({ error: 'Usuário não encontrado' });

      if (!noBar) {
        await codigo.update({
          usuario_utilizacao_id: usuario_id,
          data_hora_utilizado: new Date(),
        });

        await Atividade.create({
          tipo_processo_id: 2,
          usuario_id,
          validado: true,
        });

        const bebida = await Bebida.findByPk(codigo.bebida_id, {
          attributes: ['pontos_comercio'],
        });

        usuario.update({
          pontos: usuario.pontos + bebida.pontos_comercio,
        });
      } else {
        await codigo.update({
          usuario_utilizacao_id: usuario_id,
          data_hora_utilizado: new Date(),
        });

        await Atividade.create({
          tipo_processo_id: 1,
          usuario_id,
          validado: false,
          bebida_id: codigo.bebida_id,
        });
      }

      return res.send({ usuario });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ConsumoController();

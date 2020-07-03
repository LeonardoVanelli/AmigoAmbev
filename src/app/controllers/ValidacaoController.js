import User from '../models/User';
import Estabelecimento from '../models/Estabelecimento';
import Atividade from '../models/Atividade';
import Bebida from '../models/Bebida';

class ValidacaoController {
  async store(req, res) {
    const { user_hash, estabelecimento_id } = req.body;

    try {
      const usuario = await User.findOne({
        where: { hash_code: user_hash },
      });
      if (!usuario)
        return res
          .status(500)
          .send({ error: 'QRCode do usuário não encontrado' });

      const estabelecimento = await Estabelecimento.findByPk(
        estabelecimento_id
      );
      if (!estabelecimento)
        return res
          .status(500)
          .send({ error: 'Estabelecimento não encontrado' });

      const atividades = await Atividade.findAll({
        where: {
          validado: false,
          usuario_id: usuario.id,
          tipo_processo_id: 1,
        },
        include: [
          {
            model: Bebida,
            as: 'bebida',
            attributes: ['pontos_bar'],
          },
        ],
      });

      if (atividades.length === 0)
        return res.status(500).send({ error: 'Nenhuma bebida foi consumida' });

      let pontos = 0;

      await atividades.map(atividade => {
        atividade.update({
          validado: true,
        });
        pontos += atividade.bebida.pontos_bar;
        return null;
      });

      await Atividade.create({
        tipo_processo_id: 3,
        estabelecimento_id,
        usuario_id: usuario.id,
        validado: true,
      });

      await usuario.update({
        pontos: usuario.pontos + pontos,
      });

      await estabelecimento.update({
        pontos: estabelecimento.pontos + pontos,
      });

      return res.send({
        usuario: {
          id: usuario.id,
          name: usuario.nome,
          pontos: usuario.pontos,
          apelido: usuario.apelido,
        },
        CervejasCadastradas: atividades.length,
        pontosArrecadados: pontos,
      });
    } catch (error) {
      return res.status(500).send({ error: 'Algo deu errado' });
    }
  }

  async index(req, res) {
    try {
      const { user_hash } = req.params;
      console.log(user_hash);

      const usuario = await User.findOne({
        where: { hash_code: user_hash },
        attributes: ['id', 'name'],
      });
      if (!usuario)
        return res
          .status(500)
          .send({ error: 'QRCode do usuário não encontrado' });

      const atividades = await Atividade.findAll({
        where: {
          validado: false,
          usuario_id: usuario.id,
          tipo_processo_id: 1,
        },
        include: [
          {
            model: Bebida,
            as: 'bebida',
            attributes: ['pontos_bar'],
          },
        ],
      });

      if (atividades.length === 0)
        return res.status(500).send({ error: 'Nenhuma bebida foi consumida' });

      let pontosParaReceber = 0;

      atividades.map(atividade => {
        pontosParaReceber += atividade.bebida.pontos_bar;
        return null;
      });

      const bebidasConsumidas = atividades.length;

      return res.send({ usuario, bebidasConsumidas, pontosParaReceber });
    } catch (error) {
      return res
        .status(500)
        .send({ error: 'Algo deu errado', messagem: error.messagem });
    }
  }
}

export default new ValidacaoController();

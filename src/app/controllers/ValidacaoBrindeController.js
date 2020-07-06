import Atividade from '../models/Atividade';
import User from '../models/User';
import Premio from '../models/Premios';
import Estabelecimento from '../models/Estabelecimento';

class ValidacaoBrindeController {
  async store(req, res) {
    try {
      const { user_hash } = req.body;

      const estabelecimento = await Estabelecimento.findOne({
        responsavel_id: req.userId,
      });
      if (!estabelecimento)
        return res.status(500).send({
          error: 'Somente estabelecimentos podem fazer essa solicitação',
        });

      const user = await User.findOne({
        where: { hash_code: user_hash },
        attributes: ['id', 'name', 'pontos'],
      });
      if (!user)
        return res.status(500).send({ error: 'Usuário não encontrado' });

      const atividade = await Atividade.findOne({
        where: { usuario_id: user.id, validado: false, tipo_processo_id: 4 },
      });
      if (!atividade)
        return res
          .status(500)
          .send({ error: 'Usário não solicitou retirada de brinde' });

      const premio = await Premio.findByPk(atividade.premio_id, {
        attributes: ['nome', 'descricao', 'id', 'pontos'],
      });

      if (premio.pontos > user.pontos)
        return res
          .status(500)
          .send({ error: 'Pontos insuficientes para essa premiação' });

      await atividade.update({
        validado: true,
        estabelecimento_id: estabelecimento.id,
      });

      await user.update({
        pontos: user.pontos - premio.pontos,
      });

      await estabelecimento.update({
        pontos: estabelecimento.pontos + premio.pontos,
      });

      res.send({ user, premio });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

export default new ValidacaoBrindeController();

import Estabelecimento from '../models/Estabelecimento';

class RankingBarController {
  async show(req, res) {
    const estabelecimentos = await Estabelecimento.findAll({
      order: [['pontos', 'desc']],
      limit: 10,
      attributes: ['id', 'nome', 'pontos'],
    });

    const estabelecimento = await Estabelecimento.findOne({
      where: { responsavel_id: req.userId },
    });

    if (estabelecimento) {
      const finallEstabelecimento = estabelecimentos.find(estabel => {
        return estabel.id === estabelecimento.id;
      });

      const todasEmpresas = await Estabelecimento.findAll({
        order: [['pontos', 'desc']],
      });

      let posicao = 0;
      todasEmpresas.find(empresaUtilizado => {
        // eslint-disable-next-line no-plusplus
        posicao++;
        return empresaUtilizado.id === estabelecimento.id;
      });

      if (!finallEstabelecimento) {
        return res.send({
          estabelecimento: {
            id: estabelecimento.id,
            nome: estabelecimento.nome,
            pontos: estabelecimento.pontos,
            posicao,
          },
          rank: estabelecimentos,
        });
      }
    }

    return res.send({ rank: estabelecimentos });
  }
}

export default new RankingBarController();

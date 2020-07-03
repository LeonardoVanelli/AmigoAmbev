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
    }

    return res.send(estabelecimentos);
  }
}

export default new RankingBarController();

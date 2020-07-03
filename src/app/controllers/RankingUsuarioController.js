import User from '../models/User';

class RankingUsuarioController {
  async show(req, res) {
    const users = await User.findAll({
      order: [['pontos', 'desc']],
      limit: 10,
      attributes: ['id', 'name', 'pontos'],
    });

    const finallUser = users.find(user => user.id === req.userId);

    if (!finallUser) {
      const user = await User.findByPk(req.userId, {
        attributes: ['id', 'name', 'pontos'],
      });
      return res.send({ user, rank: users, finallUser });
    }

    return res.send({ rank: users });
  }
}

export default new RankingUsuarioController();

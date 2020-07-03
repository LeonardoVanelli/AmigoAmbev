import User from '../models/User';

class RankingUsuarioController {
  async show(req, res) {
    try {
      const users = await User.findAll({
        order: [['pontos', 'desc']],
        limit: 10,
        attributes: ['id', 'name', 'pontos'],
      });

      const finallUser = users.find(user => {
        return user.id === req.userId;
      });

      if (!finallUser) {
        const user = await User.findByPk(req.userId, {
          attributes: ['id', 'name', 'pontos'],
        });

        const todosUsuarios = await User.findAll({
          order: [['pontos', 'desc']],
        });
        let posicao = 0;
        todosUsuarios.find(userUtilizado => {
          posicao++;
          return userUtilizado.id === req.userId;
        });

        return res.send({
          user: { id: user.id, name: user.name, pontos: user.pontos, posicao },
          posicao,
          rank: users,
        });
      }

      return res.send({ rank: users });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.messagem);
    }
  }
}

export default new RankingUsuarioController();

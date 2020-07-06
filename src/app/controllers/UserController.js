import User from '../models/User';
import File from '../models/File';
import Estabelecimento from '../models/Estabelecimento';

import StoreSessionService from '../services/StoreSessionService';

class UserController {
  async store(req, res) {
    try {
      const existentUser = await User.findOne({
        where: { email: req.body.email },
      });

      if (existentUser) {
        return res.status(400).json({ error: 'email is already in use' });
      }
      const { email, id } = await User.create(req.body);

      if (req.body.bar) {
        await Estabelecimento.create({
          nome: 'bar',
          telefone: '',
          endereco_id: 1,
          responsavel_id: id,
        });
      }

      const session = await StoreSessionService.run({
        email,
        password: req.body.password,
      });

      return res.json(session);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  async update(req, res) {
    try {
      const { email, oldPassword } = req.body;

      const user = await User.findByPk(req.userId);

      if (email && user.email !== email) {
        const existentUser = await User.findOne({
          where: { email },
        });
        if (existentUser)
          return res.status(400).json({ error: 'email is already in use' });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword)))
        res.status(401).json('Passoword does not match');
      await user.update(req.body);

      const {
        id,
        name,
        avatar,
        apelido,
        cpf,
        email: nemail,
      } = await User.findByPk(req.userId, {
        include: [
          { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
        ],
      });

      return res.json({ id, name, nemail, avatar, apelido, cpf });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }

  async validaEmail(req, res) {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (user) return res.status(500).send({ error: 'E-mail já está em uso' });

    return res.send({ email });
  }
}

export default new UserController();

import User from '../models/User';
import File from '../models/File';
import Cache from '../../lib/Cache';

class UserController {
  async store(req, res) {
    try {
      const existentUser = await User.findOne({
        where: { email: req.body.email },
      });

      if (existentUser) {
        return res.status(400).json({ error: 'email is already in use' });
      }
      const { id, name, email, provider } = await User.create(req.body);

      if (provider) Cache.invalidade('providers');

      return res.json({ id, name, email, provider });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (user.email !== email) {
      const existentUser = await User.findOne({ where: { email } });
      if (existentUser)
        return res.status(400).json({ error: 'email is already in use' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword)))
      res.status(401).json('Passoword does not match');

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    return res.json({ id, name, email, avatar });
  }
}

export default new UserController();

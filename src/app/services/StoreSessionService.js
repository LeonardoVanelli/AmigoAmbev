import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class StoreSessionService {
  async run({ email, password }) {
    const user = await User.findOne({
      where: { email },
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    if (!user) throw new Error('user not found');

    if (!(await user.checkPassword(password)))
      throw new Error('Passoword does not match');

    const { id, name, avatar, provider, apelido, bar } = user;

    const session = {
      user: {
        id,
        name,
        email,
        provider,
        avatar,
        apelido,
        bar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };
    return session;
  }
}

export default new StoreSessionService();

import { Op } from 'sequelize';

import File from '../models/File';
import User from '../models/User';

class FiltroUserController {
  async show(req, res) {
    const { filtro } = req.query;
    try {
      const users = await User.findAll({
        where: { name: { [Op.iLike]: `%${filtro}%` } },
        attributes: ['id', 'name', 'bar'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'url', 'path'],
          },
        ],
      });

      res.send(users);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
}

export default new FiltroUserController();

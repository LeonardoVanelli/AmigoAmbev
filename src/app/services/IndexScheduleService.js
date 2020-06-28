import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

import Appointment from '../models/Appointment';
import User from '../models/User';

class IndexScheduleService {
  async run({ user_id, date }) {
    const checkUserProvider = await User.findOne({
      where: {
        id: user_id,
        provider: true,
      },
    });

    if (!checkUserProvider) throw new Error('User is not provider');

    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: user_id,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: ['date'],
    });
    return appointments;
  }
}

export default new IndexScheduleService();

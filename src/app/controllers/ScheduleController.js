import createScheduleService from '../services/IndexScheduleService';

class ScheduleController {
  async index(req, res) {
    const { date } = req.query;

    const appointments = await createScheduleService.run({
      user_id: req.userId,
      date,
    });

    res.json(appointments);
  }
}

export default new ScheduleController();

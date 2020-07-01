import StoreSessionService from '../services/StoreSessionService';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const session = await StoreSessionService.run({
      email,
      password,
    });

    res.json(session);
  }
}

export default new SessionController();

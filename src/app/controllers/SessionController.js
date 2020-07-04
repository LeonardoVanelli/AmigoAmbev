import StoreSessionService from '../services/StoreSessionService';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      const session = await StoreSessionService.run({
        email,
        password,
      });

      res.json(session);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default new SessionController();

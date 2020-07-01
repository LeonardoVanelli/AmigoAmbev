import Codigo from '../models/Codigo';

class TesteController {
  async store(req, res) {
    try {
      const tipoProcesso = await Codigo.create({
        bebida_id: 1,
      });

      res.send({ tipoProcesso });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: 'Algo deu errado!', error: error.message });
    }
  }
}

export default new TesteController();

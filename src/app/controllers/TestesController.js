import Teste from '../models/EstabelecimentoBebidas';

class TesteController {
  async store(req, res) {
    try {
      const teste = await Teste.create({
        valor: 29.9,
        estabelecimento_id: 1,
        bebida_id: 1,
      });

      res.send(teste);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Algo deu errado!', error });
    }
  }
}

export default new TesteController();

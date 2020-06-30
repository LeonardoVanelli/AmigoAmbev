import Teste from '../models/Estabelecimento';

class TesteController {
  async store(req, res) {
    try {
      const teste = await Teste.create({
        nome: 'Bar',
        telefone: '4799119498',
        endereco_id: 1,
        responsavel_id: 1,
      });

      res.send(teste);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Algo deu errado!', error });
    }
  }
}

export default new TesteController();

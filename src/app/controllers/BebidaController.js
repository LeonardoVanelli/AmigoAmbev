import bebida from '../models/Bebida';

class BebidaController {
  async Show(req, res) {
    try {
      const dados = await bebida.findAll({
        attributes: ['id', 'nome', 'pontos_bar', 'pontos_comercio'],
      });
      return res.json(dados);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
export default new BebidaController();

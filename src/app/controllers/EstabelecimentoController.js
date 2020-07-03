import Endereco from '../models/Endereco';
import Estabelecimento from '../models/Estabelecimento';
import User from '../models/User';

class EstabelecimentoController {
  async store(req, res) {
    try {
      const { nome, telefone, endereco_id, responsavel_id } = req.body;
      const estabelecimento = await Estabelecimento.create({
        nome,
        telefone,
        endereco_id,
        responsavel_id,
      });

      return res.send(estabelecimento);
    } catch (error) {
      return res.status(400).send({ error, message: error.message });
    }
  }

  async index(req, res) {
    try {
      const { estabelecimento_id } = req.params;
      const dados = await Estabelecimento.findByPk(estabelecimento_id, {
        attributes: ['id', 'nome', 'telefone', 'pontos'],
        include: [
          {
            model: Endereco,
            as: 'endereco',
            attributes: [
              'pais',
              'estado',
              'cidade',
              'bairro',
              'rua',
              'cartesiano_x',
              'cartesiano_y',
            ],
          },
          {
            model: User,
            as: 'responsavel',
            attributes: ['name', 'email', 'telefone', 'pontos', 'apelido'],
          },
        ],
      });

      return res.json(dados);
    } catch (error) {
      return res.status(400).send({ error, message: error.message });
    }
  }
}

export default new EstabelecimentoController();

import Atividade from '../models/Atividade';
import TipoProcesso from '../models/TiposProcesso';

class TesteController {
  async store(req, res) {
    try {
      const tipoProcesso = await TipoProcesso.create({
        nome: 'Cadastro bebida mercado',
        descricao: 'Ao comprar bebida em um mercado',
        validado: true,
      });

      const atividade = await Atividade.create({
        tipo_processo_id: 1,
        estamelecimento_id: 1,
        bebida_id: 1,
        usuario_id: 2,
      });

      res.send({ tipoProcesso, atividade });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: 'Algo deu errado!', error: error.message });
    }
  }
}

export default new TesteController();

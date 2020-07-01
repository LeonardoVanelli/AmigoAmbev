import Codigo from '../models/Codigo';
import Bebida from '../models/Bebida';

class CodigoController {
  async store(req, res) {
    const { bebida_id, quantidade } = req.body;
    const codigos = [];

    try {
      const bebida = await Bebida.findOne({
        where: { id: bebida_id },
        attributes: ['id', 'nome'],
      });

      if (!bebida)
        return res.status(400).json({ error: 'Bebida não cadastrada' });

      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < quantidade; index++) {
        // eslint-disable-next-line no-await-in-loop
        const { hash_code } = await Codigo.create({
          bebida_id,
        });

        codigos.push(hash_code);
      }

      return res.send({ bebida, codigos });
    } catch (error) {
      return res.status(400).send({ error, message: error.message });
    }
  }
}

export default new CodigoController();

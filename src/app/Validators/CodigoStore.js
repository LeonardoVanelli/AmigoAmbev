import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      bebida_id: Yup.number().required(),
      quantidade: Yup.number().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation failure', messages: error.inner });
  }
};

const { readJson } = require('../utils/readAndWriteJson');

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return next({ status: 400, message: 'O campo "age" é obrigatório' });

  next();
};

const searchId = async (req, res, next) => {
  const { id } = req.params;
  const data = await readJson();
  const findId = data.find((item) => item.id === Number(id));
  if (!findId) return next({ status: 404, message: 'Pessoa palestrante não encontrada' });
  next();
};

module.exports = {
  validateAge,
  searchId,
};
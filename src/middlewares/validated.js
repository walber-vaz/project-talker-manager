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

// const validateToken = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) return next({ status: 401, message: 'Token não encontrado' });
//   if (authorization.length !== 16 && typeof authorization !== 'string') {
//     return next({ status: 401, message: 'Token inválido' });
//   }
//   next();
// };

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!email) return next({ status: 400, message: 'O campo "email" é obrigatório' });
  if (!regex.test(email)) {
    return next({ 
      status: 400, message: 'O "email" deve ter o formato "email@email.com"', 
    }); 
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return next({ status: 400, message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return next({
      status: 400, message: 'O "password" deve ter pelo menos 6 caracteres',
    }); 
  }
  next();
};

module.exports = {
  validateAge,
  searchId,
  validateEmail,
  validatePassword,
};
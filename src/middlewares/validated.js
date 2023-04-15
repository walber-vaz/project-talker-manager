const { readJson } = require('../utils/readAndWriteJson');

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return next({ status: 400, message: 'O campo "age" é obrigatório' });
  if (!Number.isInteger(age) || age < 18) {
    return next({ 
      status: 400, 
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18', 
    });
  }
  next();
};

const searchId = async (req, res, next) => {
  const { id } = req.params;
  const data = await readJson();
  const findId = data.find((item) => item.id === Number(id));
  if (!findId) return next({ status: 404, message: 'Pessoa palestrante não encontrada' });
  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next({ status: 401, message: 'Token não encontrado' });
  if (authorization.length !== 16) {
    return next({ status: 401, message: 'Token inválido' });
  }
  next();
};

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

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return next({ status: 400, message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return next({
      status: 400, message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (!watchedAt) return next({ status: 400, message: 'O campo "watchedAt" é obrigatório' });
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(watchedAt)) {
    return next({
      status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) return next({ status: 400, message: 'O campo "rate" é obrigatório' });
  if (rate <= 0 || rate > 5) {
    return next({
      status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  if (!Number.isInteger(rate)) {
    return next({
      status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return next({ status: 400, message: 'O campo "talk" é obrigatório' });  
  next();
};

const validateRateQuery = (req, res, next) => {
  const { rate } = req.query;

  if (rate !== undefined && (!Number.isInteger(Number(rate)) 
    || Number(rate) < 1 
    || Number(rate) > 5)) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5', 
    });
  }

  next();
};

const validateDateQuery = (req, res, next) => {
  const { date } = req.query;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (date && !regex.test(date)) {
    return res.status(400).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const validateRateBody = (req, res, next) => {
  const { rate } = req.body;
  if (rate === undefined) return next({ status: 400, message: 'O campo "rate" é obrigatório' });
  if (rate <= 0 || rate > 5 || !Number.isInteger(rate)) {
    return next({
      status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

module.exports = {
  validateAge,
  searchId,
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateTalk,
  validateWatchedAt,
  validateRate,
  validateRateQuery,
  validateDateQuery,
  validateRateBody,
};
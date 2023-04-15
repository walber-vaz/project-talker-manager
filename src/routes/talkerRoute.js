const { Router } = require('express');
const { readJson, writeJson } = require('../utils/readAndWriteJson');
const { 
  searchId,
  validateToken,
  validateAge,
  validateName,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('../middlewares/validated');

const routes = new Router();

routes.get('/', async (_req, res) => {
  const data = await readJson();
  return res.status(200).json(data);
});

const middlewares = [
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
];
routes.post('/', middlewares, async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await readJson();
  const id = data[data.length - 1].id + 1;
  const newData = [...data, { id, name, age, talk }];
  await writeJson(newData);
  return res.status(201).json({ id, name, age, talk });
});

routes.get('/:id', searchId, async (req, res) => {
  const { id } = req.params;
  const data = await readJson();
  const findId = data.find((item) => item.id === Number(id));
  return res.status(200).json({ ...findId });
});

module.exports = routes;
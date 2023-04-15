const { Router } = require('express');
const { readJson } = require('../utils/readAndWriteJson');
const { searchId } = require('../middlewares/validated');

const routes = new Router();

routes.get('/', async (_req, res) => {
  const data = await readJson();
  return res.status(200).json(data);
});

routes.get('/:id', searchId, async (req, res) => {
  const { id } = req.params;
  const data = await readJson();
  const findId = data.find((item) => item.id === Number(id));
  return res.status(200).json({ ...findId });
});

module.exports = routes;
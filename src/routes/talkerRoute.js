const { Router } = require('express');
const { readJson } = require('../utils/readAndWriteJson');

const routes = new Router();

routes.get('/', async (_req, res) => {
  const data = await readJson();
  return res.status(200).json(data);
});

module.exports = routes;
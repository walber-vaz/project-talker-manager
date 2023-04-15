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
  validateRateQuery,
  validateDateQuery,
  validateRateBody,
} = require('../middlewares/validated');
const { getAll } = require('../db');

const routes = new Router();

function searchFilter(data, q, rate, date) {
  const filters = [
    { validate: (item) => item.name.toLowerCase().includes(q.toLowerCase()), value: q },
    { validate: (item) => item.talk.rate === Number(rate), value: rate },
    { validate: (item) => item.talk.watchedAt === date, value: date },
  ];

  const filteredData = data.filter((item) =>
    filters.every((filter) => (filter.value ? filter.validate(item) : true)));

  return filteredData;
}

routes.get('/search', validateToken, validateRateQuery, validateDateQuery, async (req, res) => {
  const { q, rate, date } = req.query;
  const data = await readJson();
  const params = {
    q,
    rate,
    date,
    data,
  };
  const search = searchFilter(params.data, params.q, params.rate, params.date);
  return res.status(200).json(search);
});

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

routes.get('/db', async (_req, res) => {
  try {
    const [data] = await getAll();
    const newData = data.map((item) => ({
      id: item.id,
      name: item.name,
      age: item.age,
      talk: {
        watchedAt: item.talk_watched_at,
        rate: item.talk_rate,
      },
    }));
    await writeJson(newData);
    return res.status(200).json(newData);
  } catch (err) {
    return res.sendStatus(500);
  }
});

routes.get('/:id', searchId, async (req, res) => {
  const { id } = req.params;
  const data = await readJson();
  const findId = data.find((item) => item.id === Number(id));
  return res.status(200).json({ ...findId });
});

routes.put('/:id', middlewares, searchId, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const data = await readJson();
  const talker = data.find((item) => item.id === Number(id));
  const newTalker = {
    id: Number(id),
    name,
    age,
    talk,
  };
  const newData = data.map((item) => (item.id === talker.id ? newTalker : item));
  await writeJson(newData);
  return res.status(200).json(newTalker);
});

routes.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const data = await readJson();
  const newData = data.filter((item) => item.id !== Number(id));
  await writeJson(newData);
  return res.status(204).json();
});

routes.patch('/rate/:id', validateToken, validateRateBody, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const data = await readJson();
  const talker = data.find((item) => item.id === Number(id));
  const newTalker = {
    ...talker,
    talk: {
      ...talker.talk,
      rate,
    },
  };
  const newData = data.map((item) => (item.id === talker.id ? newTalker : item));
  await writeJson(newData);
  return res.sendStatus(204);
});

module.exports = routes;
const express = require('express');
const { talkerRoute } = require('./routes');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRoute);

app.use((err, _req, res, _next) => res.status(err.status || 500).json({ message: err.message }));

app.listen(PORT, () => {
  console.log('Online');
});

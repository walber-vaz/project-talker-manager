const { Router } = require('express');
const { randomBytes } = require('crypto');
const { validateEmail, validatePassword } = require('../middlewares/validated');

const routes = new Router();

routes.post('/', validateEmail, validatePassword, async (req, res) => {
  const { email, password } = req.body;
  const token = randomBytes(8).toString('hex');
  if (email && password) return res.status(200).json({ token });
});

module.exports = routes;
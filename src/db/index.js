const connection = require('./connection');

const getAll = async () => connection.execute('SELECT * FROM talkers');

module.exports = {
  getAll,
};
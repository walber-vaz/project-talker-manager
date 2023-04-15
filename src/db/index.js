const connection = require('./connection');

const getAll = async () => {
  const data = await connection.execute('SELECT * FROM talkers;');
  return data;
}

module.exports = {
  getAll,
};
const fs = require('fs').promises;
const { resolve } = require('path');

const pathJson = resolve(__dirname, '..', 'talker.json');

const readJson = async () => {
  const data = await fs.readFile(pathJson, { encoding: 'utf-8' });
  const isData = JSON.parse(data || '[]');
  return isData;
};

const writeJson = async () => {
  const passData = await readJson();
  const data = JSON.stringify(passData, null, 2, { encoding: 'utf-8' });
  await fs.writeFile(pathJson, data);
};

module.exports = {
  readJson,
  writeJson,
};
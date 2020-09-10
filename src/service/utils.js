'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`);
const utility = require(`util`);
const readFile = utility.promisify(fs.readFile);
const logger = require(`../logger`);

const getRandomInt = (inputMin, inputMax) => {
  const min = Math.ceil(inputMin);
  const max = Math.floor(inputMax);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  const resultArray = array.slice();
  for (let i = resultArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [resultArray[i], resultArray[randomPosition]] = [resultArray[randomPosition], resultArray[i]];
  }

  return resultArray;
};

const readContent = async (filePath) => {
  try {
    const content = await readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    logger.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  getRandomInt,
  shuffle,
  readContent,
};

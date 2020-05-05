'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`);
const util = require(`util`);
const {getRandomInt, shuffle} = require(`../../utils`);
const titles = require(`./content/titles.json`);
const categories = require(`./content/categories.json`);
const textСhunks = require(`./content/text-chunks.json`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

const CategorySizeRestrict = {
  MIN: 1,
  MAX: Math.min(3, categories.length),
};
const AnnounceRestrict = {
  MIN: 1,
  MAX: 5,
};
const FullTextRestrict = {
  MIN: 1,
};
const THREE_MONTHS = 3 * 30 * 24 * 60 * 60 * 1000;

const generateCategories = (count) => shuffle(categories).slice(0, count);
const getRandomSubList = (list = [], min = 0, max = list.length) => (
  shuffle(list).slice(0, getRandomInt(min, max))
);
const getRandomDate = (minTime, maxTime) => new Date(getRandomInt(minTime, maxTime));

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getRandomDate(Date.now() - THREE_MONTHS, Date.now()).toISOString(),
    announce: getRandomSubList(textСhunks, AnnounceRestrict.MIN, AnnounceRestrict.MAX).join(` `),
    fullText: getRandomSubList(textСhunks, FullTextRestrict.MIN).join(` `),
    category: generateCategories(getRandomInt(CategorySizeRestrict.MIN, CategorySizeRestrict.MAX)),
  }))
);

const writeFile = util.promisify(fs.writeFile);
const getOfferCount = (
    inputCount,
    defaultCount = 1,
    maxCount = 10,
) => {
  const count = Number.parseInt(inputCount, 10) || defaultCount;
  return (count < maxCount) ? count : maxCount;
};

module.exports = {
  name: `--generate`,
  description: `формирует файл mocks.json`,
  async run(count) {
    const countOffer = getOfferCount(count, DEFAULT_COUNT, MAX_COUNT);
    const content = JSON.stringify(generateOffers(countOffer), null, 2);

    await writeFile(FILE_NAME, content);
    console.info(chalk.green(`Operation success. File created.`));
  },
};

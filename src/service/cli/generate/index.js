'use strict';

const {nanoid} = require(`nanoid`);
const chalk = require(`chalk`);
const fs = require(`fs`);
const util = require(`util`);
const {
  getRandomInt,
  shuffle,
  readContent,
} = require(`../../utils`);


const {
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
} = require(`../../../constants`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

const MAX_ID_LENGTH = 6;

const CategorySizeRestrict = {
  MIN: 1,
  MAX: Math.min(3, 5),
};
const AnnounceRestrict = {
  MIN: 1,
  MAX: 5,
};
const FullTextRestrict = {
  MIN: 1,
};
const THREE_MONTHS = 3 * 30 * 24 * 60 * 60 * 1000;

const generateCategories = (count, categories) => shuffle(categories).slice(0, count);
const getRandomSubList = (list = [], min = 0, max = list.length) => (
  shuffle(list).slice(0, getRandomInt(min, max))
);
const getRandomDate = (minTime, maxTime) => new Date(getRandomInt(minTime, maxTime));
const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateOffers = (
  count,
  titles,
  categories,
  sentences,
  comments,
) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getRandomDate(Date.now() - THREE_MONTHS, Date.now()).toISOString(),
    announce: getRandomSubList(sentences, AnnounceRestrict.MIN, AnnounceRestrict.MAX).join(` `),
    fullText: getRandomSubList(sentences, FullTextRestrict.MIN).join(` `),
    category: generateCategories(
        getRandomInt(CategorySizeRestrict.MIN, CategorySizeRestrict.MAX),
        categories,
    ),
    comments: generateComments(getRandomInt(1, comments.length - 1), comments),
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
    try {
      const countOffer = getOfferCount(count, DEFAULT_COUNT, MAX_COUNT);
      const titles = await readContent(FILE_TITLES_PATH);
      const comments = await readContent(FILE_COMMENTS_PATH);
      const categories = await readContent(FILE_CATEGORIES_PATH);
      const sentences = await readContent(FILE_SENTENCES_PATH);

      const content = JSON.stringify(generateOffers(
          countOffer,
          titles,
          categories,
          sentences,
          comments,
      ), null, 2);

      await writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};

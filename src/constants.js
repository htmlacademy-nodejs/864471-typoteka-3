'use strict';

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;
const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  ExitCode,
};

'use strict';

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const USER_ARGV_INDEX = 2;
const MAX_ID_LENGTH = 6;
const DEFAULT_COMMAND = `--help`;
const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

API_PREFIX = `/api`;

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  ExitCode,
  HttpCode,
  MAX_ID_LENGTH,
  API_PREFIX,
};

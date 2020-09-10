'use strict';

const chalk = require(`chalk`);
const packageJson = require(`../../../package.json`);
const logger = require(`../../logger`);

module.exports = {
  name: `--version`,
  description: `выводит номер версии`,
  async run() {
    const {version} = packageJson;
    logger.info(chalk.blue(version));
  },
};

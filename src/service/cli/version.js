'use strict';

const chalk = require(`chalk`);
const packageJson = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  description: `выводит номер версии`,
  async run() {
    const {version} = packageJson;
    console.info(chalk.blue(version));
  },
};

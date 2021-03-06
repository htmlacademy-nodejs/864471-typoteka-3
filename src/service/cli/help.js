'use strict';

const chalk = require(`chalk`);
const version = require(`./version`);
const generate = require(`./generate`);
const server = require(`./server`);
const logger = require(`../../logger`);


const generateDescription = ({name, description}, props = []) => {
  const command = `${name} ${props.map((prop) => `<${prop}>`).join(` `)}`;
  return `${command.padEnd(20, ` `)} ${description}`;
};

module.exports = {
  name: `--help`,
  description: `печатает этот текст`,
  async run() {

    logger.info(chalk.grey(`
    Программа запускает http-сервер и формирует файл с данными для API.
      Гайд:
      server <command>

      Команды:
      ${generateDescription(version)}
      ${generateDescription(this)}
      ${generateDescription(generate, [`count`])}
      ${generateDescription(server, [`port`])}
    `));
  },
};

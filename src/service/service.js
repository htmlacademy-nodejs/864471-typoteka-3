'use strict';

const chalk = require(`chalk`);
const {Cli} = require(`./cli`);
const {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode,
} = require(`../constants`);
const logger = require(`../logger`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;


let result;
if (userArguments.length === 0 || !Cli[userCommand]) {
  result = Cli[DEFAULT_COMMAND].run();
} else {
  result = Cli[userCommand].run(...userArguments.slice(1));
}
result
  .catch((err) => {
    logger.error(chalk.red(err));
    process.exit(ExitCode.ERROR);
  });

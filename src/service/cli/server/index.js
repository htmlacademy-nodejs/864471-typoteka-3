'use strict';

const chalk = require(`chalk`);
const {API_PREFIX} = require(`../../../constants`);
const logger = require(`../../../logger`);
const postsRouter = require(`./api/posts-routers`);
const routes = require(`./api`);
const createServer = require(`./create-server`);

const DEFAULT_PORT = 3000;

const app = createServer(
  [`/posts`, postsRouter],
  [API_PREFIX, routes],
);


module.exports = {
  name: `--server`,
  description: `запускает сервер`,
  async run(customPort) {
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    app.listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return logger.error(chalk.red(`Ошибка при создании сервера`), err);
        }

        return logger.info(chalk.green(`Ожидаю соединений на ${port}`));
      });
  },
};

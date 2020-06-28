'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const {
  HttpCode,
  API_PREFIX,
} = require(`../../../constants`);
const postsRouter = require(`./api/posts-routers`);
const routes = require(`./api`);

const DEFAULT_PORT = 3000;

const app = express();
app.use(express.json());
app.use(`/posts`, postsRouter);
app.use(API_PREFIX, routes)
app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

app.use((err, req, res, _next) => res
  .status(HttpCode.INTERNAL_SERVER_ERROR)
  .send(`Internal server error`));


module.exports = {
  name: `--server`,
  description: `запускает сервер`,
  async run(customPort) {
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    app.listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return console.error(chalk.red(`Ошибка при создании сервера`), err);
        }

        return console.info(chalk.green(`Ожидаю соединений на ${port}`));
      });
  },
};

'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const express = require(`express`);
const postsRouter = require(`./routes/offers-routes`);

const DEFAULT_PORT = 3000;

const app = express();
app.use(express.json());
app.use(`/posts`, postsRouter);


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

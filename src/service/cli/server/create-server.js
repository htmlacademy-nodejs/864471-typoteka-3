'use strict';


const express = require(`express`);
const {HttpCode} = require(`../../../constants`);

const createServer = (...apiRouterList) => {
  const app = express();
  app.use((req, res, next) => {
    console.log(`Start request to url ${req.url}`);
    next();
    if (res.statusCode < 400) {
      console.log(`End request with status code ${res.statusCode}`);
    } else {
      console.error(`End request with error ${res.statusCode}`);
    }
  });
  app.use(express.json());
  apiRouterList.forEach(([
    path,
    router,
  ]) => app.use(path, router));

  app.use((req, res) => {
    res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found`);
  });

  app.use((err, req, res, _next) => res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .send(`Internal server error`));
  return app;
};

module.exports = createServer;

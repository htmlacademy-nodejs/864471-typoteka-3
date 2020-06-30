'use strict'

const {Router} = require(`express`);
const {HttpCode} = require(`../../../../constants`);

const router = new Router();

module.exports = (app, service) => {
  app.use(`/search`, router);

  router.get(`/`, (req, res) => {
    const {query} = req.query;

    if (!query) {
      res
        .status(HttpCode.BAD_REQUEST);
    }
    const articles = service.search(query);
    res
      .status(HttpCode.OK)
      .json(articles);
  });
}

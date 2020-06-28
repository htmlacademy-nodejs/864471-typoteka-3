'use strict';


const {Router} = require(`express`);
const {
  CategoryService,
  ArticleService,
} = require(`../data-service`);

const getMockData = require(`../../../lib/get-mock-data`);

const article = require(`./article`);

const router = new Router();

(async () => {
  const mockData = await getMockData();

  article(router, new ArticleService(mockData));
})();

module.exports = router;
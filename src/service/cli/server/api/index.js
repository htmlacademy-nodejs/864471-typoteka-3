'use strict';


const {Router} = require(`express`);
const {
  CategoryService,
  ArticleService,
  SearchService,
} = require(`../data-service`);

const getMockData = require(`../../../lib/get-mock-data`);

const article = require(`./article`);
const category = require(`./category`);
const search = require(`./search`);

const router = new Router();

(async () => {
  const mockData = await getMockData();

  article(router, new ArticleService(mockData));
  category(router, new CategoryService(mockData));
  search(router, new SearchService(mockData));
})();

module.exports = router;
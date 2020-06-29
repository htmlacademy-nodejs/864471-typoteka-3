'use strict';


const {Router} = require(`express`);
const {
  CategoryService,
  ArticleService,
  SearchService,
  CommentService,
} = require(`../data-service`);

const getMockData = require(`../../../lib/get-mock-data`);

const article = require(`./article`);
const category = require(`./category`);
const search = require(`./search`);
const comment = require(`./comment`);

const router = new Router();

(async () => {
  const mockData = await getMockData();

  article(router, new ArticleService(mockData));
  category(router, new CategoryService(mockData));
  search(router, new SearchService(mockData));
  comment(router, new ArticleService(mockData), new CommentService(mockData));
})();

module.exports = router;
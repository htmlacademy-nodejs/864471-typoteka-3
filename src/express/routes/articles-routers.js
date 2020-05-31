'use strict';

const {Router} = require(`express`);

const articlesRouters = new Router();


articlesRouters.get(`/category/:id`, (req, res) => res.send(`/articles/category/:id`));
articlesRouters.get(`/add`, (req, res) => res.send(`/articles/add`));
articlesRouters.get(`/edit/:id`, (req, res) => res.send(`articles/edit/:id`));
articlesRouters.get(`/:id`, (req, res) => res.send(`/articles/:id`));

module.exports = articlesRouters;

'use strict';

const {Router} = require(`express`);

const articlesRouters = new Router();


articlesRouters.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));
articlesRouters.get(`/add`, (req, res) => res.render(`new-post`));
articlesRouters.get(`/edit/:id`, (req, res) => res.render(`edit-post`));
articlesRouters.get(`/:id`, (req, res) => res.render(`post`));

module.exports = articlesRouters;

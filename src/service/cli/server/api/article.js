'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExist = require(`../middlewares/article-exist`);

const route = Router();

module.exports = (app, service) => {
  app.use(`/articles`, route);

  route.get('/', (req, res) => {
    const articles = service.findAll();

    res
      .status(HttpCode.OK)
      .json(articles);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = service.findOne(articleId);

    if (!article) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    res
      .status(HttpCode.OK)
      .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = req.body;

    const createdArticle = service.create(article);
    res
      .status(HttpCode.OK)
      .json(createdArticle);
  });

  route.put(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = req.body;

    const updatedArticle = service.update(articleId, article);

    if (!updatedArticle) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    res
      .status(HttpCode.OK)
      .json(updatedArticle);

  });

  route.delete(`/:articleId`, (req,res) => {
    const {articleId} = req.params;
    
    const deletedArticle = service.drop(articleId);

    if (!deletedArticle) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    res
      .status(HttpCode.OK)
      .json(deletedArticle);
  });

  route.get(`/:articleId/comments`, articleExist(service), (req, res) => {
    const {article} = res.locals;

    res
      .status(HttpCode.OK)
      .json(article.comments || []);
  });
  
  route.delete(`/:articleId/comments/:commentId`, (req, res) => {
    const {
      articleId,
      commentId,
    } = req.params;

    const comment = service.dropComment(articleId, commentId);
    if (!comment) {
      return res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found with ${articleId}`);
    }

    res
      .status(HttpCode.OK)
      .json(comment);
  });

  route.post(`/:articleId/comments`, (req, res) => {
    const {articleId} = req.params;
    const comment = req.body;

    const createdComment = service.createComment(articleId, comment);
    if (!createdComment) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    res
      .status(HttpCode.OK)
      .json(createdComment);
  });
}


'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExist = require(`../middlewares/article-exist`);

const route = Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
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

    const comment = commentService.drop(articleId, commentId);
    if (!comment) {
      return res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found with ${commentId}`);
    }

    res
      .status(HttpCode.OK)
      .json(comment);
  });

  route.post(`/:articleId/comments`, (req, res) => {
    const {articleId} = req.params;
    const comment = req.body;

    const createdComment = commentService.create(articleId, comment);
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


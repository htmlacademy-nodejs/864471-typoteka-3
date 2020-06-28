'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../../../constants`);


class ArticleService {
  constructor(articles = []) {
    this._data = articles;
  }

  findAll() {
    return this._data;
  }

  findOne(id) {
    return this._data.find((item) => item.id === id);
  }

  createComment(articleId, comment) {
    try {
      const article = this._data.find((item) => item.id === articleId);
      if (!article) {
        return null;
      }
  
      const newComment = {
        id: nanoid(MAX_ID_LENGTH),
        ...comment,
      }
      article.comments.push(newComment);
      return newComment;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  dropComment(articleId, commentId) {
    try {
      const article = this._data.find((item) => item.id === articleId);
      if (!article) {
        return null;
      }
  
      const comment = article.comments.find((item) => item.id === commentId);
      if (!comment) {
        return null;
      }
  
      article.comments = article.comments.filter((item) => item.id !== commentId);
      return comment;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  create(article) {
    const item = {
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
      ...article,
    };

    this._data.push(item);
    return item;
  }

  drop(id) {
    const item = this._data.find((item) => item.id === id);
    if (!item) {
      return null;
    }

    this._data = this._data.filter((item) => item.id !== id);
    return item;
  }

  update(id, article) {
    const oldArticle = this._data.find((item) => item.id === id);
    if (!oldArticle) {
      return null;
    }
    return Object.assign(oldArticle, article);
  }
}

module.exports = ArticleService;
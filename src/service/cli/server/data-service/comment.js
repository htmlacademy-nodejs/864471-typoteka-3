'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../../../constants`);


class CommentService {
  constructor(articles = []) {
    this._data = articles;
  }

  create(articleId, comment) {
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

  drop(articleId, commentId) {
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
}

module.exports = CommentService;
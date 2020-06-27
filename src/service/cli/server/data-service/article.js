'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../../constants`);


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
    return Object.assign(oldArticle, article);
  }
}

module.exports = ArticleService;
'use strict';

const titleStartWith = (text) => (article) => article.title && article.title.startsWith(text);

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  search(query) {
    const articles = this._articles.filter(titleStartWith(query));
    return articles;
  }
}

module.exports = SearchService;
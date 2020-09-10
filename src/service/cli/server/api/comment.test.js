'use strict';

const {Router} = require(`express`);
const request = require(`supertest`);
const createServer = require(`../create-server`);
const {CommentService, ArticleService} = require(`../data-service`);
const testData = require(`./test-data`);
const comment = require(`./comment`);


const router = new Router();
comment(router, new ArticleService(testData), new CommentService(testData));

const server = createServer([
  `/api`,
  router,
]);

const comments = [
  {
    "id": "mXbPua",
    "text": "С чем связана продажа? Почему так дешёво? А где блок питания? Вы что?! В магазине дешевле."
  },
  {
    "id": "voBheP",
    "text": "Продаю в связи с переездом. Отрываю от сердца."
  },
  {
    "id": "5jnya7",
    "text": "Совсем немного... Вы что?! В магазине дешевле."
  },
  {
    "id": "S8dMz1",
    "text": "Оплата наличными или перевод на карту? Неплохо, но дорого Продаю в связи с переездом. Отрываю от сердца."
  },
  {
    "id": "KPb_YO",
    "text": "С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии? А где блок питания?"
  },
  {
    "id": "r5RwLS",
    "text": "Почему в таком ужасном состоянии? Неплохо, но дорого"
  },
  {
    "id": "wzmI8g",
    "text": "Оплата наличными или перевод на карту? С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле."
  },
  {
    "id": "-25LF6",
    "text": "Неплохо, но дорого"
  }
];

describe(`Category API`, () => {
  it(`When get comments status code should be 200`, async () => {
    const res = await request(server).get(`/api/articles/Cuo5wx/comments`);
    expect(res.statusCode).toBe(200);
  });

  it(`When get comments response body should contains all comments`, async () => {
    const res = await request(server).get(`/api/articles/Cuo5wx/comments`);
    expect(res.body).toEqual(comments);
  });

  it(`When get comments from not exist offere status code should be 404`, async () => {
    const res = await request(server).get(`/api/articles/NOT_EXIST_ID/comments`);
    expect(res.statusCode).toBe(404);
  });

  it(`When comment was added status code should be 200`, async () => {
    const res = await request(server)
      .post(`/api/articles/Cuo5wx/comments`)
      .send({
        text: `Тестовый комментарий!`,
      })
      .set(`content-type`, `application/json`);
    expect(res.statusCode).toBe(200);
  });

  it(`When comment was added reponse body should contains new comment with id`, async () => {
    const res = await request(server)
      .post(`/api/articles/Cuo5wx/comments`)
      .send({
        text: `Тестовый комментарий!`,
      })
      .set(`content-type`, `application/json`);
    expect(res.body).toHaveProperty(`id`);
    expect(res.body).toHaveProperty(`text`, `Тестовый комментарий!`);
  })

  it(`If try to add comment to not exit offer status should be 404`, async () => {
    const res = await request(server)
      .post(`/api/articles/NOT_EXIT_OFFER/comments`)
      .send({
        text: `Тестовый комментарий!`,
      })
      .set(`content-type`, `application/json`);
    expect(res.statusCode).toBe(404);
  })
});

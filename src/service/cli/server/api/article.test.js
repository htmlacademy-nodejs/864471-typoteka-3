'use strict';

const {Router} = require(`express`);
const request = require(`supertest`);
const createServer = require(`../create-server`);
const {ArticleService} = require(`../data-service`);
const testData = require(`./test-data`);
const article = require(`./article`);


const router = new Router();
article(router, new ArticleService(testData));

const server = createServer([
  `/api`,
  router,
]);


describe(`Article API`, () => {
  it(`When get article status code should be 200`, async () => {
    const res = await request(server).get(`/api/articles`);
    expect(res.statusCode).toBe(200);
  });


  it(`when get existent article by id status code should be 200`, async () => {
    const res = await request(server).get(`/api/articles/hmRToo`);
    expect(res.statusCode).toBe(200);
  });

  it(`when get not existent article by id status code should be 404`, async () => {
    const res = await request(server).get(`/api/articles/NOT_EXITED_OFFER`);
    expect(res.statusCode).toBe(404);
  });

  it(`When article was added response body should contains new offer with id`, async () => {
    const res = await request(server)
      .post(`/api/articles`)
      .send({
          "title": "Окраина галактики 2",
          "createdDate": "2020-07-01T09:44:36.940Z",
          "announce": "TEST_ANNOUNCE",
          "fullText": "TEST_FULL_TEXT",
          "category": [
            "Медицина",
            "Разное",
            "За жизнь"
          ],
          "comments": [
            {
              "id": "GLaZZJ",
              "text": "А где блок питания? Неплохо, но дорого А сколько игр в комплекте?"
            }
          ]
        });
    expect(res.body).toHaveProperty(`id`);
    expect(res.body).toHaveProperty(`title`, `Окраина галактики 2`);
    expect(res.body).toHaveProperty(`createdDate`);
    expect(res.body).toHaveProperty(`announce`, `TEST_ANNOUNCE`);
    expect(res.body).toHaveProperty(`fullText`, `TEST_FULL_TEXT`);
    expect(res.body).toHaveProperty(`category`);
    expect(res.body).toHaveProperty(`comments`);
  });

  it(`When article was added status code should be 200`, async () => {
    const res = await request(server)
      .post(`/api/articles`)
      .send({
        "title": "Окраина галактики 2",
        "createdDate": "2020-07-01T09:44:36.940Z",
        "announce": "TEST_ANNOUNCE",
        "fullText": "TEST_FULL_TEXT",
        "category": [
          "Медицина",
          "Разное",
          "За жизнь"
        ],
        "comments": [
          {
            "id": "GLaZZJ",
            "text": "А где блок питания? Неплохо, но дорого А сколько игр в комплекте?"
          }
        ]
      });
    expect(res.statusCode).toBe(200);
  });

  it(`When article was updated status code should be 200 `, async () => {
    const res = await request(server)
      .put(`/api/articles/hmRToo`)
      .send({
        "title": "Уиии.... Как достигнуть успеха не вставая с кресла",
      });
      expect(res.statusCode).toBe(200);
  })

  it(`if try to update not existed article status code should be 404 `, async () => {
    const res = await request(server)
      .put(`/api/articles/NOT_EXITED_ARTICLE`)
      .send({
        "title": "Уиии.... Как достигнуть успеха не вставая с кресла",
      });
      expect(res.statusCode).toBe(404);
  })

  it(`When article was deleted status code should be 200 `, async () => {
    const res = await request(server)
      .delete(`/api/articles/hmRToo`);
      expect(res.statusCode).toBe(200);
  })

  it(`if try to delete not existed article status code should be 404 `, async () => {
    const res = await request(server)
      .delete(`/api/articles/NOT_EXITED_ARTICLE`);
      expect(res.statusCode).toBe(404);
  })
});

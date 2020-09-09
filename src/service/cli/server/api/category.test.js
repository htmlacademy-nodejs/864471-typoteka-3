
'use strict';

const {Router} = require(`express`);
const request = require(`supertest`);
const createServer = require(`../create-server`);
const {CategoryService} = require(`../data-service`);
const testData = require(`./test-data`);
const category = require(`./category`);


const router = new Router();
category(router, new CategoryService(testData));

const server = createServer([
  `/api`,
  router,
]);


describe(`Category API`, () => {
  it(`When get categories status code should be 200`, async () => {
    const res = await request(server).get(`/api/categories`);
    expect(res.statusCode).toBe(200);
  });
});

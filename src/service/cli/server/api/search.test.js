'use strict';

const {Router} = require(`express`);
const request = require(`supertest`);
const createServer = require(`../create-server`);
const {SearchService} = require(`../data-service`);
const testData = require(`./test-data`);
const search = require(`./search`);


const router = new Router();
search(router, new SearchService(testData));

const server = createServer([
  `/api`,
  router,
]);


describe(`Search API`, () => {
  it(`When send search request status code should be 200`, async () => {
    const res = await request(server).get(`/api/search`).query({query: `окраина`});
    expect(res.statusCode).toBe(200);
  });

  it(`When send search request WITHOUT query param status code should be 400`, async () => {
    const res = await request(server).get(`/api/search`);
    expect(res.statusCode).toBe(400);
  });
});

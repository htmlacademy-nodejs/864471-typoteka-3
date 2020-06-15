'use strict';

const {Router} = require(`express`);
const fs = require(`fs`).promises;
const {HttpCode} = require(`../../../../constants`);

const FILENAME = `mocks.json`;

const postsRouter = new Router();

postsRouter.get(`/`, async (req, res) => {
  try {

    const fileContent = await fs.readFile(FILENAME);
    if (fileContent.length) {
      const mocks = JSON.parse(fileContent);
      res.json(mocks);
    } else {
      res.json([]);
    }
  } catch (err) {
    if (err.code === `ENOENT`) {
      res.json([]);
    } else {
      res.status(HttpCode.INTERNAL_SERVER_ERROR);
      console.error(err);
    }
  }
});


module.exports = postsRouter;

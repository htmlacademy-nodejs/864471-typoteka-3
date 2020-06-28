const {HttpCode} = require(`../../../../constants`);

const articleKeys = [
  `title`,
  `createdDate`,
  `announce`,
  `fullText`,
  `category`,
];

module.exports = (req, res, next) => {
  const article = req.body;
  const keys = Object.keys(article);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
}
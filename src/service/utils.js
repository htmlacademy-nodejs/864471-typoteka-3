'use strict';

const getRandomInt = (inputMin, inputMax) => {
  const min = Math.ceil(inputMin);
  const max = Math.floor(inputMax);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  const resultArray = array.slice();
  for (let i = resultArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [resultArray[i], resultArray[randomPosition]] = [resultArray[randomPosition], resultArray[i]];
  }

  return resultArray;
};

module.exports = {
  getRandomInt,
  shuffle,
};

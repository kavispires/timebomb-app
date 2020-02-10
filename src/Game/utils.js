import _ from 'lodash';

/**
 * Asyncronous function that delays code when using with async/await
 * @param {number} seconds
 * @returns {Promise}
 */
const delay = (ms = 1) => new Promise((r, j) => setTimeout(r, ms * 1000)); // eslint-disable-line

/**
 * Shuffles lies
 * @param {array} array to be shuffled
 * @param {boolean} deepCopy flag determening it shuffling should be in place or create a new copy
 * @returns {array}
 */
const shuffle = (array, deepCopy = false) => {
  const arr = deepCopy ? _.cloneDeep(array) : array;

  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

/**
 * Selects random element from list
 * @param {array} array
 * @returns {any} random element
 */
const getRandomElement = array => array[Math.floor(Math.random() * array.length)];

/**
 * Selects unique random element that does not match given list
 * @param {array} array
 *  @param {array} reference the reference list to check if property is present
 *  @param {array} property specific property to do the unique comparison
 * @returns {any} random element not present in reference list
 */
const getUniqueElement = (array, reference, property) => {
  let result = null;
  while (!result) {
    const attempt = getRandomElement(array);

    const isRepeat = Boolean(
      _.find(reference, o => {
        if (property) {
          const ref = o[property] || o;
          const att = attempt[property] || attempt;
          return ref === att;
        }
        return o === attempt;
      })
    );

    if (!isRepeat) result = attempt;
  }

  return result;
};

/**
 * Selects random index from list length
 * @param {array} array
 * @returns {any}
 */
const getRandomIndex = array => Math.floor(Math.random() * array.length);

/**
 * Generates sequential stringifed number id
 * @param {array} array
 * @returns {string}
 */
const generateId = (function() {
  let lastId = 0;

  function g(prefix = '') {
    lastId++;
    return `${prefix}${lastId}`;
  }

  return g;
})();

export default {
  delay,
  generateId,
  getRandomElement,
  getRandomIndex,
  getUniqueElement,
  shuffle,
};

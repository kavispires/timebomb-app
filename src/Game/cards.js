// Generates sequential card id
const generateCardId = (function() {
  let lastId = 0;

  function g() {
    lastId++;
    return lastId;
  }

  return g;
})();

// Card Class
export class Card {
  constructor(value) {
    this.value = value;
    this.id = generateCardId();
  }
}

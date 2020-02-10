import utils from './utils';

// Card Class
export class Card {
  constructor(value) {
    this.value = value;
    this.id = utils.generateId();
    this.isFaceUp = false;
  }
}

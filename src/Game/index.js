import {
  CARDS,
  CHARACTER_CARDS_QUANTITY,
  COLORS,
  CPU_PLAYERS,
  INVESTIGATION_CARDS_QUANTITY,
} from './constants';
import utils from './utils';
import { Player, CPUPlayer } from './players';
import { Card } from './cards';

/**
 * SETUP
 * Determine Number of Players
 * Build Characters Deck and Shuffle
 * Deal Character to each player
 * Set each CPU Persona
 * Build Investigation Deck and Shuffle
 * Select Random First Player
 *
 * ROUND
 * Deal (X - round number) investigation cards to each player
 * Prompt player to select their declaration
 *

 */

const DEFAULT_DELAY = 0.1;

export default class GameEngine {
  constructor(appContext, initialState) {
    this._context = appContext;
    this._stage = null;
    this._player = null;
    this._players = [];
    this._message = '';
    this._roles = [];
    this._cards = [];
    this.deck = [];
    this.round = 0;

    this.applyInitialState(initialState);
  }

  get stage() {
    return this._stage;
  }

  get player() {
    return this._player;
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
    this.forceUpdate();
  }

  /**
   * Sets current state
   * @param value string
   */
  set stage(value) {
    this._stage = value;
    this.forceUpdate();
  }

  forceUpdate() {
    if (this._context) this._context.forceUpdate();
  }

  setStage(value) {
    this.stage = value;
  }

  setPlayerSettings(settings) {
    this._player = new Player(settings.name, settings.color, settings.gender);

    this._numPlayers = settings.numPlayers || 6;

    this.stage = 'setup';

    this.forceUpdate();

    this.setup();
  }

  async setup() {
    // Create CPU Player
    this.message = 'Inviting players for the game...';

    this._players.push(this._player);

    await utils.delay(DEFAULT_DELAY / 2);

    while (this._players.length < this._numPlayers) {
      const color = utils.getUniqueElement(COLORS, this._players, 'color');
      const cpu = utils.getUniqueElement(CPU_PLAYERS, this._players, 'name');
      this._players.push(new CPUPlayer(cpu.name, color, cpu.gender));
      this.message = `Inviting players for the game... ${this._players.length}/${this._numPlayers}`;
      await utils.delay(DEFAULT_DELAY / 4);
    }

    console.log(this._players);

    await utils.delay(DEFAULT_DELAY / 2);

    // Build Characters Deck and Shuffle
    this.message = 'Creating and suffling Roles deck...';

    const investigatorsCards = new Array(CHARACTER_CARDS_QUANTITY[this._numPlayers].investigators).fill(
      CARDS.INVESTIGATOR
    );
    const terroristsCards = new Array(CHARACTER_CARDS_QUANTITY[this._numPlayers].terrorists).fill(
      CARDS.TERRORIST
    );
    this._roles = Object.freeze([...investigatorsCards, ...terroristsCards]);

    const shuffledRoles = utils.shuffle(this._roles, true);
    console.log({ shuffledRoles });

    await utils.delay(DEFAULT_DELAY);

    //  Deal Character to each player, setting CPU Personas
    this.message = 'Dealing roles...';

    this._players.forEach((player, index) => {
      if (player.isCPU) {
        player.setAlignment(shuffledRoles[index]);
      } else {
        player.setRole(shuffledRoles[index]);
      }
    });

    console.log('players:', this._players);

    await utils.delay(DEFAULT_DELAY);

    //  Deal Character to each player, setting CPU Personas
    this.message = 'Creating and shuffling Investigation deck...';

    const blankCards = new Array(INVESTIGATION_CARDS_QUANTITY[this._numPlayers].blanks)
      .fill(null)
      .map(() => new Card(CARDS.BLANK));
    const fuseCards = new Array(INVESTIGATION_CARDS_QUANTITY[this._numPlayers].fuses)
      .fill(null)
      .map(() => new Card(CARDS.FUSE));
    const bombCards = new Array(INVESTIGATION_CARDS_QUANTITY[this._numPlayers].bombs)
      .fill(null)
      .map(() => new Card(CARDS.BOMB));

    this._cards = Object.freeze([...blankCards, ...fuseCards, ...bombCards]);
    this.deck = [...this._cards];

    console.log(this.deck);

    await utils.delay(DEFAULT_DELAY);

    //  Select Random First Player
    this.message = 'Randomly selecting lead investigator (first player)...';

    this.currentPlayerIndex = utils.getRandomIndex(this._players);

    await utils.delay(DEFAULT_DELAY / 2);

    this.message = 'Setup Complete!';

    await utils.delay(DEFAULT_DELAY);

    this.stage = 'round';

    this.startRound();
  }

  async startRound() {
    // Set round number
    this.round = this.round + 1;
    this.message = `Round ${this.round}`;
    await utils.delay(DEFAULT_DELAY);

    // Suffle deck
    this.message = `Dealing hands`;
    console.log('ARRAY?', Array.isArray(this.deck));
    const roundDeck = utils.shuffle(this.deck);
    console.log(roundDeck);
  }

  async endRound() {
    // Collect cards from players
  }

  applyInitialState(initialState) {
    console.log(initialState);
    // If Player
    if (initialState.player) {
      const { name, color, gender } = initialState.player;
      const { numPlayers } = initialState;
      this.setPlayerSettings({ name, color, gender, numPlayers });
    } else {
      if (initialState.stage) this.stage = initialState.stage;
      this.forceUpdate();
    }
  }
}

import utils from './utils';
import { ALIGNMENT_AXIS, CARDS, ALIGNMENTS } from './constants';

//
export class Player {
  constructor(name = 'Player', color = 'red', gender = 'any') {
    this.name = name;
    this.color = color;
    this.gender = gender;
    this.alignment = null;
    this.hand = [];
    this.role = null;
  }

  setRole(role) {
    this.role = role;
  }

  setHand(cards) {
    this.hand = cards;
  }
}

export class CPUPlayer extends Player {
  constructor(name, color, gender) {
    super(name, color, gender);
    this.alignment = null;
    this.isCPU = true;
    this.id = utils.generateId('cpu-');
    this.speech = 'Hi!';
    this.handStats = {
      bombs: 0,
      fuses: 0,
      blanks: 0,
      total: 0,
    };
    this.statementStats = {};
  }

  setAlignment(role) {
    const GvE = utils.getRandomElement(ALIGNMENT_AXIS.GvE);
    const LxC = utils.getRandomElement(ALIGNMENT_AXIS.LxC);

    this.alignment = [GvE, LxC];

    this.setRole(role);
  }

  setHand(cards) {
    this.hand = cards;
    this.analyseHand();
  }

  // Analyses Hand after getting hand
  analyseHand() {
    // Reset hand
    this.handStats = {
      bombs: 0,
      fuses: 0,
      blanks: 0,
      total: 0,
    };

    // console.log(`===${this.name}'s hand===`);
    this.hand.forEach(card => {
      if (card.value === CARDS.BLANK) this.handStats.blanks++;
      if (card.value === CARDS.FUSE) this.handStats.fuses++;
      if (card.value === CARDS.BOMB) this.handStats.bombs++;
    });
    this.handStats.total = this.hand.length;
  }

  //
  declare() {
    const [x, y] = this.alignment;
    const isInvestigator = this.role === CARDS.INVESTIGATOR;
    const isTerrorist = this.role === CARDS.TERRORIST;
    const { fuses, bombs, blanks, total } = this.handStats;

    let declaredFuses = 0;
    let declaredBomb = false;

    switch (true) {
      // Always true, always bombs
      case x === ALIGNMENTS.GOOD && y === ALIGNMENTS.LAWFUL:
        declaredFuses = fuses;
        declaredBomb = Boolean(bombs);
        break;
      // Always true, never bombs
      case x === ALIGNMENTS.GOOD && y === ALIGNMENTS.NEUTRAL:
      case x === ALIGNMENTS.NEUTRAL && y === ALIGNMENTS.LAWFUL && isInvestigator:
      case x === ALIGNMENTS.NEUTRAL && y === ALIGNMENTS.NEUTRAL && isInvestigator:
        declaredFuses = fuses;
        declaredBomb = false;
        break;
      // Adds 1, random if Bomb
      case x === ALIGNMENTS.GOOD && y === ALIGNMENTS.CHAOTIC && isInvestigator:
        declaredFuses = fuses + 1;
        declaredBomb = bombs ? Math.random() >= 0.5 : false;
        break;
      // Always true, random if Bomb
      case x === ALIGNMENTS.GOOD && y === ALIGNMENTS.CHAOTIC && isTerrorist:
        declaredFuses = fuses;
        declaredBomb = bombs ? Math.random() >= 0.5 : false;
        break;
      // Substracs 1, always bombs
      case x === ALIGNMENTS.NEUTRAL && y === ALIGNMENTS.LAWFUL && isTerrorist:
        declaredFuses = fuses - 1;
        declaredBomb = Boolean(bombs);
        break;
      // Conditional, random if Bomb
      case x === ALIGNMENTS.NEUTRAL && y === ALIGNMENTS.NEUTRAL && isTerrorist:
        declaredFuses = fuses >= blanks ? 1 : 0;
        declaredBomb = bombs ? Math.random() >= 0.5 : false;
        break;
      // Adds 2, always bombs
      case x === ALIGNMENTS.NEUTRAL && y === ALIGNMENTS.CHAOTIC && isInvestigator:
        declaredFuses = fuses + 2;
        declaredBomb = Boolean(bombs);
        break;
      // At least 2, if Bomb, adds 2, never bombs
      case x === ALIGNMENTS.NEUTRAL && y === ALIGNMENTS.CHAOTIC && isTerrorist:
        declaredFuses = bombs ? fuses + 2 : 1;
        declaredBomb = false;
        break;
      // Conditional, never bombs
      case x === ALIGNMENTS.EVIL && y === ALIGNMENTS.LAWFUL && isInvestigator:
        declaredFuses = fuses >= blanks ? fuses : fuses - 1;
        declaredBomb = false;
        break;
      case x === ALIGNMENTS.EVIL && y === ALIGNMENTS.LAWFUL && isTerrorist:
        declaredFuses = bombs ? fuses + 2 : fuses;
        declaredBomb = false;
        break;
      // Conditional, bombs only if lots of fuses
      case x === ALIGNMENTS.EVIL && y === ALIGNMENTS.NEUTRAL && isInvestigator:
        declaredFuses = fuses >= blanks ? fuses : 0;
        declaredBomb = fuses > blanks;
        break;
      // Always 0, never bombs
      case x === ALIGNMENTS.EVIL && y === ALIGNMENTS.NEUTRAL && isTerrorist:
        declaredFuses = 0;
        declaredBomb = false;
        break;
      // Always 1, random bombs
      case x === ALIGNMENTS.EVIL && y === ALIGNMENTS.CHAOTIC && isInvestigator:
        declaredFuses = 1;
        declaredBomb = Math.random() >= 0.5;
        break;
      // Random, bombs are always true
      case x === ALIGNMENTS.EVIL && y === ALIGNMENTS.CHAOTIC && isTerrorist:
        declaredFuses = Math.floor(Math.random() * (total - 0 + 1));
        declaredBomb = true;
        break;

      default:
        console.error('ERROR');
    }

    // Out of Range
    if (declaredFuses > total) declaredFuses = total;
    if (declaredFuses === total && declaredBomb) declaredFuses--;
    if (declaredFuses < 0) declaredFuses = 0;

    this.statementStats = defineStatement(declaredFuses, declaredBomb);
    this.speech = speechBuilder(this.statementStats);
  }

  // Triggers when player is targeted by the active player
  react() {}
}

const speechBuilder = statement => {
  let speech = '';

  switch (statement.fuses) {
    case 0:
      speech += "I don't have any fuses";
      break;
    case 1:
      speech += 'I have 1 FUSE';
      break;
    case 5:
      speech += `Wow! I have ${statement.fuses} FUSES`;
      break;
    default:
      speech += `I have ${statement.fuses} FUSES`;
  }

  if (statement.hasBomb) {
    speech += ', but I have the BOMB!';
  } else {
    speech += '.';
  }

  return speech;
};

const defineStatement = (fuses, declareBomb, modifier = 0) => {
  return {
    fuses: fuses + modifier,
    hasBomb: Boolean(declareBomb),
  };
};

/**
 * Card Symbols
 */
export const CARDS = {
  INVESTIGATOR: Symbol('INVESTIGATOR'),
  TERRORIST: Symbol('TERRORIST'),
  BLANK: Symbol('BLANK'),
  FUSE: Symbol('FUSE'),
  BOMB: Symbol('BOMB'),
};

/**
 * Alignment Symbols
 */
export const ALIGNMENT = {
  GvE: [Symbol('GOOD'), Symbol('NEUTRAL'), Symbol('EVIL')],
  LxC: [Symbol('LAWFUL'), Symbol('NEUTRAL'), Symbol('CHAOTIC')],
};

// /**
//  * Alignment Symbols
//  */
// export const ALIGNMENT_AXIS = {
//   GvE: [Symbol('GOOD'), Symbol('NEUTRAL'), Symbol('EVIL')],
//   LxC: [Symbol('LAWFUL'), Symbol('NEUTRAL'), Symbol('CHAOTIC')],
// };

/**
 * List of CPU Playes names and genders
 */
export const CPU_PLAYERS = [
  {
    name: 'Anne',
    gender: 'female',
  },
  {
    name: 'Bob',
    gender: 'male',
  },
  {
    name: 'Cici',
    gender: 'female',
  },
  {
    name: 'David',
    gender: 'male',
  },
  {
    name: 'Emma',
    gender: 'female',
  },
  {
    name: 'Fred',
    gender: 'male',
  },
  {
    name: 'Gil',
    gender: 'female',
  },
  {
    name: 'Henry',
    gender: 'male',
  },
];

/**
 * List of Available Colors
 */
export const COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'purple',
  'pink',
];

/**
 * Character Cards quantities depending on player count to determine each player affiliation
 * <number of players>: { investigators, terrorists }
 */
export const CHARACTER_CARDS_QUANTITY = {
  4: {
    investigators: 3,
    terrorists: 2,
  },
  5: {
    investigators: 4,
    terrorists: 2,
  },
  6: {
    investigators: 4,
    terrorists: 2,
  },
  7: {
    investigators: 5,
    terrorists: 3,
  },
  8: {
    investigators: 6,
    terrorists: 3,
  },
};

/**
 * Investigation Cards quantities depending on the player count to determine the number of blank
 * cards, fuse cards and bomb cards
 * <number of players>: { blanks, fuses, bombs }
 */
export const INVESTIGATION_CARDS_QUANTITY = {
  4: {
    blanks: 15,
    fuses: 4,
    bombs: 1,
  },
  5: {
    blanks: 19,
    fuses: 5,
    bombs: 1,
  },
  6: {
    blanks: 23,
    fuses: 6,
    bombs: 1,
  },
  7: {
    blanks: 27,
    fuses: 7,
    bombs: 1,
  },
  8: {
    blanks: 31,
    fuses: 8,
    bombs: 1,
  },
};

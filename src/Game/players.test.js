import { CPUPlayer } from './players';
import { Card } from './cards';

import { CARDS, ALIGNMENTS } from './constants';

const blankCard = new Card(CARDS.BLANK);
const bombCard = new Card(CARDS.BOMB);
const fuseCard = new Card(CARDS.FUSE);

const TEST_HANDS = [
  // All blanks (5)
  {
    it: 'declares hand with all blanks correctly',
    hand: new Array(5).fill(blankCard),
  },
  // 1 Bomb (5)
  {
    it: 'declares 1 bomb in a hand of 5 correctly',
    hand: [...new Array(4).fill(blankCard), bombCard],
  },
  // 1 fuse (5)
  {
    it: 'declares 1 fuse in a hand of 5 correctly',
    hand: [...new Array(4).fill(blankCard), fuseCard],
  },
  // 2 fuse (5)
  {
    it: 'declares 2 fuses in a hand of 5 correctly',
    hand: [...new Array(3).fill(blankCard), ...new Array(2).fill(fuseCard)],
  },
  // 5 fuse (5)
  {
    it: 'declares 5 fuses in a hand of 5 correctly',
    hand: new Array(5).fill(fuseCard),
  },
  // 1 fuse + 1 bomb (5)
  {
    it: 'declares 1 fuse and 1 bomb in a hand of 5 correctly',
    hand: [...new Array(3).fill(blankCard), fuseCard, bombCard],
  },
  // 3 fuse + 1 bomb (5)
  {
    it: 'declares 3 fuses and 1 bomb in a hand of 5 correctly',
    hand: [...new Array(3).fill(fuseCard), blankCard, bombCard],
  },
  // 1 fuse (4)
  {
    it: 'declares 1 fuse in a hand of 4 correctly',
    hand: [...new Array(3).fill(blankCard), fuseCard],
  },
  // 2 fuse (4)
  {
    it: 'declares 2 fuse in a hand of 4 correctly',
    hand: [...new Array(2).fill(blankCard), ...new Array(2).fill(fuseCard)],
  },
  // 1 bomb (3)
  {
    it: 'declares 1 bomb in a hand of 3 correctly',
    hand: [...new Array(2).fill(blankCard), bombCard],
  },
  // 1 fuse (3)
  {
    it: 'declares 1 fuse in a hand of 3 correctly',
    hand: [...new Array(2).fill(blankCard), fuseCard],
  },
  // 2 fuse (3)
  {
    it: 'declares 2 fuses in a hand of 3 correctly',
    hand: [...new Array(2).fill(fuseCard), blankCard],
  },
  // All blanks (2)
  {
    it: 'declares all blanks in a hand of 2 correctly',
    hand: new Array(2).fill(blankCard),
  },
  // 1 bomb (2)
  {
    it: 'declares 1 bomb in a hand of 2 correctly',
    hand: [blankCard, bombCard],
  },
  // 1 fuse (2)
  {
    it: 'declares 1 fuse in a hand of 2 correctly',
    hand: [blankCard, fuseCard],
  },
  // 1 fuse + bomb (2)
  {
    it: 'declares 1 fuse and 1 bomb in a hand of 2 correctly',
    hand: [fuseCard, bombCard],
  },
];

const SPEECHES = {
  NO_FUSES: "I don't have any fuses",
  NO_FUSES_BUT_BOMB: "I don't have any fuses, but I have the BOMB!",
  ONE_FUSE: 'I have 1 FUSE',
  ONE_FUSE_BUT_BOMB: 'I have 1 FUSE, but I have the BOMB!',
  TWO_FUSES: 'I have 2 FUSES',
  TWO_FUSES_BUT_BOMB: 'I have 2 FUSES, but I have the BOMB!',
  THREE_FUSES: 'I have 3 FUSES',
  THREE_FUSES_BUT_BOMB: 'I have 3 FUSES, but I have the BOMB!',
  FOUR_FUSES: 'I have 4 FUSES',
  FOUR_FUSES_BUT_BOMB: 'I have 4 FUSES, but I have the BOMB!',
  FIVE_FUSES: 'Wow! I have 5 FUSES.',
  NONE: 'I have',
  BOMB: 'but I have the BOMB!',
};

const INVESTIGATOR_DECLARATION_EXPECTS = {
  'Good-Lawful': {
    aligment: [ALIGNMENTS.GOOD, ALIGNMENTS.LAWFUL],
    speeches: [
      SPEECHES.NO_FUSES, // All blanks (5)
      SPEECHES.NO_FUSES_BUT_BOMB, // 1 Bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (5)
      SPEECHES.TWO_FUSES, // 2 fuse (5)
      SPEECHES.FIVE_FUSES, // 5 fuse (5)
      SPEECHES.ONE_FUSE_BUT_BOMB, // 1 fuse + 1 bomb (5)
      SPEECHES.THREE_FUSES_BUT_BOMB, // 3 fuse + 1 bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (4)
      SPEECHES.TWO_FUSES, // 2 fuse (4)
      SPEECHES.NO_FUSES_BUT_BOMB, // 1 bomb (3)
      SPEECHES.ONE_FUSE, // 1 fuse (3)
      SPEECHES.TWO_FUSES, // 2 fuse (3)
      SPEECHES.NO_FUSES, // All blanks (2)
      SPEECHES.NO_FUSES_BUT_BOMB, // 1 bomb (2)
      SPEECHES.ONE_FUSE, // 1 fuse (2)
      SPEECHES.ONE_FUSE_BUT_BOMB, // 1 fuse + 1 bomb (2)
    ],
  },
  'Good-Neutral': {
    aligment: [ALIGNMENTS.GOOD, ALIGNMENTS.NEUTRAL],
    speeches: [
      SPEECHES.NO_FUSES, // All blanks (5)
      SPEECHES.NO_FUSES, // 1 Bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (5)
      SPEECHES.TWO_FUSES, // 2 fuse (5)
      SPEECHES.FIVE_FUSES, // 5 fuse (5)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (5)
      SPEECHES.THREE_FUSES, // 3 fuse + 1 bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (4)
      SPEECHES.TWO_FUSES, // 2 fuse (4)
      SPEECHES.NO_FUSES, // 1 bomb (3)
      SPEECHES.ONE_FUSE, // 1 fuse (3)
      SPEECHES.TWO_FUSES, // 2 fuse (3)
      SPEECHES.NO_FUSES, // All blanks (2)
      SPEECHES.NO_FUSES, // 1 bomb (2)
      SPEECHES.ONE_FUSE, // 1 fuse (2)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (2)
    ],
  },
  'Good-Chaotic': {
    aligment: [ALIGNMENTS.GOOD, ALIGNMENTS.CHAOTIC],
    speeches: [
      SPEECHES.ONE_FUSE, // All blanks (5)
      SPEECHES.ONE_FUSE, // 1 Bomb (5)
      SPEECHES.TWO_FUSES, // 1 fuse (5)
      SPEECHES.THREE_FUSES, // 2 fuse (5)
      SPEECHES.FIVE_FUSES, // 5 fuse (5)
      SPEECHES.TWO_FUSES, // 1 fuse + 1 bomb (5)
      SPEECHES.FOUR_FUSES, // 3 fuse + 1 bomb (5)
      SPEECHES.TWO_FUSES, // 1 fuse (4)
      SPEECHES.THREE_FUSES, // 2 fuse (4)
      SPEECHES.ONE_FUSE, // 1 bomb (3)
      SPEECHES.TWO_FUSES, // 1 fuse (3)
      SPEECHES.THREE_FUSES, // 2 fuse (3)
      SPEECHES.ONE_FUSE, // All blanks (2)
      SPEECHES.ONE_FUSE, // 1 bomb (2)
      SPEECHES.TWO_FUSES, // 1 fuse (2)
      SPEECHES.NONE, // 1 fuse + 1 bomb (2)
    ],
  },
  'Neutral-Lawful': {
    aligment: [ALIGNMENTS.NEUTRAL, ALIGNMENTS.LAWFUL],
    speeches: [
      SPEECHES.NO_FUSES, // All blanks (5)
      SPEECHES.NO_FUSES, // 1 Bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (5)
      SPEECHES.TWO_FUSES, // 2 fuse (5)
      SPEECHES.FIVE_FUSES, // 5 fuse (5)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (5)
      SPEECHES.THREE_FUSES, // 3 fuse + 1 bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (4)
      SPEECHES.TWO_FUSES, // 2 fuse (4)
      SPEECHES.NO_FUSES, // 1 bomb (3)
      SPEECHES.ONE_FUSE, // 1 fuse (3)
      SPEECHES.TWO_FUSES, // 2 fuse (3)
      SPEECHES.NO_FUSES, // All blanks (2)
      SPEECHES.NO_FUSES, // 1 bomb (2)
      SPEECHES.ONE_FUSE, // 1 fuse (2)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (2)
    ],
  },
  'Neutral-Neutral': {
    aligment: [ALIGNMENTS.NEUTRAL, ALIGNMENTS.NEUTRAL],
    speeches: [
      SPEECHES.NO_FUSES, // All blanks (5)
      SPEECHES.NO_FUSES, // 1 Bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (5)
      SPEECHES.TWO_FUSES, // 2 fuse (5)
      SPEECHES.FIVE_FUSES, // 5 fuse (5)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (5)
      SPEECHES.THREE_FUSES, // 3 fuse + 1 bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (4)
      SPEECHES.TWO_FUSES, // 2 fuse (4)
      SPEECHES.NO_FUSES, // 1 bomb (3)
      SPEECHES.ONE_FUSE, // 1 fuse (3)
      SPEECHES.TWO_FUSES, // 2 fuse (3)
      SPEECHES.NO_FUSES, // All blanks (2)
      SPEECHES.NO_FUSES, // 1 bomb (2)
      SPEECHES.ONE_FUSE, // 1 fuse (2)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (2)
    ],
  },
  'Neutral-Chaotic': {
    aligment: [ALIGNMENTS.NEUTRAL, ALIGNMENTS.CHAOTIC],
    speeches: [
      SPEECHES.TWO_FUSES, // All blanks (5)
      SPEECHES.TWO_FUSES_BUT_BOMB, // 1 Bomb (5)
      SPEECHES.THREE_FUSES, // 1 fuse (5)
      SPEECHES.FOUR_FUSES, // 2 fuse (5)
      SPEECHES.FIVE_FUSES, // 5 fuse (5)
      SPEECHES.THREE_FUSES_BUT_BOMB, // 1 fuse + 1 bomb (5)
      SPEECHES.FOUR_FUSES_BUT_BOMB, // 3 fuse + 1 bomb (5)
      SPEECHES.THREE_FUSES, // 1 fuse (4)
      SPEECHES.FOUR_FUSES, // 2 fuse (4)
      SPEECHES.TWO_FUSES_BUT_BOMB, // 1 bomb (3)
      SPEECHES.THREE_FUSES, // 1 fuse (3)
      SPEECHES.THREE_FUSES, // 2 fuse (3)
      SPEECHES.TWO_FUSES, // All blanks (2)
      SPEECHES.ONE_FUSE_BUT_BOMB, // 1 bomb (2)
      SPEECHES.TWO_FUSES, // 1 fuse (2)
      SPEECHES.ONE_FUSE_BUT_BOMB, // 1 fuse + 1 bomb (2)
    ],
  },
  'Evil-Lawful': {
    aligment: [ALIGNMENTS.EVIL, ALIGNMENTS.LAWFUL],
    speeches: [
      SPEECHES.NO_FUSES, // All blanks (5)
      SPEECHES.NO_FUSES, // 1 Bomb (5)
      SPEECHES.NO_FUSES, // 1 fuse (5)
      SPEECHES.ONE_FUSE, // 2 fuse (5)
      SPEECHES.FIVE_FUSES, // 5 fuse (5)
      SPEECHES.NO_FUSES, // 1 fuse + 1 bomb (5)
      SPEECHES.THREE_FUSES, // 3 fuse + 1 bomb (5)
      SPEECHES.NO_FUSES, // 1 fuse (4)
      SPEECHES.TWO_FUSES, // 2 fuse (4)
      SPEECHES.NO_FUSES, // 1 bomb (3)
      SPEECHES.NO_FUSES, // 1 fuse (3)
      SPEECHES.TWO_FUSES, // 2 fuse (3)
      SPEECHES.NO_FUSES, // All blanks (2)
      SPEECHES.NO_FUSES, // 1 bomb (2)
      SPEECHES.ONE_FUSE, // 1 fuse (2)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (2)
    ],
  },
  'Evil-Neutral': {
    aligment: [ALIGNMENTS.EVIL, ALIGNMENTS.NEUTRAL],
    speeches: [
      SPEECHES.NO_FUSES, // All blanks (5)
      SPEECHES.NO_FUSES, // 1 Bomb (5)
      SPEECHES.NO_FUSES, // 1 fuse (5)
      SPEECHES.NO_FUSES, // 2 fuse (5)
      SPEECHES.FOUR_FUSES_BUT_BOMB, // 5 fuse (5)
      SPEECHES.NO_FUSES, // 1 fuse + 1 bomb (5)
      SPEECHES.THREE_FUSES_BUT_BOMB, // 3 fuse + 1 bomb (5)
      SPEECHES.NO_FUSES, // 1 fuse (4)
      SPEECHES.TWO_FUSES, // 2 fuse (4)
      SPEECHES.NO_FUSES, // 1 bomb (3)
      SPEECHES.NO_FUSES, // 1 fuse (3)
      SPEECHES.TWO_FUSES_BUT_BOMB, // 2 fuse (3)
      SPEECHES.NO_FUSES, // All blanks (2)
      SPEECHES.NO_FUSES, // 1 bomb (2)
      SPEECHES.ONE_FUSE, // 1 fuse (2)
      SPEECHES.ONE_FUSE_BUT_BOMB, // 1 fuse + 1 bomb (2)
    ],
  },
  'Evil-Chaotic': {
    aligment: [ALIGNMENTS.EVIL, ALIGNMENTS.CHAOTIC],
    speeches: [
      SPEECHES.ONE_FUSE, // All blanks (5)
      SPEECHES.ONE_FUSE, // 1 Bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (5)
      SPEECHES.ONE_FUSE, // 2 fuse (5)
      SPEECHES.ONE_FUSE, // 5 fuse (5)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (5)
      SPEECHES.ONE_FUSE, // 3 fuse + 1 bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (4)
      SPEECHES.ONE_FUSE, // 2 fuse (4)
      SPEECHES.ONE_FUSE, // 1 bomb (3)
      SPEECHES.ONE_FUSE, // 1 fuse (3)
      SPEECHES.ONE_FUSE, // 2 fuse (3)
      SPEECHES.ONE_FUSE, // All blanks (2)
      SPEECHES.ONE_FUSE, // 1 bomb (2)
      SPEECHES.ONE_FUSE, // 1 fuse (2)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (2)
    ],
  },
};

const TERRORIST_DECLARATION_EXPECTS = {
  'Good-Lawful': {
    aligment: [ALIGNMENTS.GOOD, ALIGNMENTS.LAWFUL],
    speeches: [
      SPEECHES.NO_FUSES, // All blanks (5)
      SPEECHES.NO_FUSES_BUT_BOMB, // 1 Bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (5)
      SPEECHES.TWO_FUSES, // 2 fuse (5)
      SPEECHES.FIVE_FUSES, // 5 fuse (5)
      SPEECHES.ONE_FUSE_BUT_BOMB, // 1 fuse + 1 bomb (5)
      SPEECHES.THREE_FUSES_BUT_BOMB, // 3 fuse + 1 bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (4)
      SPEECHES.TWO_FUSES, // 2 fuse (4)
      SPEECHES.NO_FUSES_BUT_BOMB, // 1 bomb (3)
      SPEECHES.ONE_FUSE, // 1 fuse (3)
      SPEECHES.TWO_FUSES, // 2 fuse (3)
      SPEECHES.NO_FUSES, // All blanks (2)
      SPEECHES.NO_FUSES_BUT_BOMB, // 1 bomb (2)
      SPEECHES.ONE_FUSE, // 1 fuse (2)
      SPEECHES.ONE_FUSE_BUT_BOMB, // 1 fuse + 1 bomb (2)
    ],
  },
  'Good-Neutral': {
    aligment: [ALIGNMENTS.GOOD, ALIGNMENTS.NEUTRAL],
    speeches: [
      SPEECHES.NO_FUSES, // All blanks (5)
      SPEECHES.NO_FUSES, // 1 Bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (5)
      SPEECHES.TWO_FUSES, // 2 fuse (5)
      SPEECHES.FIVE_FUSES, // 5 fuse (5)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (5)
      SPEECHES.THREE_FUSES, // 3 fuse + 1 bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (4)
      SPEECHES.TWO_FUSES, // 2 fuse (4)
      SPEECHES.NO_FUSES, // 1 bomb (3)
      SPEECHES.ONE_FUSE, // 1 fuse (3)
      SPEECHES.TWO_FUSES, // 2 fuse (3)
      SPEECHES.NO_FUSES, // All blanks (2)
      SPEECHES.NO_FUSES, // 1 bomb (2)
      SPEECHES.ONE_FUSE, // 1 fuse (2)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (2)
    ],
  },
  'Good-Chaotic': {
    aligment: [ALIGNMENTS.GOOD, ALIGNMENTS.CHAOTIC],
    speeches: [
      SPEECHES.NO_FUSES, // All blanks (5)
      SPEECHES.NO_FUSES, // 1 Bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (5)
      SPEECHES.TWO_FUSES, // 2 fuse (5)
      SPEECHES.FIVE_FUSES, // 5 fuse (5)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (5)
      SPEECHES.THREE_FUSES, // 3 fuse + 1 bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (4)
      SPEECHES.TWO_FUSES, // 2 fuse (4)
      SPEECHES.NO_FUSES, // 1 bomb (3)
      SPEECHES.ONE_FUSE, // 1 fuse (3)
      SPEECHES.TWO_FUSES, // 2 fuse (3)
      SPEECHES.NO_FUSES, // All blanks (2)
      SPEECHES.NO_FUSES, // 1 bomb (2)
      SPEECHES.ONE_FUSE, // 1 fuse (2)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (2)
    ],
  },
  'Neutral-Lawful': {
    aligment: [ALIGNMENTS.NEUTRAL, ALIGNMENTS.LAWFUL],
    speeches: [
      SPEECHES.NO_FUSES, // All blanks (5)
      SPEECHES.NO_FUSES_BUT_BOMB, // 1 Bomb (5)
      SPEECHES.NO_FUSES, // 1 fuse (5)
      SPEECHES.ONE_FUSE, // 2 fuse (5)
      SPEECHES.FOUR_FUSES, // 5 fuse (5)
      SPEECHES.NO_FUSES_BUT_BOMB, // 1 fuse + 1 bomb (5)
      SPEECHES.TWO_FUSES_BUT_BOMB, // 3 fuse + 1 bomb (5)
      SPEECHES.NO_FUSES, // 1 fuse (4)
      SPEECHES.ONE_FUSE, // 2 fuse (4)
      SPEECHES.NO_FUSES_BUT_BOMB, // 1 bomb (3)
      SPEECHES.NO_FUSES, // 1 fuse (3)
      SPEECHES.ONE_FUSE, // 2 fuse (3)
      SPEECHES.NO_FUSES, // All blanks (2)
      SPEECHES.NO_FUSES_BUT_BOMB, // 1 bomb (2)
      SPEECHES.NO_FUSES, // 1 fuse (2)
      SPEECHES.NO_FUSES_BUT_BOMB, // 1 fuse + 1 bomb (2)
    ],
  },
  'Neutral-Neutral': {
    aligment: [ALIGNMENTS.NEUTRAL, ALIGNMENTS.NEUTRAL],
    speeches: [
      SPEECHES.NO_FUSES, // All blanks (5)
      SPEECHES.NO_FUSES, // 1 Bomb (5)
      SPEECHES.NO_FUSES, // 1 fuse (5)
      SPEECHES.NO_FUSES, // 2 fuse (5)
      SPEECHES.ONE_FUSE, // 5 fuse (5)
      SPEECHES.NO_FUSES, // 1 fuse + 1 bomb (5)
      SPEECHES.ONE_FUSE, // 3 fuse + 1 bomb (5)
      SPEECHES.NO_FUSES, // 1 fuse (4)
      SPEECHES.ONE_FUSE, // 2 fuse (4)
      SPEECHES.NO_FUSES, // 1 bomb (3)
      SPEECHES.NO_FUSES, // 1 fuse (3)
      SPEECHES.ONE_FUSE, // 2 fuse (3)
      SPEECHES.NO_FUSES, // All blanks (2)
      SPEECHES.NO_FUSES, // 1 bomb (2)
      SPEECHES.ONE_FUSE, // 1 fuse (2)
      SPEECHES.ONE_FUSE, // 1 fuse + 1 bomb (2)
    ],
  },
  'Neutral-Chaotic': {
    aligment: [ALIGNMENTS.NEUTRAL, ALIGNMENTS.CHAOTIC],
    speeches: [
      SPEECHES.ONE_FUSE, // All blanks (5)
      SPEECHES.TWO_FUSES, // 1 Bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (5)
      SPEECHES.ONE_FUSE, // 2 fuse (5)
      SPEECHES.ONE_FUSE, // 5 fuse (5)
      SPEECHES.THREE_FUSES, // 1 fuse + 1 bomb (5)
      SPEECHES.FIVE_FUSES, // 3 fuse + 1 bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (4)
      SPEECHES.ONE_FUSE, // 2 fuse (4)
      SPEECHES.TWO_FUSES, // 1 bomb (3)
      SPEECHES.ONE_FUSE, // 1 fuse (3)
      SPEECHES.ONE_FUSE, // 2 fuse (3)
      SPEECHES.ONE_FUSE, // All blanks (2)
      SPEECHES.TWO_FUSES, // 1 bomb (2)
      SPEECHES.ONE_FUSE, // 1 fuse (2)
      SPEECHES.TWO_FUSES, // 1 fuse + 1 bomb (2)
    ],
  },
  'Evil-Lawful': {
    aligment: [ALIGNMENTS.EVIL, ALIGNMENTS.LAWFUL],
    speeches: [
      SPEECHES.NO_FUSES, // All blanks (5)
      SPEECHES.TWO_FUSES, // 1 Bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (5)
      SPEECHES.TWO_FUSES, // 2 fuse (5)
      SPEECHES.FIVE_FUSES, // 5 fuse (5)
      SPEECHES.THREE_FUSES, // 1 fuse + 1 bomb (5)
      SPEECHES.FIVE_FUSES, // 3 fuse + 1 bomb (5)
      SPEECHES.ONE_FUSE, // 1 fuse (4)
      SPEECHES.TWO_FUSES, // 2 fuse (4)
      SPEECHES.TWO_FUSES, // 1 bomb (3)
      SPEECHES.ONE_FUSE, // 1 fuse (3)
      SPEECHES.TWO_FUSES, // 2 fuse (3)
      SPEECHES.NO_FUSES, // All blanks (2)
      SPEECHES.TWO_FUSES, // 1 bomb (2)
      SPEECHES.ONE_FUSE, // 1 fuse (2)
      SPEECHES.TWO_FUSES, // 1 fuse + 1 bomb (2)
    ],
  },
  'Evil-Neutral': {
    aligment: [ALIGNMENTS.EVIL, ALIGNMENTS.NEUTRAL],
    speeches: [
      SPEECHES.NO_FUSES, // All blanks (5)
      SPEECHES.NO_FUSES, // 1 Bomb (5)
      SPEECHES.NO_FUSES, // 1 fuse (5)
      SPEECHES.NO_FUSES, // 2 fuse (5)
      SPEECHES.NO_FUSES, // 5 fuse (5)
      SPEECHES.NO_FUSES, // 1 fuse + 1 bomb (5)
      SPEECHES.NO_FUSES, // 3 fuse + 1 bomb (5)
      SPEECHES.NO_FUSES, // 1 fuse (4)
      SPEECHES.NO_FUSES, // 2 fuse (4)
      SPEECHES.NO_FUSES, // 1 bomb (3)
      SPEECHES.NO_FUSES, // 1 fuse (3)
      SPEECHES.NO_FUSES, // 2 fuse (3)
      SPEECHES.NO_FUSES, // All blanks (2)
      SPEECHES.NO_FUSES, // 1 bomb (2)
      SPEECHES.NO_FUSES, // 1 fuse (2)
      SPEECHES.NO_FUSES, // 1 fuse + 1 bomb (2)
    ],
  },
  'Evil-Chaotic': {
    aligment: [ALIGNMENTS.EVIL, ALIGNMENTS.CHAOTIC],
    speeches: [
      SPEECHES.NONE, // All blanks (5)
      SPEECHES.BOMB, // 1 Bomb (5)
      SPEECHES.NONE, // 1 fuse (5)
      SPEECHES.NONE, // 2 fuse (5)
      SPEECHES.NONE, // 5 fuse (5)
      SPEECHES.BOMB, // 1 fuse + 1 bomb (5)
      SPEECHES.BOMB, // 3 fuse + 1 bomb (5)
      SPEECHES.NONE, // 1 fuse (4)
      SPEECHES.NONE, // 2 fuse (4)
      SPEECHES.NONE, // 1 bomb (3)
      SPEECHES.NONE, // 1 fuse (3)
      SPEECHES.NONE, // 2 fuse (3)
      SPEECHES.NONE, // All blanks (2)
      SPEECHES.BOMB, // 1 bomb (2)
      SPEECHES.NONE, // 1 fuse (2)
      SPEECHES.BOMB, // 1 fuse + 1 bomb (2)
    ],
  },
};

describe('CPUPLayers', () => {
  let player;
  describe('constructor', () => {
    it('creates CPU player correctly', () => {
      player = new CPUPlayer('Tester', 'white', 'male');

      expect(player.name).toEqual('Tester');
      expect(player.color).toEqual('white');
      expect(player.gender).toEqual('male');
    });
  });

  describe('declaration by alignment', () => {
    beforeEach(() => {
      player = new CPUPlayer('Tester');
    });

    describe('Investigators', () => {
      beforeEach(() => {
        player.setRole(CARDS.INVESTIGATOR);
      });

      Object.entries(INVESTIGATOR_DECLARATION_EXPECTS).forEach(([describeTitle, data]) => {
        describe(describeTitle, () => {
          beforeEach(() => {
            player.alignment = data.aligment;
          });

          TEST_HANDS.forEach((testHand, index) => {
            it(testHand.it, () => {
              player.setHand(testHand.hand);
              player.declare();

              expect(player.speech.includes(data.speeches[index])).toBeTruthy();
            });
          });
        });
      });
    });

    describe('Terrorists', () => {
      beforeEach(() => {
        player.setRole(CARDS.TERRORIST);
      });

      Object.entries(TERRORIST_DECLARATION_EXPECTS).forEach(([describeTitle, data]) => {
        describe(describeTitle, () => {
          beforeEach(() => {
            player.alignment = data.aligment;
          });

          TEST_HANDS.forEach((testHand, index) => {
            it(testHand.it, () => {
              player.setHand(testHand.hand);
              player.declare();

              expect(player.speech.includes(data.speeches[index])).toBeTruthy();
            });
          });
        });
      });
    });
  });
});

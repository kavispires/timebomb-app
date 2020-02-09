import utils from './utils';
import { ALIGNMENT } from './constants';

//
export class Player {
  constructor(name = 'Player', color = 'red', gender = 'any') {
    this.name = name;
    this.color = color;
    this.gender = gender;
    this.alignment = null;
  }

  role = null;

  setRole(role) {
    this.role = role;
  }
}

export class CPUPlayer extends Player {
  constructor(name, color, gender) {
    super(name, color, gender);
    this.alignment = null;
    this.isCPU = true;
  }

  setAlignment(role) {
    const GvE = utils.getRandomElement(ALIGNMENT.GvE);
    const LxC = utils.getRandomElement(ALIGNMENT.LxC);

    this.alignment = [GvE, LxC];

    this.setRole(role);
  }
}

import World from './world.js';
import View from './../controllers/view.js';
import utils from './../utils.js';

let actionTypes = Object.create(null);

actionTypes.grow = function (critter) {
  critter.energy += 0.5;
  return true;
};

actionTypes.move = function (critter, vector, action) {
    let dest = this.checkDestination(action, vector);
    if(dest == null || critter.energy <= 1 || this.grid.get(dest) != null)
      return false;
    critter.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
};

actionTypes.eat = function (critter, vector, action) {
  let dest = this.checkDestination(action, vector);
  let atDest = dest != null && this.grid.get(dest);
  if(!atDest || atDest.energy == null)
    return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

actionTypes.reproduce = function (critter, vector, action) {
  let baby = utils.elementFromChar(this.legend, critter.originChar);
  let dest = this.checkDestination(action, vector);

  if(dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null)
    return false;
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};

export default function LifelikeWorld (map, legend) {
  World.call(this, map, legend);
}

LifelikeWorld.prototype = Object.create(World.prototype);

LifelikeWorld.prototype.letAct = function (critter, vector) {
  let action = critter.act(new View(this, vector));
  let handled = action &&
                action.type in actionTypes &&
                actionTypes[action.type].call(this, critter, vector, action);

  if(!handled) {
    critter.energy -= 0.2;
    if(critter.energy <= 0) {
      this.grid.set(vector, null);// die
      this.animals--;
    }
  }
};

import Grid from './../controllers/grid.js';
import Vector from './../controllers/vector.js';
import View from './../controllers/view.js';
import utils from './../utils.js';

const directions = utils.directions;

export default function World (map, legend) {
  let grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;
  this.animals = 0;

  map.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      let entity = utils.elementFromChar(legend, line[x]);
      this.grid.set(new Vector(x, y), entity);
      if(entity && entity.originChar === 'O') this.animals++;
    }
  }, this);
}

World.prototype.toString = function () {
  let output = '';
  for(let y = 0; y < this.grid.height; y++){
    for(let x = 0; x < this.grid.width; x++){
      let element = this.grid.get(new Vector(x, y));
      output += utils.charFromElement(element);
    }
    output += '\n';
  }
  return output;
};

World.prototype.turn = function () {
  let acted = [];
  this.grid.forEach((critter, vector) => {
    if(critter.act && acted.indexOf(critter) === -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};

World.prototype.letAct = function (critter, vector) {
  let action = critter.act(new View(this, vector));
  if(action && action.type === 'move') {
    let dest = this.checkDestination(action, vector);
    if(dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};

World.prototype.checkDestination = function (action, vector) {
  if(directions.hasOwnProperty(action.direction)) {
    let dest = vector.plus(directions[action.direction]);
    if(this.grid.isInside(dest)) {
      return dest;
    }
  }
};

World.prototype.hasAnimals = function () {
  return this.animals > 0;
};

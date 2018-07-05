import utils from './../utils.js';

const directions = utils.directions;
const directionNames = Object.keys(directions);

export default function dirPlus(dir, n) {
  let index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
}

function WallFollower () {
  this.dir = 's';
}

WallFollower.prototype.act = function (view) {
  let start = this.dir;
  if(view.look(dirPlus(this.dir, -3)) !== ' ')
    start = this.dir = dirPlus(this.dir, -2);
  while(view.look(this.dir) !== ' ') {
    this.dir = dirPlus(this.dir, 1);
    if(this.dir === start) break;
  }

  return {type:'move', direction: this.dir};
};

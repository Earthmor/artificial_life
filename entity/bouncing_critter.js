import utils from './../utils.js';

const directions = utils.directions;

export default function BouncingCritter () {
  this.direction = utils.randomElement(Object.keys(directions))
}

BouncingCritter.prototype.act = function (view) {
  if(view.look(this.direction) !== ' ')
    this.direction = view.find(' ') || 's';
  return {type:'move', direction: this.direction};
};

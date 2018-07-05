import utils from './../utils.js';

const directions = utils.directions;

export default function View(world, vector) {
    this.world = world;
    this.vector = vector;
}

View.prototype.look = function (dir) {
    let target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target))
        return utils.charFromElement(this.world.grid.get(target));
    return '#';
};

View.prototype.find = function (ch) {
    let found = this.findAll(ch);
    if (found.length === 0) return null;
    return utils.randomElement(found);
};

View.prototype.findAll = function (ch) {
    let found = [];
    for (let dir in directions) {
        if (directions.hasOwnProperty(dir)) {
            if (this.look(dir) === ch) {
                found.push(dir);
            }
        }
    }
    return found;
};

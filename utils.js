import Vector from './controllers/vector.js';

let utils = Object.create(null);

utils.elementFromChar = function (legend, ch) {
    if(ch === ' ')
        return null;
    let element = new legend[ch]();
    element.originChar = ch;
    return element;
};

utils.charFromElement = function (element) {
    if(element == null) {
        return ' ';
    }
    return element.originChar;
};

utils.randomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};

utils.directions = {
    "n":  new Vector( 0, -1),
        "ne": new Vector( 1, -1),
        "e":  new Vector( 1,  0),
        "se": new Vector( 1,  1),
        "s":  new Vector( 0,  1),
        "sw": new Vector(-1,  1),
        "w":  new Vector(-1,  0),
        "nw": new Vector(-1, -1)
};

export default utils;

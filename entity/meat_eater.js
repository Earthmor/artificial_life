import utils from './../utils.js';

export default class MeatEater {
    constructor() {
        this.energy = 100;
        this.direction = 'w';
        this.preySeen = [];
    }
    act(view) {
        let seenPerTurn = this.preySeen.reduce((a, b) => a + b, 0) / this.preySeen.length;
        let prey = view.findAll('O');
        this.preySeen.push(prey.length);
        if (this.preySeen.length > 6) {
           this.preySeen.shift();
        }
        if(prey.length && seenPerTurn > 0.25)
            return {type:'eat', direction: utils.randomElement(prey)};

        let space = view.find(' ');
        if(this.energy > 400 && space)
            return {type:'reproduce', direction: space};
        if(view.look(this.direction) !== ' ' && space)
            this.direction = space;
        return {type:'move', direction: this.direction};
    }
}
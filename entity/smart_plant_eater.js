export default class SmartPlantEater {
    constructor() {
        this.energy = 30;
        this.direction = 'e';
    }
    act(view) {
        let space = view.find(' ');
        if(this.energy > 90 && space)
            return {type:'reproduce', direction: space};
        let plant = view.find('*');
        if(plant && plant.length > 1)
            return {type:'eat', direction: plant};
        if(view.look(this.direction) !== ' ' && space)
            this.direction = space;
        return {type:'move', direction: this.direction};
    }
}

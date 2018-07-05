export default function PlantEater () {
  this.energy = 20;
}

PlantEater.prototype.act = function (ctx) {
  let space = ctx.find(' ');
  if(this.energy > 60 && space)
    return {type:'reproduce', direction: space};
  let plant = ctx.find('*');
  if(this.energy <= 60 && plant)
    return {type:'eat', direction: plant};
  if(space)
    return {type:'move', direction: space};
};

export default function Plant () {
  this.energy = 3 + Math.random() * 4;
}

Plant.prototype.act = function (ctx) {
  if(this.energy > 30) {
    let space = ctx.find(' ');
    if(space) return {type:'reproduce', direction: space};
  }
  if(this.energy < 40)
    return {type:'grow'};
};

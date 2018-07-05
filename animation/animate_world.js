let active = null;

export function AnimateWorld (world) {
    this.world = world;
    let outer = document.getElementById('output'), doc = outer.ownerDocument;
    let node = outer.appendChild(doc.createElement('div'));
    node.style.cssText = 'position: relative; width: intrinsic; width: fit-content;';
    this.pre = node.appendChild(doc.createElement('pre'));
    this.pre.appendChild(doc.createTextNode(this.world.toString()));
    this.button = document.getElementById('artificial_life_button');
    this.button.innerHTML = 'start';
    let self = this;
    this.button.addEventListener('click', e => { self.clicked(); });
    this.disabled = false;
    if(active)
        active.disable();
    active = this;
}

AnimateWorld.prototype.clicked = function () {
    if(this.disabled) return;
    if(this.interval) {
        clearInterval(this.interval);
        this.interval = null;
        this.button.innerHTML = 'start';
    } else {
        let self = this;
        this.interval = setInterval(() => {self.tick();}, 333);
        this.button.innerHTML = 'stop';
    }
};

AnimateWorld.prototype.tick = function () {
    this.world.turn();
    this.pre.removeChild(this.pre.firstChild);
    this.pre.appendChild(this.pre.ownerDocument.createTextNode(this.world.toString()));
};

AnimateWorld.prototype.disable = function () {
  this.disabled = true;
  clearInterval(this.interval);
  this.button.innerHTML = 'Disabled';
  this.button.style.color = 'red';
};
function Entity(game, settings) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }

  this.size = {x: 9, y: 9};
}

Entity.prototype = {
  draw: function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.center.x - this.size.x / 2,
                 this.center.y - this.size.y / 2,
                 this.size.x,
                 this.size.y);
  }
};

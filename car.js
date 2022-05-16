class Car {
  constructor(x, y, width, height) {
    this.x = x; // x will be center of car (rectangle)
    this.y = y;
    this.width = width;
    this.height = height;

    this.controls = new Controls();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();
  }

  update() {
    if (this.controls.forward) {
      this.y -= 2;
    }
    if (this.controls.reverse) {
      this.y += 2;
    }
    //   if(this.controls.left) {
    //       this.x -=2;
    //   }
    //   if(this.controls.reverse) {
    //       this.y -=2;
    //   }
  }
}

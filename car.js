class Car {
  constructor(x, y, width, height) {
    this.x = x; // x will be center of car (rectangle)
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0; // angle work unit circle rotate 90deg clockwise

    this.sensor = new Sensor(this);

    this.controls = new Controls();
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.rect(
      //   this.x - this.width / 2, // we translate to x, y
      //   this.y - this.height / 2,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();

    ctx.restore(); // restore the translate

    this.sensor.draw(ctx);
  }

  update(roadBorders) {
    this.#move();
    this.sensor.update(roadBorders);
  }

  #move() {
    if (this.controls.forward) {
      //   this.y -= 2;
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      // this.y += 2;
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2; // negative signe indicate car going backward
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }

    if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed !== 0) {
      const flip = this.speed > 0 ? 1 : -1; // fleep control backward when we backword
      if (this.controls.left) {
        //   this.x -= 2;
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        //   this.x += 2;
        this.angle -= 0.03 * flip;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;

    // this.y -= this.speed;
  }
}

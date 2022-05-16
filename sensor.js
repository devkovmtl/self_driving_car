class Sensor {
  constructor(car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 100;
    this.raySpread = Math.PI / 2;
    this.rays = [];
  }

  draw(ctx) {
    for (let index = 0; index < this.rayCount; index++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'yellow';
      ctx.moveTo(this.rays[index][0].x, this.rays[index][0].y);
      ctx.lineTo(this.rays[index][1].x, this.rays[index][1].y);
      ctx.stroke();
    }
  }

  update() {
    this.#castRays();
  }

  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      // figure out the angle of each ray
      //   const rayAngle = lerp(
      //     this.raySpread / 2,
      //     -this.raySpread / 2,
      //     i / (this.rayCount - 1)
      //   );

      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle;

      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      };
      this.rays.push([start, end]);
    }
  }
}

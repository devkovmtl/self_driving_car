class Sensor {
  constructor(car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 100;
    this.raySpread = Math.PI / 2;
    this.rays = [];
    this.readings = [];
  }

  draw(ctx) {
    for (let index = 0; index < this.rayCount; index++) {
      let end = this.rays[index][1];
      if (this.readings[index]) {
        end = this.readings[index]; //{x, y}
      }
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'yellow';
      ctx.moveTo(this.rays[index][0].x, this.rays[index][0].y);
      //   ctx.lineTo(this.rays[index][1].x, this.rays[index][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black';
      ctx.moveTo(this.rays[index][1].x, this.rays[index][1].y);
      //   ctx.lineTo(this.rays[index][1].x, this.rays[index][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }

  update(roadBorders) {
    this.#castRays();
    this.readings = [];
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.#getReading(this.rays[i], roadBorders));
    }
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

  // get reading where the ray touch any border
  #getReading(ray, roadBorders) {
    let touches = [];

    for (let i = 0; roadBorders.length; ++i) {
      // may return null
      // {x, y, offset} how fare from zero
      const touch = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      );
      if (touch) {
        touches.push(touch);
      }
      if (touches.length == 0) {
        return null;
      } else {
        const offsets = touches.map((e) => e.offset);
        // find the nearest touch by selecting the minimum offset
        const minOffset = Math.min(...offsets);
        return touches.find((e) => e.offset == minOffset);
      }
    }
  }
}

// https://box2d.org/

const canvas = document.getElementById('myCanvas');
canvas.width = 200;

const ctx = canvas.getContext('2d');

// road
const road = new Road(canvas.width / 2, canvas.width * 0.9);
// car
// const car = new Car(100, 100, 30, 50); // pos x, y, 30 w, 50h
const car = new Car(road.getLaneCenter(1), 100, 30, 50, 'KEYS'); // pos x, y, 30 w, 50h

const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY', 2)];

animate();

function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  car.update(road.borders, traffic);
  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.75); // make the canvas move

  road.draw(ctx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, 'red');
  }

  car.draw(ctx, 'blue');

  ctx.restore();

  requestAnimationFrame(animate);
}

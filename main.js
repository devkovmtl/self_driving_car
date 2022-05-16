// https://box2d.org/

const canvas = document.getElementById('myCanvas');
canvas.width = 200;

const ctx = canvas.getContext('2d');

// road
const road = new Road(canvas.width / 2, canvas.width * 0.9);
// car
// const car = new Car(100, 100, 30, 50); // pos x, y, 30 w, 50h
const car = new Car(road.getLaneCenter(1), 100, 30, 50); // pos x, y, 30 w, 50h

animate();

function animate() {
  car.update();
  canvas.height = window.innerHeight;
  road.draw(ctx);
  car.draw(ctx);
  requestAnimationFrame(animate);
}

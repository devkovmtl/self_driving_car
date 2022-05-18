// https://box2d.org/

const carCanvas = document.getElementById('carCanvas');
const networkCanvas = document.getElementById('networkCanvas');
carCanvas.width = 200;
networkCanvas.width = 300;

const carCtx = carCanvas.getContext('2d');
const networkCtx = carCanvas.getContext('2d');

// road
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
// car
// const car = new Car(100, 100, 30, 50); // pos x, y, 30 w, 50h
const car = new Car(road.getLaneCenter(1), 100, 30, 50, 'AI'); // pos x, y, 30 w, 50h

const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY', 2)];

animate();

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  car.update(road.borders, traffic);
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, -car.y + carCanvas.height * 0.75); // make the carCanvas move

  road.draw(carCtx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, 'red');
  }

  car.draw(carCtx, 'blue');

  carCtx.restore();

  // visual the netowrk
  //   networkCtx.lineDashOffset = -time / 60;
  //   Visualizer.drawNetwork(networkCtx, car.brain);

  requestAnimationFrame(animate);
}

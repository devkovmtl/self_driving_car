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
// const car = new Car(road.getLaneCenter(1), 100, 30, 50, 'AI'); // pos x, y, 30 w, 50h
const N = 100;

const cars = generateCar(N);
const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY', 2),
  new Car(road.getLaneCenter(0), -300, 30, 50, 'DUMMY', 2),
  new Car(road.getLaneCenter(2), -300, 30, 50, 'DUMMY', 2),
];

// hold our best car
let bestCar = cars[0];
if (localStorage.getItem('bestBrain')) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem('bestBrain'));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.2);
    }
  }
  // bestCar.brain = JSON.parse(localStorage.getItem('bestBrain'));
}

animate();

function save() {
  localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain));
}

function discard() {
  localStorage.removeItem('bestBrain');
}

function generateCar(N) {
  const cars = [];
  for (let i = 1; i <= N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, 'AI'));
  }
  return cars;
}

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }

  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y))); // find the best y value the min

  //   car.update(road.borders, traffic);
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  //   carCtx.translate(0, -cars[0].y + carCanvas.height * 0.75); // make the carCanvas move
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.75); // make the carCanvas move

  road.draw(carCtx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, 'red');
  }

  carCtx.globalAlpha = 0.2;
  //   car.draw(carCtx, 'blue');
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx, 'blue');
  }
  carCtx.globalAlpha = 1;
  //   cars[0].draw(carCtx, 'blue', true);
  bestCar.draw(carCtx, 'blue', true);

  carCtx.restore();

  // visual the netowrk
  //   networkCtx.lineDashOffset = -time / 60;
  //   Visualizer.drawNetwork(networkCtx, car.brain);

  requestAnimationFrame(animate);
}

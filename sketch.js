const flock = [];

let alignSlider, cohesionSlider, seperationSlider;

function setup() {
  createCanvas(640, 360);
  
  alignSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  seperationSlider = createSlider(0, 5, 1, 0.1);

  let alignLabel = createP('Alignment');
  alignLabel.position(30, 365);


  let cohesionLabel = createP('Cohesion');
  cohesionLabel.position(170, 365);

  let seperationLabel = createP('Seperation');
  seperationLabel.position(300, 365);

  for (let i = 0; i < 100; i++)
    flock.push(new Boid(random(width), random(height)));
}

function draw() {
  background(51);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}

function mousePressed() {
  for(let i = 0; i < 3; i++)
    flock.push(new Boid(mouseX, mouseY));
}

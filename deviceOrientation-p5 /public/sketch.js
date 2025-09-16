let img; 
let size; 
let asciiCHAR = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,^`'. ";

let alpha = 0, beta = 0, gamma = 0;

function preload() {
  img = loadImage("eyes.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(150, 0);
  size = width / img.width;

  textAlign(CENTER, CENTER);
}

function draw() {
  background(20);
  img.loadPixels();

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let pixelIndex = (i + j * img.width) * 4;
      let r = img.pixels[pixelIndex + 0];
      let g = img.pixels[pixelIndex + 1];
      let b = img.pixels[pixelIndex + 2];
      let a = img.pixels[pixelIndex + 3];



      let bright = (r + g + b + a) / 4;

 
      let shiftA = map(alpha, 0, 360, -50, 50);

      let shiftB = map(beta, -180, 180, -2, 2) * (j - img.width);

      let shiftG = map(gamma, -180, 180, -1, 1) ;

      
      

      lerpShiftB = lerp(b,shiftB,.75);

      let shiftedBright = map(bright + shiftA + shiftB  + shiftG, 0, 255);

      let tIndex = floor(map(lerpShiftB, 0, 255, 0, asciiCHAR.length - 1));


      
      let t = asciiCHAR.charAt(tIndex);




      let x = i * size + size / 2;
      let y = j * size + size / 2;

      textSize(size);
      fill(255);
      text(t, x, y);
    }
  }

  textSize(20);
  fill(0, 0, 0);
  text("alpha: " + round(alpha), 100, 30);
  text("beta: " + round(beta), 100, 60); 
  text("gamma: " + round(gamma), 100, 90);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  size = width / img.width;
}

function handleOrientation(eventData) {
  alpha = eventData.alpha;
  beta = eventData.beta;
  gamma = eventData.gamma;
}

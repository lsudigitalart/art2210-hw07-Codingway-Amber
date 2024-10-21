var everglow;
var soundPlayed = false;
var startTime;
var amp, level;
var soundFile, fft;

function preload() {
  everglow = loadSound("everglow.mp3");
  soundFile = loadSound('everglow.mp3');
}

function setup() {
  createCanvas(700, 580);
  getAudioContext().suspend();
  startTime = millis();
  amp = new p5.Amplitude();
  fft = new p5.FFT();
  fft.setInput(soundFile);
  soundFile.play(); 
}

function mousePressed() {
  userStartAudio();
}

function draw() {
  background(220);
  var spectrum = fft.analyze();
  var bassEnergy = fft.getEnergy("bass");
  var threshold = 200;

  if (!soundPlayed) {
    everglow.play();
    soundPlayed = true;
  }
  
  if (bassEnergy > threshold) {
    fill(255, 0, 0);
    ellipse(width / 2, height / 2, 50, 50);
  }

  // if (millis() - startTime > 3000) {
  //   ellipse(width / 2, height / 2, 50);
  //   }
}

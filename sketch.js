var everglow;
var soundPlayed = false;
// var playTime, loadTime;
var startTime
var amp, level;
var fft;


function preload() {
  everglow = loadSound("everglow.mp3");
}

function setup() {
  createCanvas(700, 700);
  getAudioContext().suspend();
  startTime = millis();
  
  // getAudioContext().resume();

  // if (everglow.isLoaded()) {
  //   loadTime = millis();
  //   print(loadTime);
  //   everglow.play();
  // }

  amp = new p5.Amplitude();
  fft = new p5.FFT();
}

function mousePressed() {
  userStartAudio();
}

function draw() {
  background(220);

  if (!soundPlayed) {
    everglow.play();
    soundPlayed = true;
}

if (millis() - startTime > 3000) {
  ellipse(width / 2, height / 2, 50);
}
}

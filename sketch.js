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
  createCanvas(windowWidth, 580);
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
  noStroke();
  level = amp.getLevel();
  mappedColor = map(level, 0, 1, 0, 255);
  cSize = map(level, 0, 1, 0, 1000);
  
  var spectrum = fft.analyze();
  // var bassEnergy = fft.getEnergy("bass");
  var trebleVol = fft.getEnergy("treble");
  var midVol = fft.getEnergy("mid");
  var bassVol = fft.getEnergy("bass");
  // var threshold = 200;

  if (!soundPlayed) {
    everglow.play();
    soundPlayed = true;
  }
  
  // if (bassEnergy > threshold) {
  //   fill(255, 0, 0);
  //   ellipse(width / 2, height / 2, 50, 50);
  // }

  let lerping = lerpColor(color("red"), color("blue"), level)

  if (startTime > 6000) {
    for (var i = 0; i < width; i++) {
      grad1 = lerpColor(color("purple"), color("yellow"), level);
      stroke(grad1);
      line(i, 0, i, height);
    }
  }

  fill(0);
  circle(windowWidth / 2, 580 / 2, cSize);
  // circle(2900 / 2, 1000 / 2, cSize);

  fill(216,133,192);
  // circle(windowWidth/1.75, windowHeight/4, trebleVol);
  circle(windowWidth/10, windowHeight/1.5, midVol);
  circle(178, 123, bassVol/2);
  circle(1174, 123, bassVol/2);

  // if (millis() - startTime > 3000) {
  //   ellipse(width / 2, height / 2, 50);
  //   }
  push()
  fill(0)
  text(mouseX, 0, 240); 
  text(mouseY, 0, 260);
  pop()
}

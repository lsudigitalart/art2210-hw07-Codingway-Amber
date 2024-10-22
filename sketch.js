var everglow;
var soundPlayed = false;
var showImage = false;
var startTime;
var amp, level;
var soundFile, fft;
var stars;
var space;
var lyrics = [
  { text: "So close to the glow", startTime: 1000, endTime: 5000 },
  { text: "Headed to light that I will hold", startTime: 5500, endTime: 10000 },
  { text: "Now it's time to gather what's lost", startTime: 11700, endTime: 16500 },
  { text: "Show me how stars fall down", startTime: 16500, endTime: 19500 },
  { text: "And still shine bright", startTime: 19500, endTime: 22500 },
  { text: "Wherever you go", startTime: 23500, endTime: 25500 },
  { text: "There I'll be your sight", startTime: 25500, endTime: 28500 },
  { text: "So that we can seek on through the night", startTime: 28500, endTime: 36500 },
  { text: "These are words I'll keep through our time", startTime: 36500, endTime: 46500 }
];

function preload() {
  everglow = loadSound("everglow.mp3");
  soundFile = loadSound('everglow.mp3');
  stars = loadImage("stars.gif");
  space = loadImage("space.gif");
}

function setup() {
  createCanvas(windowWidth, 580);
  getAudioContext().suspend();
  amp = new p5.Amplitude();
  fft = new p5.FFT();
  fft.setInput(soundFile);
  soundFile.play(); 
}

function mousePressed() {
  userStartAudio();
  showImage = true;
  startTime = millis();
}

function draw() {
  background(0);
  noStroke();
  level = amp.getLevel();
  cSize = map(level, 0, 1, 0, 1000);
  
  var spectrum = fft.analyze();
  var trebleVol = fft.getEnergy("treble");
  var midVol = fft.getEnergy("mid");
  var bassVol = fft.getEnergy("bass");

  if (!soundPlayed) {
    everglow.play();
    soundPlayed = true;
  }

  if (showImage) {
    if (millis() - startTime > 18700 && millis() - startTime < 25000) {
      image(stars, 0, 0, windowWidth, 700);
    }
  }

  if (showImage) {
    if (millis() - startTime > 25000 && millis() - startTime < 36500) {
      image(space, 0, 0, windowWidth, windowHeight);
    }
  }

  let colorStart = color(220); // (white)
  let colorEnd = color(1, 3, 130); // (dark blue)
  let lerping = lerpColor(colorStart, colorEnd, level);

 if (millis() - startTime > 36500) {
  fill(220);
} else {
  fill(0);
}
  circle(width / 2, 580 / 2, cSize);

  fill(lerping);
  circle(322, 81, midVol/2);
  circle(1043, 81, midVol/2);
  circle(217, 285, bassVol);
  circle(1130, 285, bassVol);
  circle(322, 484, trebleVol);
  circle(1043, 484, trebleVol);

  displayLyrics();

  // push()
  // fill(255)
  // text(mouseX, 0, 240); 
  // text(mouseY, 0, 260);
  // pop()
}

function displayLyrics() {
  let currentTime = millis() - startTime;

  for (let i = 0; i < lyrics.length; i++) {
    let lyric = lyrics[i];
    if (currentTime > lyric.startTime && currentTime < lyric.endTime) {
      fill(255); // Set text color to white
      textSize(32);
      textAlign(CENTER, CENTER);
      text(lyric.text, width / 2, height / 2);
    }
  }
}
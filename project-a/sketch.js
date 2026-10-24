// the use of AI is indicated by the "!" sign

let x = 400;
let y = 400;
let targetX = 0;
let targetY = 0;

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(0);
  
  //background
  let t = frameCount * 0.01;
      
  //wave
  for (let y = 0; y < height; y += 15) {
    
  //waves color
    let r = map(sin(t + y * 0.03), 0, 1, 50, 60);
    let g = map(sin(t + y * 0.01), 0, 1, 80, 140);
    let b = map(sin(t + y * 0.01), 0, 1, 190, 200);
    fill(r, g, b, 180);
    noStroke();

   //wave shape
    beginShape(); //for defining custom vertex points to create custom shapes

    for (let x = 0; x < width; x += 6) {
      let xShape = noise(x * 0.01, y * 0.01 + t);
      let waveY = y + sin(x * 0.02 + t) * 15   +map(xShape, 0, 1, -15, 15);

      vertex(x, waveY);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE); //stops drawing and connects all the points
  }

  //creature

  // creature's swimming motion
     let swim = sin(frameCount * 0.02) * 60;

    if (dist(mouseX, mouseY, x, y) > 100) {
      //follow mouse slowly
      x = lerp(x, mouseX, 0.01);
      y = lerp(y, mouseY, 0.01);
  } 

  //avoid mouse
   let mouseDistance = dist(x, y, mouseX, mouseY);
  // console.log(x+","+y);
  console.log(mouseDistance) // professor's work

  if (mouseDistance <= 100 && mouseDistance > 0) {
    let strength = map(mouseDistance, 0, 100, 3, 0);
    //how the creature reacts to mouse
    console.log("avoid")

    avoidX = (x - mouseX) / mouseDistance;
    avoidY = (y - mouseY) / mouseDistance;

    x += avoidX * strength;
    y += avoidY * strength;
  }

  push();
  translate(swim, 0);
  drawCreature(x, y);
  pop();
  
}

function drawCreature(x, y) {
  
  //creature becomes transparent

  let mouseDist = dist(mouseX, mouseY, x, y);
  let transparency = map(mouseDist, 0, 150, 60, 255);
  transparency = constrain(transparency, 0, 255);    //constrain keeps a value within a specific min and max range. Here, it stops the transparency from becoing too low or too high. (peer Ansar's, suggestion and help)

  x= constrain( x, 40, 750)
  y= constrain( y, 40, 450) // prevents the creature from following the mouse outside the canvas

  push();
  translate(x,y);

  drawEyes(0, 0, transparency);
  drawTentacles(0, 0, transparency);
  drawBody(0, 0, transparency);

  pop();
}

// DEFINE ADDITIONAL FUNCTIONS HERE

function drawBody(x, y, transparency) {
  push();
  stroke();
  translate(x, 0);

  for (let i = 0; i < 360; i += 0.2) {
    let noiseValue = map(noise(i * 0.1), 0, 1, -5, 5);
    let r = noise(i * 0.5, frameCount / 30) * 15;
    let amplitude = 3 + noiseValue;

    let xPos = 0 + cos(i) * r * amplitude;
    let yPos = 0 + sin(i) * r * amplitude * 0.6;

    //adding noise to color
    let colour = noise(frameCount * 0.03);

    let colourR = map(colour, 0, 1, 170, 230);
    let colourG = map(colour, 0, 1, 130, 180);
    let colourB = map(colour, 0, 1, 220, 155);

    fill(colourR, colourG, colourB, (50 * transparency) / 255);
    circle(xPos, yPos, 35);
  }
  pop();
}

function drawTentacles(x, y, transparency) {
  noFill();
  stroke(150, 220, 230, transparency);
  strokeWeight(1.5);

  for (let n = 0; n < 7; n++) {
    beginShape();

    let lengthX = map(noise(n + 10), 0, 1, 60, 150);
    let movement = 0.1;
    if (dist(mouseX, mouseY, width / 2, height / 2) < 150) {
      movement = 0.5;
    } //  tentacles speed up

    for (let t = 0; t < lengthX; t++) {
      // random length of tentacles
      let x =
       0+ (n - 3) * 10 +
        sin(t * 0.08 + frameCount * movement + n) * 5;

      let y = 0 + 35 + t * 2; // the 0's represent the place where height/2 and width/2 were replaced to match the creature's actual position. (with professor's help)

      vertex(x, y);
    }
    endShape();
  } // ! put the end bracket of my for loop after endShape. This allows the loop to end AFTER the tentacles are drawn.
}

let hiding = 0;

function drawEyes(x, y, transparency) {
  stroke(160, 220, 230);
  strokeWeight(2);

  let sway = sin(frameCount * 0.1) * 5; //motion to the eyes

  // eyes retract into body
  if (dist(mouseX, mouseY, width / 2, height / 2) < 130) {
    hiding = lerp(hiding, 40, 0.05);
  } else {
    hiding = lerp(hiding, 0, 0.03);
  }

  //stalks
  push();

  // again, the 0's is where width/2 and height/2 were replaced.
  
  line(
    0 - 20,
    0 - 30,
    0 - 30 + sway,
    0 - 60 + hiding
  );
  line(
    0 + 20,
    0 - 30,
    0 + 30 + sway,
    0 - 60 + hiding
  );

  //glow around eyes
  let glow = map(sin(frameCount * 0.08), -1, 1, 40, 120);

  if (keyIsPressed) {
    noStroke();

    //first glow
    fill(247, 247, 153, glow * 0.15);
    ellipse(0 - 30 + sway, 0 - 60 + hiding, 50);
    ellipse(0 + 30 + sway, 0 - 60 + hiding, 50);

    // second glow
    fill(247, 247, 153, glow * 0.3);
    ellipse(0 - 30 + sway, 0 - 60 + hiding, 38);
    ellipse(0 + 30 + sway, 0 - 60 + hiding, 38);

    //third glow
    fill(247, 247, 153, glow * 0.2);
    ellipse(0 - 30 + sway, 0 - 60 + hiding, 60);
    ellipse(0 + 30 + sway, 0 - 60 + hiding, 60);
  }
  pop();

  //eyes
  strokeWeight(5);
  fill(240, 240, 400, transparency);


  ellipse(0- 30 + sway, 0 - 60 + hiding, 18);
  ellipse(0 + 30 + sway, 0 - 60 + hiding, 18); //tried experimenting more with ellipses rather than circles again

  //pupils
  noStroke();
  fill(150, 30, 100, transparency);

  let pupilX = (mouseX - width / 2) * 0.03;
  let pupilY = (mouseY - height / 2) * 0.03; // pupils follow mouse

  ellipse(0 - 30 + sway + pupilX, 0 - 55 + hiding + pupilY, 10);

  ellipse(0+ 30 + sway + pupilX, 0 - 55 + hiding + pupilY, 10);
}

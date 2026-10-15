function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(255,255,255);

  let swim= sin(frameCount*0.02)*50;
  let away= 0;


let moveX= dist()
push();
translate (swim, 0);
drawCreature();
pop();
}

function drawCreature(x, y) {
  push();
  translate(x, y);

  drawEyes(0,0);
  drawTentacles(0,0);
  drawBody(0,0);

  pop();
}

// DEFINE ADDITIONAL FUNCTIONS HERE
function drawBody(x, y) {
  push();
  translate(x, 0);
  
  for (let i = 0; i < 360; i += 0.2) {
    let noiseValue = map(noise(i * 0.1), 0, 1, -5, 5);
    let r = noise(i * 0.5, frameCount / 30) * 15;
    let amplitude = 3 + noiseValue;

    let xPos = width / 2 + cos(i) * r * amplitude;
    let yPos = height / 2 + sin(i) * r * amplitude * 0.6;

    //adding noise to color 
let colour= noise(frameCount*0.03);
    
    let colourR= map( colour, 0,1,170,230);
    let colourG= map( colour, 0,1,130,180);
    let colourB= map( colour, 0,1,220,155);

    fill(colourR, colourG, colourB, 50 );
    circle(xPos, yPos, 30);
  }
  pop();
}

function drawTentacles() {
  noFill();
  stroke(150,220,230);
  strokeWeight(1.5);

  for(let n=0; n<7; n++) {
    beginShape();

  let lengthX=map(noise(n+10),0,1,60,150);
  let movement=0.1
  if (dist(mouseX, mouseY, width/2, height/2) // tentacles speed up
         <150) {
      movement= 0.5;
  }
    
  for (let t=0; t<lengthX; t++) { // random length of tentacles 
    let x=width/2 + (n-3) *10+   
    sin(t*0.08 +frameCount* movement+n) *5;
    let y=height/2+35+t*2;

    vertex(x,y);
  }
    endShape();
  }
}

let hiding=0

function drawEyes() {
  stroke(160,220,230);
  strokeWeight(2);

  let sway= sin(frameCount*0.1)*5; //motion to the eyes

  if (dist(mouseX,mouseY, width/2, height/2)<130) {
    hiding= lerp(hiding, 40, 0.03)
  } else {
    hiding= lerp(hiding, 0, 0.03)
  }

//stalks 
  line(width/2 -20, height/2-30,
        width/2 -30+sway, height/2-60+hiding);
  line(width/2 +20, height/2-30,
       width/2+30+sway, height/2-60+hiding);

  //eyes
  noStroke();
  fill(180,220,230);
  
  strokeWeight(5);
  ellipse(width/2-30+sway, height/2-60+hiding, 18);
  ellipse(width/2+30+sway, height/2-60+hiding, 18);

  //pupils
  fill(35,75,95);
  
  ellipse(width/2-30+sway, height/2-60+hiding, 8);
  ellipse(width/2+30+sway, height/2-60+hiding, 8);
 }




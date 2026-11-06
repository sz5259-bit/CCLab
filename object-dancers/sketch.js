/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  createCanvas(windowWidth, windowHeight);

  // ...except to adjust the dancer's name on the next line:
  dancer = new Doll(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class Doll {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.swing = 0;
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {  //movement 
    this.swing = sin(frameCount * 5) * 35;
  }

  display() {
    angleMode(DEGREES);

    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);
    rotate(this.swing);

  
  
    
   push();
   scale(0.6);  
   translate(-200,-200);
  
  
//BODY

  fill(170, 25, 45)
  circle (200,90,120)
  fill(18, 15, 140)
  stroke(82,190,196)
  circle(200,240,230)
  circle(79,180,45)
  circle(320,180,45)
  

//head
  fill(245,231,208)
  stroke(7,129,135)
  circle(200,90,91)
  fill(227,59,93)
  stroke(222,113,218)
  circle(170,100,20)
  circle(230,100,20)
  

 //dress
  fill(170, 25, 45);
  noStroke();
  arc(200, 208, 215, 160, 180, 360, CHORD);

 // Flower petals
  fill(255, 190, 210);
  circle(180, 215, 40);
  circle(220, 215, 40);
  circle(200, 195, 40);
  circle(200, 235, 40);

 // Flower center
  fill(247, 238, 109);
  circle(200, 215, 17);

   
  //hair
  fill(117,84,52)
  noStroke()
  ellipse(200,55,60,20)
  
   //eyes
  fill(255,255,255)
  stroke(64,48,31)
  ellipse(180,80,25,15)
  ellipse(220,80,25,15)
  
  //brown
  fill(110,72,32)
  circle(180,80,15)
  circle(220,80,15)
  //black pupils
   fill(0,0,0)
  circle(181,79,10)
  circle(222,79,10)
  //little brown lights
  fill(227,179,127)
  circle(183,77,6)
  circle(224,77,6)
  
  //lashes
  line(170,75,165,71)
  line(174,73,170,67)
  line(177,72,175,66)
  line(230,76,236,69)
  line(226,76,232,68)
  line(222,76,226,67)

  //mouth
  noFill()
  stroke(0)
  arc(200,103,17,15,0,180)

  pop();


  } } 
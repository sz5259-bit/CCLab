// original images
let scannedImages = [];
let scannedImages2 = [];
let coloredFlower = [];

let showColor = false;

let beeX = 100; //position of the bee
let beeY = 150;

let beeSpeed = 1.5;
let wave = 0;
let waveX = 0;

let beeSize = 70;
let stopDistance = 70;

async function setup() {
  createCanvas(800, 500);

  // load all images first
  const leavesPromises = [];
  for (let i = 2; i < 6; i++) {
    leavesPromises.push(loadImage("assets/Leaves " + i + ".PNG"));
  }
  scannedImages = await Promise.all(leavesPromises);

  const beePromises = [];
  for (let i = 1; i < 3; i++) {
    beePromises.push(loadImage("assets/Bee " + i + ".PNG"));
  }
  scannedImages2 = await Promise.all(beePromises);

  const coloredFlowerPromises = [];
  for (let i = 1; i < 6; i++) {
    coloredFlowerPromises.push(loadImage("assets/coloredleaves" + i + ".png"));
  }
  coloredFlower = await Promise.all(coloredFlowerPromises);

  // erase background and crop images
  // how to use: eraseBackground(imageArray, threshold);
  eraseBackground(scannedImages, 50);
  eraseBackground(scannedImages2, 50);
  eraseBackground(coloredFlower, 50);
}

function mousePressed() {
      showColor = !showColor; // switches the boolean variable between true and false. ! symbol means NOT.
   }

function draw() {
  background(255);

  
    //distance between the bee and the mouse
    let distance = dist(beeX, beeY, mouseX, mouseY);

    // bee moves when mouse is far 
    if (distance < stopDistance) {

      waveX += 0.1;

      beeX += cos(waveX);
      beeY += sin(waveX);

    } else {

      wave += 0.05;

      beeX += beeSpeed;
      beeY += sin(wave) * 2;
    }

    // make the bee reappear on the other side
    if (beeX > width) {
      beeX = -beeSize;
    }

    // flower becomes colored when
    if (showColor) {

    let frame = floor(frameCount / 15) % coloredFlower.length;
    image(coloredFlower[frame], 225, 60, 500, 500);

  } else {

    let frame = floor(frameCount / 15) % scannedImages.length;
    image(scannedImages[frame], 225, 60, 500, 500);


    // display the mouse position
    push();
    let txt = round(mouseX) + ", " + round(mouseY);
    fill(0, 255, 0);
    text(txt, mouseX, mouseY);
    pop();
  }

  // show the bee image
    let frame2 = floor(frameCount / 10) % scannedImages2.length;
    image(scannedImages2[frame2], beeX, beeY, beeSize, beeSize);

    
}
 


  // IMAGE PROCESSING FUNCTIONS
  // You shouldn't need to modify these helper functions:
  function crop(images, x, y, width, height) {
    const croppedImages = [];

    for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
      croppedImages.push(images[imageIndex].get(x, y, width, height));
    }

    return croppedImages;
  }

  function eraseBackground(images, threshold = 10) {
    for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
      const currentImage = images[imageIndex];
      currentImage.loadPixels();

      for (let pixelIndex = 0; pixelIndex < currentImage.pixels.length; pixelIndex += 4) {
        let distanceFromWhite = 255 - currentImage.pixels[pixelIndex];
        distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 1];
        distanceFromWhite += 255 - currentImage.pixels[pixelIndex + 2];

        if (distanceFromWhite < threshold) {
          currentImage.pixels[pixelIndex + 3] = 0;
        }
      }

      currentImage.updatePixels();
    }
    // this function uses the pixels array
    // we will cover this later in the semester - stay tuned :D
  }


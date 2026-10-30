// original images
let scannedImages = [];
let scannedImages2= [];
let croppedImages = [];

async function setup() {
  createCanvas(800, 500);

  // load all images first
  const imagePromises = [];
  for (let i = 2; i < 5; i++) {
    imagePromises.push(loadImage("assets/Leaves" + i + ".PNG"));
  }
  scannedImages = await Promise.all(imagePromises);

  const imagePromises2 = [];
  for (let i = 5; i < 8; i++) {
    imagePromises2.push(loadImage("assets/Bee" + i + ".PNG")); 
  }
  scannedImages2 = await Promise.all(imagePromises2);

  // erase background and crop images
  // how to use: eraseBackground(imageArray, threshold);
  eraseBackground(scannedImages, 10);
  eraseBackground(scannedImages2, 10);

  // crop parts of images
  // how to use: crop(imageArray, x, y, width, height);
  croppedImages = crop(scannedImages, 100, 15, 440, 330);

  croppedImages2 = crop(scannedImages2, 100, 15, 440, 330);
}

function draw() {

  // show the first image
  image(croppedImages[0], 100, 100);

  // show the second image
  image(croppedImages2[0], 500, 100);

  // display the mouse position
  push();
  let txt = round(mouseX) + ", " + round(mouseY);
  fill(0, 255, 0);
  text(txt, mouseX, mouseY);
  pop();
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

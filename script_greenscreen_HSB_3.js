var w = 320;
var h = 240;
var capture; 
let hueCapt;
let satCapt;
let brighCapt;
let img;
let newColor;
let newColorHue;
let my_canvas;
let sliderMax;
let sliderMin;
let button;
let val = 1;
let newImage;
let hueMin;
let hueMax;


const capturer = new CCapture({
  framerate: 7,
  format: "webm",
  name: "ma_video",
  quality: 100,
  verbose: true,
});

function preload(){
  img = loadImage("fractal.jpg");
}

function setup(){
  my_canvas = createCanvas(w,h+250); 
  frameRate(7);
  capture = createCapture(VIDEO) ;
  capture.size(w,h);
  capture.hide();
  pixelDensity(1); // pour ne pas qu'il y ait de bug d'affichage
  newImage = createImage(w,h);
  img.resize(w,h);

  sliderMax = createSlider(0, 360, 135); // création du slider avec valeur min, max, et valeur initiale
  sliderMax.position(50, h + 220); // position du slider dans la page
  sliderMax.style('width', '360px');

  sliderMin = createSlider(0, 360, 95); // création du slider avec valeur min, max, et valeur initiale
  sliderMin.position( 50, h + 160); // position du slider dans la page
  sliderMin.style('width', '360px');

  button = createButton('Start/Stop');
  button.position(w+50, (h/3)+30);
  button.mousePressed(stopRecord);
}

function draw(){ 
  if (val===0) {
    capturer.start();
    val --;
  };
  loadPixels(); // chargement de la variable "pixels" du canvas
  newImage.loadPixels();
  capture.loadPixels();
  img.loadPixels();
  background(200);
  writeText();
  hueMax = sliderMax.value();
  hueMin = sliderMin.value();
  for (var ligne = 0; ligne < w; ligne++) { 
    for (var col = 0; col < w; col++) {

      let indexPixel = w * ligne + col; 
      let R = indexPixel*4 + 0;
      let G = indexPixel*4 + 1;
      let B = indexPixel*4 + 2;
      let A = indexPixel*4 + 3;

      let captureColor = color(capture.pixels[R], capture.pixels[G], capture.pixels[B]);
      pixels[A] = 255;
      hueCapt = hue(captureColor);
      satCapt = saturation(captureColor);
      brighCapt = brightness(captureColor);

      if((hueCapt>hueMin)&&(hueCapt<hueMax)&&(satCapt>20)&&(brighCapt>35)){
        newImage.pixels[R] = img.pixels[R];
        newImage.pixels[G] = img.pixels[G];
        newImage.pixels[B] = img.pixels[B];
        newImage.pixels[A] = img.pixels[A];
      }else{
        newImage.pixels[R] = capture.pixels[R]; // on multiplie la composante rouge grâce au slider
        newImage.pixels[G] = capture.pixels[G]; // on recoopie la composante verte de l'image
        newImage.pixels[B] = capture.pixels[B]; // on recoopie la composante bleue de l'image
        newImage.pixels[A] = capture.pixels[A]; // on recoopie la composante bleue de l'image
      }
    }
  }
  
  newImage.updatePixels();
  image(newImage, 0, 0, w, h);   // mise à jour de la valeur des pixels du canvas

  capturer.capture(my_canvas.canvas);

  if (val === -2){
    noLoop();
    capturer.stop();
    capturer.save();
  }
}

function mousePressed(){ 
  if ((mouseX<w)&&(mouseY<h)){
    newColor = get(mouseX,mouseY);
    newColorHue = hue(newColor);
  }
}

function writeText(){
  if(newColor) {
  textSize(20);
  text('Color ' + newColor, 50, h + 20);
  text('Hue ' + newColorHue, 50, h + 50);
  
  text('Hue min ' + hueMin + ' (0 - 360)', 50, h + 140);
  text('Hue max ' + hueMax + ' (0 - 360)', 50, h + 200);

  text('Saturation ' + saturation(newColor), 50, h + 80);
  text('Brightness ' + brightness(newColor), 50, h + 110);
  }
}

function stopRecord(){
  val --; 
}
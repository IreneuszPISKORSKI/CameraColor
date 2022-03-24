var s = 320;
var capture; 
var slider; // mon slider qui va gérer la quantité de rouge à mettre dans l'image
let hueCapt;
let satCapt;
let brighCapt;
let img;

function preload(){
  img = loadImage("fractal.jpg");
}

function setup(){
  createCanvas(320,240); 
  frameRate(30); 
  slider = createSlider(130, 160, 130); // création du slider avec valeur min, max, et valeur initiale
  slider.position(700, 100); // position du slider dans la page
  slider.style('width', '250px'); // largeur du slider (css)
  capture = createCapture(VIDEO) ;
  capture.size(320,240);
  // capture.hide();
  pixelDensity(1); // pour ne pas qu'il y ait de bug d'affichage
}

function draw(){ 
  
  let facteur =  slider.value(); 
  loadPixels(); // chargement de la variable "pixels" du canvas
  capture.loadPixels();
  img.resize(320,240);
  img.loadPixels();
  background(0);
  for (var ligne = 0; ligne < s; ligne++) { 
    for (var col = 0; col < s; col++) {
      
      let index = (s * ligne + col)*4;   // correspondance entre la 2D et la 1D
      let captureColor = color(capture.pixels[index + 0], capture.pixels[index + 1], capture.pixels[index + 2]);
      
      hueCapt = hue(captureColor);
      satCapt = saturation(captureColor);
      brighCapt = brightness(captureColor);

      if((hueCapt>=100)&&(hueCapt<=180)&&(satCapt>40)&&(brighCapt>25)&&(brighCapt<95)){
        pixels[index + 0] = img.pixels[index + 0];
        pixels[index + 1] = img.pixels[index + 1];
        pixels[index + 2] = img.pixels[index + 2];
      }else{
        pixels[index + 0] = capture.pixels[index + 0]; // on multiplie la composante rouge grâce au slider
        pixels[index + 1] = capture.pixels[index + 1]; // on recoopie la composante verte de l'image
        pixels[index + 2] = capture.pixels[index + 2]; // on recoopie la composante bleue de l'image
        pixels[index + 3] = capture.pixels[index + 3]; // on recoopie la composante alpha de l'image
      }
    }
  }
  updatePixels();   // mise à jour de la valeur des pixels du canvas
}
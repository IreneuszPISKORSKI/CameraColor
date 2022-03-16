var s = 640; // taille du canvas
var capture; 
var slider; // mon slider qui va gérer la quantité de rouge à mettre dans l'image

function preload() { // fonction qui permet de pré charger l'image
  capture = loadImage('images/fractal.jpg');
}

function setup(){
  createCanvas(s,s); 
  slider = createSlider(0, 5, 1); // création du slider avec valeur min, max, et valeur initiale
  slider.position(10, 10); // position du slider dans la page
  slider.style('width', '80px'); // largeur du slider (css)
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  pixelDensity(1); // pour ne pas qu'il y ait de bug d'affichage
}

function draw(){ //
  background(128);
//   img.resize(s,s); // on déforme l'image pour s'adapter au canvas (on peut faire l'inverse)
  let facteur =  slider.value(); // récuopération de la valeur du slider
  loadPixels(); // chargement de la variable "pixels" du canvas
  capture.loadPixels(); // charge de la variable img.pixels de l'image
  
  // on boucle sur les lignes et les colonnes de l'image
  for (var ligne = 0; ligne < s; ligne++) { 
    for (var col = 0; col < s; col++) {
        let index = (s * ligne + col)*4;   // correspondance entre la 2D et la 1D 
        pixels[index + 0] = capture.pixels[index + 0]; // on multiplie la composante rouge grâce au slider
        pixels[index + 1] = capture.pixels[index + 1]; // on recoopie la composante verte de l'image
        pixels[index + 2] = facteur * capture.pixels[index + 2]; // on recoopie la composante bleue de l'image
        pixels[index + 3] = capture.pixels[index + 3]; // on recoopie la composante alpha de l'image
      }
  }
  updatePixels();   // mise à jour de la valeur des pixels du canvas
}
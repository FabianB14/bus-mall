'use strict';

/*  Thing needed:
I will need an event listner to listen for clicks:
I will have an event listener for 3 images at a time

I will need an array of images:
after constructing images I will have them pushed to an array

I will need random image generator function:
The random image function will take in the array of images and randomly send 3 images at a time to each image div

I will need to keep count of the number of clicks (maximum 25):
I will have the event listener function keep count of of the number of clicks and once maximum clicks are reached the event listener will turn off

I will keep duplicates from poping up after a click:
I will save the 3 previous images on the into a mini image array, if any of the images were up then the function will run again untill new images are present. "Still thinking more about how to accomplish this feat. I will save for last"
I calculate the percentage of the clicks per image:
Using a calculator function I will caluclate the percentage from clicks of 25

I will need a constructor for the images.:
I will implement this constructor to have an object associated with each image. The properties will be name, filepath, number of times the image has been shown and the numeber of times it has been clicked

The user will need instructions

Need to size images correctly

*/


//Gloabal Variables

var allImageTag = document.getElementById('all_images');
var leftImageTag = document.getElementById('left_img');
var middleImageTag = document.getElementById('middle_img');
var rightImageTag = document.getElementById('right_img');
//Count for all image clicks
var globalClickCount = 0;
//These Variables will represent the images on the page at the moment

var leftImageOnPage;
var middleImageOnPage;
var rightImageOnPage;

//This is where the image object constructor will be
var ImageObjet = function(name,imageSrc){
  this.name = name;
  this.url = imageSrc;
  this.clicks = 0;
  this.timeShown = 0;

  ImageObjet.allImages.push(this);
};

ImageObjet.allImages = [];

var renderImages = function(leftIndex,middleIndex,rightIndex){
  leftImageTag.src = ImageObjet.allImages[leftIndex].url;
  middleImageTag.src = ImageObjet.allImages[middleIndex].url;
  rightImageTag.src = ImageObjet.allImages[rightIndex].url;
};

var clickNewImages = function(){
  var leftIndex = Math.round(Math.random()*ImageObjet.allImages.length);
  do{
    var middleIndex = Math.round(Math.random()*ImageObjet.allImages.length);
    var rightIndex = Math.round(Math.random()*ImageObjet.allImages.length);
  }while(rightIndex === middleIndex || rightIndex === leftIndex || leftIndex === middleIndex);

  leftImageOnPage = ImageObjet.allImages[leftIndex];
  middleImageOnPage = ImageObjet.allImages[middleIndex];
  rightImageOnPage = ImageObjet.allImages[rightIndex];

  renderImages(leftIndex,middleIndex,rightIndex);
};

var handleClickOnImages = function(event){
  if(globalClickCount < 26){
    var imageClicked = event.target;
    var id = imageClicked.id;

    if(id === 'left_img' || id === 'middle_img' || id === 'right_img'){

      if(id === 'left_img'){
        leftImageOnPage.clicks++;
      }
      if(id === 'middle_img'){
        middleImageOnPage.clicks++;
      }
      if(id === 'right_img'){
        rightImageOnPage.clicks++;
      }
      leftImageOnPage.timeShown++;
      middleImageOnPage.timeShown++;
      rightImageOnPage.timeShown++;

      clickNewImages();
    }

  }
  globalClickCount++;
  console.log(globalClickCount);
  if(globalClickCount === 25){
    allImageTag.removeEventListener('click', handleClickOnImages);
  }
};


allImageTag.addEventListener('click', handleClickOnImages);

new ImageObjet('bag', './img/bag.jpg');
new ImageObjet('banana', './img/banana.jpg');
new ImageObjet('bathroom', './img/bathroom.jpg');
new ImageObjet('boots', './img/boots.jpg');
new ImageObjet('breakfast', './img/breakfast.jpg');
new ImageObjet('pet-sweep', './img/pet-sweep.jpg');
new ImageObjet('bubblegum', './img/bubblegum.jpg');
new ImageObjet('chair', './img/chair.jpg');
new ImageObjet('cthulhu', './img/cthulhu.jpg');
new ImageObjet('dog-duck', './img/dog-duck.jpg');
new ImageObjet('dragon', './img/dragon.jpg');
new ImageObjet('pet', './img/pen.jpg');
new ImageObjet('scissors', './img/scissors.jpg');
new ImageObjet('shark', './img/shark.jpg');
new ImageObjet('sweep', './img/sweep.png');
new ImageObjet('tauntaun', './img/tauntaun.jpg');
new ImageObjet('usb', './img/usb.gif');
new ImageObjet('water', './img/water-can.jpg');
new ImageObjet('wine', './img/wine-glass.jpg');

console.log(ImageObjet.allImages);

leftImageOnPage = ImageObjet.allImages[5];
middleImageOnPage = ImageObjet.allImages[17];
rightImageOnPage = ImageObjet.allImages[0];
console.log(globalClickCount);


clickNewImages();




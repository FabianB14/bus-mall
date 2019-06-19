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
var nameArr = [];
var percentageArr = [];
var clicksArr = [];
var leftImageOnPage;
var middleImageOnPage;
var rightImageOnPage;

//This is where the image object constructor will be
var ImageObject = function(name,imageSrc){
  this.name = name;
  this.url = imageSrc;
  this.clicks = 0;
  this.timeShown = 0;
  this.percentage = this.clicks / this.timeShown *100;
  ImageObject.allImages.push(this);
};
ImageObject.allImages = [];
ImageObject.previousImages = [];

var dataExtractor = function(){
  for(var i = 0; i < ImageObject.allImages.length; i++){
    nameArr.push(ImageObject.allImages[i].name);
    percentageArr.push(ImageObject.allImages[i].percantage);
    clicksArr.push(ImageObject.allImages[i].clicks);
    console.log(nameArr);
  }
};
//This fuction will reneder the images while checking for dups
var renderImages = function(leftIndex,middleIndex,rightIndex){
  console.log(leftIndex,middleIndex,rightIndex);
  leftImageTag.src = ImageObject.allImages[leftIndex].url;
  middleImageTag.src = ImageObject.allImages[middleIndex].url;
  rightImageTag.src = ImageObject.allImages[rightIndex].url;
  if(ImageObject.previousImages.includes(ImageObject.allImages[leftIndex].name) || ImageObject.previousImages.includes(ImageObject.allImages[middleIndex].name) ||ImageObject.previousImages.includes(ImageObject.allImages[rightIndex].name)){
    console.log('Im here!');
    renderAgain(leftIndex,middleIndex,rightIndex);
  }
  if(leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex){
    renderAgain(leftIndex,middleIndex,rightIndex);
  }
  ImageObject.previousImages = [];
  ImageObject.previousImages.push(ImageObject.allImages[leftIndex].name,ImageObject.allImages[middleIndex].name,ImageObject.allImages[rightIndex].name);
};

var renderAgain = function(leftIndex,middleIndex,rightIndex){
  leftIndex = Math.floor(Math.random()*ImageObject.allImages.length);
  middleIndex = Math.floor(Math.random()*ImageObject.allImages.length);
  rightIndex = Math.floor(Math.random()*ImageObject.allImages.length);
  renderImages(leftIndex,middleIndex,rightIndex);
};

var clickNewImages = function(){
  var leftIndex = Math.floor(Math.random()*(ImageObject.allImages.length));

  do{
    var middleIndex = Math.floor(Math.random()*(ImageObject.allImages.length));
    var rightIndex = Math.floor(Math.random()*(ImageObject.allImages.length));
  }while(rightIndex === middleIndex || rightIndex === leftIndex || leftIndex === middleIndex);
  leftImageOnPage = ImageObject.allImages[leftIndex];
  middleImageOnPage = ImageObject.allImages[middleIndex];
  rightImageOnPage = ImageObject.allImages[rightIndex];

  if(leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex){
    clickNewImages();
  }

  calculation(leftImageOnPage,middleImageOnPage,rightImageOnPage);
  renderImages(leftIndex,middleIndex,rightIndex);
};

var handleClickOnImages = function(event){
  if(globalClickCount < 25){
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
    dataExtractor();
    buildChart();
  }
};

var calculation = function(leftImageOnPage,middleImageOnPage,rightImageOnPage){
  ImageObject.previousImages.push(leftImageCalculation,middleImageOnPage,rightImageOnPage);
  var leftImageCalculation = leftImageOnPage.clicks / leftImageOnPage.timeShown;
  var middleImageCalcuation = middleImageOnPage.clicks / middleImageOnPage.timeShown;
  var rightImageCalcualtion = rightImageOnPage.clicks / rightImageOnPage.timeShown;
  console.log(leftImageCalculation);
  console.log(rightImageCalcualtion);
  console.log(middleImageCalcuation);

  return[leftImageCalculation,middleImageCalcuation,rightImageCalcualtion];
};




var buildChart = function(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: nameArr,
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};
allImageTag.addEventListener('click', handleClickOnImages);

new ImageObject('bag', './img/bag.jpg');
new ImageObject('banana', './img/banana.jpg');
new ImageObject('bathroom', './img/bathroom.jpg');
new ImageObject('boots', './img/boots.jpg');
new ImageObject('breakfast', './img/breakfast.jpg');
new ImageObject('bubblegum', './img/bubblegum.jpg');
new ImageObject('chair', './img/chair.jpg');
new ImageObject('cthulhu', './img/cthulhu.jpg');
new ImageObject('dog-duck', './img/dog-duck.jpg');
new ImageObject('dragon', './img/dragon.jpg');
new ImageObject('pen', './img/pen.jpg');
new ImageObject('pet-sweep', './img/pet-sweep.jpg');
new ImageObject('scissors', './img/scissors.jpg');
new ImageObject('shark', './img/shark.jpg');
new ImageObject('sweep', './img/sweep.png');
new ImageObject('tauntaun', './img/tauntaun.jpg');
new ImageObject('unicorn', './img/unicorn.jpg');
new ImageObject('usb', './img/usb.gif');
new ImageObject('water', './img/water-can.jpg');
new ImageObject('wine', './img/wine-glass.jpg');

console.log(ImageObject.allImages);

leftImageOnPage = ImageObject.allImages[0];
middleImageOnPage = ImageObject.allImages[1];
rightImageOnPage = ImageObject.allImages[2];
console.log(globalClickCount);


clickNewImages();




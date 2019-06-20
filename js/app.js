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
//These are extraction Arrays
var nameArr = [];
var percentageArr = [];
var clicksArr = [];
var timeShownArr = [];
var chartColorArr = [];
var chartBorderColorArr = [];
//These Variables will represent the images on the page at the moment
var leftImageOnPage;
var middleImageOnPage;
var rightImageOnPage;
var imageObjectString;
var changeGlobalCount = 50;
var myChart;
//This is where the image object constructor will be
var ImageObject = function(name,imageSrc){
  this.name = name;
  this.url = imageSrc;
  this.clicks = 0;
  this.timeShown = 0;
  this.percentage = 0;
  this.chartColor ;
  this.chartBorderColor;
  ImageObject.allImages.push(this);
};


ImageObject.allImages = [];
ImageObject.previousImages = [];
//This extracts the data I will use for my chart
var dataExtractor = function(){
  if(nameArr[0]){
    for(var j = 0; j < ImageObject.allImages; j++){
      percentageArr[j] = ImageObject.allImages[j].percentage;
    }
  }
  else{
    for(var i = 0; i < ImageObject.allImages.length; i++){
      nameArr.push(ImageObject.allImages[i].name);
      percentageArr.push(Math.floor(ImageObject.allImages[i].percentage));
      clicksArr.push(ImageObject.allImages[i].clicks);
      timeShownArr.push(ImageObject.allImages[i].timeShown);
      chartColorArr.push(ImageObject.allImages[i].chartColor);
      chartBorderColorArr.push(ImageObject.allImages[i].chartBorderColor);
      if(ImageObject.allImages[i].percentage === isNaN){
        ImageObject.allImages[i].percentage = 0 + '%';
      }
    }
  }
};
//This fuction will reneder the images while checking for dups
var renderImages = function(leftIndex,middleIndex,rightIndex){
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
//This will render again if somethings are dups
var renderAgain = function(leftIndex,middleIndex,rightIndex){
  leftIndex = Math.floor(Math.random()*ImageObject.allImages.length);
  middleIndex = Math.floor(Math.random()*ImageObject.allImages.length);
  rightIndex = Math.floor(Math.random()*ImageObject.allImages.length);
  renderImages(leftIndex,middleIndex,rightIndex);
};
//This function will give the use images to click
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
  // calculation(leftImageOnPage,middleImageOnPage,rightImageOnPage);
  renderImages(leftIndex,middleIndex,rightIndex);
};
//This will handle the event and keep track of the images that were clicked
var handleClickOnImages = function(event){

  if(globalClickCount < changeGlobalCount){
    var imageClicked = event.target;
    var id = imageClicked.id;
    if(id === 'left_img' || id === 'middle_img' || id === 'right_img'){

      if(id === 'left_img'){
        calculation(leftImageOnPage);
        leftImageOnPage.clicks++;
      }
      if(id === 'middle_img'){
        calculation(middleImageOnPage);
        middleImageOnPage.clicks++;
      }
      if(id === 'right_img'){
        calculation(rightImageOnPage);
        rightImageOnPage.clicks++;
      }
      leftImageOnPage.timeShown++;
      middleImageOnPage.timeShown++;
      rightImageOnPage.timeShown++;
      clickNewImages();
    }
  }
  if( JSON.parse(localStorage.getItem('Click Count'))){
    if(globalClickCount < JSON.parse(localStorage.getItem('Click Count'))){
      buildChart();
    }
  }
  if(JSON.parse(localStorage.getItem('Click Count'))){
    globalClickCount = JSON.parse(localStorage.getItem('Click Count'));
  }
  globalClickCount++;
  localStorage.setItem('Click Count', JSON.stringify(globalClickCount));
  console.log(globalClickCount);
  if(globalClickCount >= changeGlobalCount){
    allImageTag.removeEventListener('click', handleClickOnImages);
    localStorage.clear();
  }
  if(globalClickCount === 25){
    random_bg_color();
    dataExtractor();
    buildChart();
  }
  if(globalClickCount > 25){
    console.log('this is the chart update');
    dataExtractor();
    myChart.update();
  }
  imageObjectString = JSON.stringify(ImageObject.allImages);
  localStorage.setItem('imageObjectString', imageObjectString);
};
//This will handle the caluclations for the percentages
var calculation = function(ImageOnPage){
  ImageOnPage.percentage = ImageOnPage.clicks / ImageOnPage.timeShown * 100;
};
//This will allow the chart to use random colors
function random_bg_color() {
  for(var i = 0; i < ImageObject.allImages.length;i++){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var bgColor = 'rgba(' + r + ',' + g + ',' + b +',' +0.2 + ')';
    var borderColor = 'rgba(' + r + ',' + g + ',' + b +',' +1 +')';
    ImageObject.allImages[i].chartColor = bgColor;
    ImageObject.allImages[i].chartBorderColor = borderColor;
  }
}
var buildChart = function(){
  var ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: nameArr,
      datasets: [{
        label: '% of Votes',
        data: percentageArr,
        backgroundColor: chartColorArr,
        borderColor:chartBorderColorArr,
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
var imageBuild = function(){
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
};

var startApp = function(){

  console.log(ImageObject.allImages);
  if(JSON.parse(localStorage.getItem('imageObjectString')) === null){
    imageBuild();
    leftImageOnPage = ImageObject.allImages[0];
    middleImageOnPage = ImageObject.allImages[1];
    rightImageOnPage = ImageObject.allImages[2];
    console.log(ImageObject.allImages + ' Created');
  }

  else{
    var ImageObjectString = localStorage.getItem('imageObjectString');
    ImageObject.allImages = JSON.parse(ImageObjectString);
    console.log(ImageObject.allImages+ ' Copied from LS');
  }
};

startApp();





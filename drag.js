var raceType;
var nav1 = document.getElementById("mainPage");
var nav2 = document.getElementById("scalePage");
var nav3 = document.getElementById("settingsPage");
var ruleset = "tinyTruck"; 

window.onload = function() {
  // find the element that you want to drag.
  var box = document.getElementById('box');
  var circle1 = document.getElementById('circle1');
  var circle2 = document.getElementById('circle2');
  /* listen to the touchMove event,
  every time it fires, grab the location
  of touch and assign it to box */
  
  box.addEventListener('touchmove', function(e) {
    // grab the location of touch
    var touchLocation = e.targetTouches[0];
    box.style.width = '60vw';
    // assign box new coordinates based on the touch.
    box.style.left = touchLocation.pageX - box.width/2 + 'px';
    box.style.top = touchLocation.pageY - box.height/2 + 'px';
  })
  
  /* record the position of the touch
  when released using touchend event.
  This will be the drop position. */
  
  box.addEventListener('touchend', function(e) {
    // current box position.
    var x = parseInt(box.style.left);
    var y = parseInt(box.style.top);
    circle1.offsetBottom = circle1.offsetTop + circle1.offsetHeight;
    circle1.offsetRight = circle1.offsetLeft + circle1.offsetWidth;
    box.offsetBottom = box.offsetTop + box.offsetHeight;
    box.offsetRight = box.offsetLeft + box.offsetWidth;
    if(!(box.offsetLeft > (circle1.offsetLeft + 35) || box.offsetRight < circle1.offsetRight - 30 || box.offsetTop < circle1.offsetTop-30 || box.offsetBottom > circle1.offsetBottom+30)){
      console.log("inside Circle 1");
      box.style.width = '40vw';
      box.style.left = circle1.offsetLeft + 'px'
      var raceType = "fun";
      sessionStorage.setItem("raceType", raceType);
      document.getElementById("startPage").style.display = "none";
      document.getElementById("mainPage").style.display = "flex";

      
    }
    else if(!(box.offsetLeft > (circle2.offsetLeft + 35) || box.offsetRight < circle2.offsetRight - 30 || box.offsetTop < circle2.offsetTop-30 || box.offsetBottom > circle2.offsetBottom+30)){
      console.log("inside Circle 2");
      box.style.width = '40vw';
      box.style.left = circle2.offsetLeft + 'px'
      var raceType = "competitive";
      sessionStorage.setItem("raceType", raceType);
      document.getElementById("startPage").style.display = "none";
      nav1.style.display = "flex";
    
    }
    else{
      box.style.width = "50vw"
    }
    console.log(raceType);
  if(raceType=="fun"){
  
  }else if(raceType=="competitive"){
    document.querySelector('.scalePointsNav').style.display = "none";
  }

    
  })
  
}


//Nav1 clicked
function nav1click(){
  nav1.style.display = "flex";
  nav2.style.display = "none";
  nav3.style.display = "none";
}
//Nav2 clicked
function nav2click(){
  nav1.style.display = "none";
  nav2.style.display = "flex";
  nav3.style.display = "none";
}
//Nav2 clicked
function nav3click(){
  nav1.style.display = "none";
  nav2.style.display = "none";
  nav3.style.display = "flex";
}

if(ruleset=="tinyTruck"){
  fetch("./rulesets.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    for(var i=0; i<data.tinyTruckChallenge.length; i++){
      console.log(data.tinyTruckChallenge[i].name);
    }
  });
}

// fetch("./rulesets.json")
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     for(var i; i<data.tinyTruckChallenge; i++){
//       console.log(i.name);
//     }
//   });
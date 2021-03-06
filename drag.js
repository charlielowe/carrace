var raceType;
var nav1 = document.getElementById("mainPage");
var nav2 = document.getElementById("scalePage");
var nav3 = document.getElementById("settingsPage");
var navs = document.getElementById("scoreboardPage");
var ruleset = "sorrca2021"; 
var mainPage = document.getElementById("mainPage");
var scalePage = document.getElementById("scalePage");
var pillDiv = document.getElementById("pillsDiv");
var totalPoints = document.getElementById("totalPoints");
var scaleP = document.getElementById("scalePointText");
var poitnsT = 0;
var scalePoints = 0;
totalPoints.innerHTML = poitnsT;
scaleP.innerHTML = scalePoints;
var ischecked = false;
var raceType;
var rounds = [0];
var players = [0];
var currentRound = 0;
var playerList = [];
var currentPlayer = 0;
var scoreMain = document.getElementById("scoreMain");
var tempArray = [];

window.onload = function() {
  // find the element that you want to drag.
  var box = document.getElementById('box');
  var circle1 = document.getElementById('circle1');
  var circle2 = document.getElementById('circle2');
  renderRounds()
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
      box.style.width = '40vw';
      box.style.left = circle1.offsetLeft + 'px'
      raceType = "fun";
      sessionStorage.setItem("raceType", raceType);
      document.getElementById("startPage").style.display = "none";
      document.getElementById("mainPage").style.display = "flex";
      document.getElementById("changeRulesButton").style.display = "none";
      
    }
    else if(!(box.offsetLeft > (circle2.offsetLeft + 35) || box.offsetRight < circle2.offsetRight - 30 || box.offsetTop < circle2.offsetTop-30 || box.offsetBottom > circle2.offsetBottom+30)){
      box.style.width = '40vw';
      box.style.left = circle2.offsetLeft + 'px'
      raceType = "competitive";
      sessionStorage.setItem("raceType", raceType);
      document.getElementById("startPage").style.display = "none";
      nav1.style.display = "flex";
    
    }
    else{
      box.style.width = "50vw"
    }
  if(raceType=="competitive"){
    
  }else if(raceType=="fun"){
    document.querySelector('.scalePointsNav').style.display = "none";
    document.querySelector('.addRound').style.display = "none";
    document.querySelector('.addPlayer').style.display = "none";
  }

    
  })
  
}


//Nav1 clicked
function nav1click(){
  if(raceType=="fun"){
    document.querySelector('.scalePointsNav').style.display = "none";
    
  }
  nav1.style.display = "flex";
  nav2.style.display = "none";
  nav3.style.display = "none";

}

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const scoreA = a.score;
  const scoreB = b.score;

  let comparison = 0;
  if (scoreA > scoreB) {
    comparison = 1;
  } else if (scoreA < scoreB) {
    comparison = -1;
  }
  return comparison;
}

function navSclick(){
  if(raceType=="fun"){
    document.querySelector('.scalePointsNav4').style.display = "none";
  }
  nav1.style.display = "none";
  nav2.style.display = "none";
  nav3.style.display = "none";
  navs.style.display = "flex";

  scoreMain.innerHTML = "";
  var totalArray = [];

  for(var i=0; i<playerList.length; i++){
    var totalScore = 0;
    for(var e=0; e<playerList[i].score.length;e++){
      totalScore+=playerList[i].score[e];
    }
    totalArray.push({
      "name":playerList[i].name,
      "score":totalScore
    })
  }
  totalArray.sort(compare);
  for(var i=0; i<totalArray.length; i++){
    var scoreDiv = document.createElement("p");
    scoreDiv.innerHTML = (totalArray[i].name + " : " + totalArray[i].score);
    scoreMain.appendChild(scoreDiv);
  }
}



//ruleset display
 function resetRules(){
   document.getElementById("currentRules").innerHTML = ruleset;
  fetch("./rulesets.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    if(ruleset == "tinyTruckChallenge"){
      
      var jData = data.tinyTruckChallenge;
    }else if(ruleset == "sorrca2021"){
      var jData = data.sorrca2021;
    }
    pillDiv.innerHTML = "";
    for(var i=0; i<jData.length; i++){
      var count = 0;
      var div1 = document.createElement("div");
      div1.id = "penaltyPill";

      var p2 = document.createElement("p");
      p2.id = "pillText";
      p2.innerHTML = jData[i].name + " (" + jData[i].penalty + ")";
      

      var div2 = document.createElement("div");
      div2.id = "pillRight";
      
      var p3 = document.createElement("p");
      p3.id = "pillCount" + i;
      p3.innerHTML = count;

      var div3 = document.createElement("div");
      div3.id = i;
      div3.className = "pillPlus";
      div3.setAttribute("name", jData[i].penalty);

      var p4 = document.createElement("p");
      p4.innerHTML = "+";

      var div4 = document.createElement("div");
      div4.id = i;
      div4.className = "pillMinus";
      div4.setAttribute("name", jData[i].penalty);

      var p5 = document.createElement("p");
      p5.innerHTML = "-";

      div4.appendChild(p5);
      div3.appendChild(p4);
      div2.appendChild(p3);
      div2.appendChild(div3);
      div2.appendChild(div4);
      div1.appendChild(p2);
      div1.appendChild(div2);
      pillsDiv.appendChild(div1);
    }

    var pillElements = document.getElementsByClassName("pillPlus");
    var getClassOfElement = function() {
      var attribute = this.id;
      var name = this.getAttribute("name");
      var nameInt = parseInt(name);
      var newCount = document.getElementById(`pillCount${attribute}`).innerHTML;
      var newcountint = parseInt(newCount);
      newcountint+=1;
      document.getElementById(`pillCount${attribute}`).innerHTML = newcountint;
      poitnsT+=nameInt;
      totalPoints.innerHTML = poitnsT;
      playerList[currentPlayer].score[currentRound] = poitnsT;
     };

    for (var i = 0; i < pillElements.length; i++) {
      pillElements[i].addEventListener('click', getClassOfElement, false);
    }

    var pillElements2 = document.getElementsByClassName("pillMinus");
    var getClassOfElement = function() {
      var attribute = this.id;
      var name = this.getAttribute("name");
      var nameInt = parseInt(name);
      var newCount = document.getElementById(`pillCount${attribute}`).innerHTML;
      var newcountint = parseInt(newCount);
      newcountint-=1;
      document.getElementById(`pillCount${attribute}`).innerHTML = newcountint;
      poitnsT-=nameInt;
      totalPoints.innerHTML = poitnsT;
      playerList[currentPlayer].score[currentRound] = poitnsT;
     };

    for (var i = 0; i < pillElements.length; i++) {
      pillElements2[i].addEventListener('click', getClassOfElement, false);
    }

  });
}
resetRules()

  //scalepoint display

  //Nav2 clicked
function nav2click(){
  
  nav1.style.display = "none";
  nav2.style.display = "flex";
  nav3.style.display = "none";
  navs.style.display = "none";
}


  

  fetch("./scalepoints.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    // if(ruleset == "tinyTruckChallenge"){
      
      var jData = data.tinyTruckChallenge;
    // }else if(ruleset == "sorrca2021"){
    //   var jData = data.sorrca2021;
    // }
    
    for(var i=0; i<jData.length; i++){
      var scaleWholeDiv = document.createElement("div");
      scaleWholeDiv.id = "scaleWhole";
      scaleWholeDiv.className = "scaleWhole"+i;

      var scalePillDiv = document.createElement("div");
      scalePillDiv.id = "scalePill";
      
      var scaleText = document.createElement("p")
      scaleText.id="scaleText";
      scaleText.innerHTML = jData[i].name;

      var scaleRightDiv= document.createElement("div");
      scaleRightDiv.id ="scaleRight"
      
      // var checkInput= document.createElement("input");
      // checkInput.id ="myCheckBox"+i;
      // checkInput.type = "checkbox"
      // checkInput.style.display = "none";
      
      
      var checkLabel= document.createElement("label");
      checkLabel.id = i;
      checkLabel.className = "checklabel"
      checkLabel.setAttribute("for", "myCheckbox");
      

      var checkArrow= document.createElement("img");
      checkArrow.id ="checkArrow"+i;
      checkArrow.src = "images/arrowLeft.svg"
      checkArrow.alt = "arrow facing left";

      var pillDrop = document.createElement("div");
      pillDrop.id = "pillDrop"+i;
      
      pillDrop.setAttribute("class", "pillDrop");
      pillDrop.style.display = "none";
      
      for(var e=0; e<jData[i].penalties.length; e++){
        var pillPen = document.createElement("div");
        pillPen.id = "pillPen";
        pillPen.className = "pillPen"+i;
        pillPen.setAttribute("name", jData[i].penalties[e].penalty); 
      
        var pillPenText = document.createElement("p");
        pillPenText.innerHTML = jData[i].penalties[e].name + " ("+ jData[i].penalties[e].penalty + ")";

        var justCheck = document.createElement("input");
        justCheck.type = "checkbox";
        justCheck.id = i;
        justCheck.setAttribute("name", jData[i].penalties[e].penalty)
        justCheck.className = "justCheck";
        
        pillPen.appendChild(pillPenText);
        pillPen.appendChild(justCheck);
        pillDrop.appendChild(pillPen);
      }
      
      // scaleRightDiv.appendChild(checkInput);
      checkLabel.appendChild(checkArrow);
      scaleRightDiv.appendChild(checkLabel);
      scalePillDiv.appendChild(scaleText);
      scalePillDiv.appendChild(scaleRightDiv);
      scaleWholeDiv.appendChild(scalePillDiv);
      scaleWholeDiv.appendChild(pillDrop);
      document.getElementById("scaleHolder").appendChild(scaleWholeDiv);
      
    }

    var scaleElements = document.getElementsByClassName("checklabel");
    var getClassOfScaleElement = function() {
      var number = this.id;
     
      if(document.getElementById("checkArrow"+number)){

        document.getElementById("checkArrow"+number).id = "checkArrowTrue"+number;
        document.getElementById("pillDrop"+number).style.display = "flex";
        
        
       
        document.querySelector(".scaleWhole"+number).style.marginBottom = document.getElementById("pillDrop"+number).offsetHeight + "px";
      }
      else{
        document.getElementById("pillDrop"+number).style.display = "none";
        document.getElementById("checkArrowTrue"+number).id = "checkArrow"+number;
        document.querySelector(".scaleWhole"+number).style.marginBottom = "3%";
      }

    
    for (var i = 0; i < checks.length; i++) {
      checks[i].addEventListener('click', getCheck, false);
    }
     };
     
    
     var checks = document.getElementsByClassName("justCheck");
     var getCheck = function(){
         if(this.checked == true){
          
           scalePoints += parseInt(this.getAttribute("name"));
           scaleP.innerHTML = scalePoints;
           poitnsT+=parseInt(this.getAttribute("name"));
           totalPoints.innerHTML = poitnsT;
           playerList[currentPlayer].score[currentRound] = poitnsT;
           playerList[currentPlayer].scale[currentRound] = scalePoints;
           
         }else{
           scalePoints -= parseInt(this.getAttribute("name"));
           scaleP.innerHTML = scalePoints;
           poitnsT-=parseInt(this.getAttribute("name"));
           totalPoints.innerHTML = poitnsT;
           playerList[currentPlayer].score[currentRound] = poitnsT;
           playerList[currentPlayer].scale[currentRound] = scalePoints;
         }
 
   }
   

    for (var i = 0; i < scaleElements.length; i++) {
      scaleElements[i].addEventListener('click', getClassOfScaleElement, false);
    }

    
  });


  //Nav3 clicked
  function nav3click(){
    if(raceType=="fun"){
      document.querySelector('.scalePointsNav3').style.display = "none";
      
    }
    document.getElementById("settingsMain").style.display = "flex";
    document.getElementById("changeRulesPage").style.display = "none";
    nav1.style.display = "none";
    nav2.style.display = "none";
    nav3.style.display = "flex";
    
    
}

function changeRulesPage(){
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("changeRulesPage").style.display = "flex";

}

function rulesetChange(newruleset){
  ruleset = newruleset;
  scalePoints = 0;
  for(var i=0; i<playerList.length; i++){
    playerList[i].score = [];
    playerList[i].scale = [];
  }
  scaleP.innerHTML = scalePoints;
  poitnsT=0;
  totalPoints.innerHTML = poitnsT;
  nav1click();
  resetChecks();
  resetRules();
}

function resetChecks(){
  var checks = document.getElementsByClassName("justCheck");
  
  for (var i = 0; i < checks.length; i++) {
    checks[i].checked = false;
  } 
  }
 
function resetScore(){
  scalePoints = 0;
  scaleP.innerHTML = scalePoints;
  for(var i=0; i<playerList.length; i++){
    playerList[i].score = [];
    playerList[i].scale = [];
  }
  
  poitnsT=0;
  totalPoints.innerHTML = poitnsT;
  nav1click();
  resetChecks();
  resetRules();
}

function newRound(){
  var option = document.createElement("option");
  option.setAttribute("value", rounds.length)
  option.innerHTML = rounds.length;
  document.getElementById("rounds").appendChild(option);
  
  var roundDiv = document.createElement("div");
  roundDiv.id = "round" + rounds.length;
  var roundP = document.createElement("p");
  roundP.innerHTML = "Round" + rounds.length;
  roundDiv.appendChild(roundP);
  scoreMain.appendChild(roundDiv);
  rounds.push(rounds.length);
  for(var i=0; i<playerList.length;i++){
    playerList[i].score.push(0);
    playerList[i].scale.push(0);
  }
}


function newPlayer(){
  var option = document.createElement("option");
  option.setAttribute("value", players.length)
  option.innerHTML = "Player" + players.length;
  document.getElementById("players").appendChild(option);
  playerList[players.length-1] = new Player("player"+players.length, [], []);
  
  for(var i=0; i<rounds.length; i++){
    playerList[players.length-1].score.push(0);
    playerList[players.length-1].scale.push(0);
  }
  players.push(players.length);
  
}

function renderRounds(){
  document.getElementById("rounds").innerHTML = "";
  for(var i=0; i<rounds.length; i++){
    var option = document.createElement("option");
    option.setAttribute("value", rounds[i])
    option.innerHTML = rounds[i];
    document.getElementById("rounds").appendChild(option);
  }
}

function submitRounds(){
  currentRound = parseInt(document.getElementById("rounds").value);
  poitnsT = playerList[currentPlayer].score[currentRound];
  scalePoints = playerList[currentPlayer].scale[currentRound];
  scaleP.innerHTML = scalePoints;
  totalPoints.innerHTML = poitnsT;
  nav1click();
  resetChecks();
  resetRules();
}

class Player {
  constructor(name, score, scale) {
    this.name = name;
    this.score = score;
    this.scale = scale;
  }
}

function submitPlayers(){
  currentPlayer = parseInt(document.getElementById("players").value) -1;
  poitnsT = playerList[currentPlayer].score[currentRound];
  scalePoints = playerList[currentPlayer].scale[currentRound];
  scaleP.innerHTML = scalePoints;
  totalPoints.innerHTML = poitnsT;
  nav1click();
  resetChecks();
  resetRules();
}
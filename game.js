var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var clickedPattern = [];

var start = false;
var level = 0;

$(document).click(function() {
  if (!start) {
    $("#level").text("Level " + level);
    newSequence();
    start = true;
  }
});

$(".btn").click(function() {
  var chosenColour = $(this).attr("id");
  clickedPattern.push(chosenColour);
  playSound(chosenColour);
  animatePress(chosenColour);
  checkAnswer(clickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === clickedPattern[currentLevel]) {

    if (clickedPattern.length === gamePattern.length){

      setTimeout(function () {
        newSequence();
      }, 1000);

    }

  } else if(level>0) {
    playSound("wrong");

    $("body").addClass("game-over");
    $("#level").text("Game Over, Click Anywhere to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
      startOver();
    }, 2000);
  }
}

function newSequence() {
  clickedPattern=[];
  level++;
  $("#level").text("Level " + level);
  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function playSound(name) {
  if(level>0) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
}

function animatePress(currentColor) {
  if(level>0) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}

var gamePattern = [];
var userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var randomNumber;
var randomChosenColour;
var userChosenColour;
var isStarted = false;

$(document).on("keydown", function() {
  if (!isStarted) {
    nextSequence();
    isStarted = true;
  }
});

$(".btn").on("click", function() {
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  const lastCurrentLevel = userClickedPattern.length;
  checkAnswer(lastCurrentLevel);
}); 

function nextSequence() {
  userClickedPattern = [];  

  $("#level-title").text(`Level ${++level}`);

  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  showFlash(randomChosenColour);
  playSound(randomChosenColour);
}

function playSound(name) {
  const folderPath = "sounds/", mp3 = ".mp3";
  const button = new Audio(folderPath + name + mp3);      
  button.play();
}

function showFlash(currentColour) {
  $(`.${currentColour}`).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function() {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
    console.log("Success!");
    
    if (currentLevel === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("Wrong!");

    $("#level-title").text(`Game Over, Press Any Key to Restart`);

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    playSound("wrong");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  isStarted = false;
}
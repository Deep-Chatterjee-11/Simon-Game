


/************    Simon Game Code   ************/

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var toggle = false;

$(document).keydown(function() {
    if (!toggle) {
      $("#level-title").text("Level " + level);
      nextSequence();
      toggle = true;
    }
});
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


//Random Number Generation
function nextSequence() {
    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);     

    //button flash animation    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //playing audio for next sequence button
    playSound(randomChosenColour);
}


//function to play sound for buttons 
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

//function for user pressing button animation
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//function to check answer
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    
    else{
        console.log("Wrong");
        
        var wrong_audio = new Audio("./sounds/wrong.mp3");
        wrong_audio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//when user is wrong, to restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    toggle = false;
}   

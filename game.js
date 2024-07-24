var gamePattern = [];
var userClickedPattern = [];
var colorArray = ["green", "red", "yellow", "blue"];
var level = 0;
var started = false;

$(document).keypress( function (event) {
    if(!started) {
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    
    // Adds the animation when user clicked the button
    $("#" + userChosenColor).addClass("pressed");
    setTimeout(function () {
        $("#" + userChosenColor).removeClass("pressed");
    }, 100);

    // Checks the answer with the gamePattern
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    userClickedPattern = [];

    // Gives a random number between 0-3
    var randomNumber = Math.floor(Math.random() * 4); 
    
    // According to the number, selects a color
    var randomColor = colorArray[randomNumber];
    
    // Creates the color pattern (e.g. blue-red-red-yellow)
    gamePattern.push(randomColor);
    
    // Adds an animation to the box with the selected color
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function () {
            $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
            
            // Adds the sound corresponding to the color
            playSound(gamePattern[i]);
        }, 500 * i);
    }
    
    
    $("h1").text("Level " + level);

    level++;
}

function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        restart();
    }
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function restart () {
    gamePattern = [];
    level = 0;
    started = false;
}
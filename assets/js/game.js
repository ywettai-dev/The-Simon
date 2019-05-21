var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

/* Predefined started as false so that 
the nextSequence() will not be called again 
even when another key has pressed
i.e when started is true*/

var started = false;

var level = 0;

$(document).keydown(function () {

    if (!started) {

        $("#level-title").text("Level " + level);

        nextSequence();

        started = true;

    }
});

$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatedPress(userChosenColor);

    //Passing the last index of the user clicked pattern
    checkAnswer(userClickedPattern.length - 1);

})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {

            //Call nextSequence() after delay of 1000milisec
            setTimeout(function () {

                nextSequence()

            }, 1000)
        }

    } else {

        //Play wrong.mp3 if the user answer if wrong
        playSound("wrong");

        //Apply game-over css class
        $("body").addClass("game-over");

        //Remove it after 200milisec
        setTimeout(function () {

            $("body").removeClass("game-over");

        }, 200)

        //Update h1 title to Game Over
        $("h1").text("Game Over, Press Any Key to Restart!")

        //Call startOver() to reset variables
        startOver();

    }

}


//Create Random color sequence for game pattern
function nextSequence() {

    //Make user ready for next level
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    //Generate random color sequence
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    var keyButton = "#" + randomChosenColor;

    //Add animation to alert random color box
    $(keyButton).delay(100).fadeOut().fadeIn('slow');

    //Play random sound corresponds to the predefined color
    playSound(randomChosenColor);

}

function playSound(name) {

    //Make sound with Audio('url') and .play() method

    var makeSound = new Audio('./sounds/' + name + '.mp3');

    makeSound.play();
}

//Add animated to the pressed color box with the predefiend css class 
function animatedPress(currentColor) {

    $("." + currentColor).addClass("pressed");

    setTimeout(function () {
        $("." + currentColor).removeClass("pressed")
    }, 100)
}

//Reset level, gamepattern and started value
function startOver() {

    level = 0;

    gamePattern = [];

    started = false;

}
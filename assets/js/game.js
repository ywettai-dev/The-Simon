var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

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

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    var keyButton = "#" + randomChosenColor;

    $(keyButton).delay(100).fadeOut().fadeIn('slow');

    playSound(randomChosenColor);

}

function playSound(name) {

    //Make sound

    var makeSound = new Audio('./sounds/' + name + '.mp3');

    makeSound.play();
}

function animatedPress(currentColor) {

    $("." + currentColor).addClass("pressed");

    setTimeout(function () {
        $("." + currentColor).removeClass("pressed")
    }, 100)
}

function startOver(){

    level = 0;

    gamePattern = [];

    started = false;

}
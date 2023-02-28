var colorOptions = ["green", "red", "yellow", "blue"];
var colorSequence = [];
var userSequence = [];
var level = 0
var hasStarted = false

// -------------------------------------- EventListener - Starting the game when pressing a key
$(document).keydown(function () {
    if (!hasStarted) {
        createSequence();
        $("h1").text(`Level ${level}`);
        hasStarted = true;
    }
});

// -------------------------------------- EventListener - Make sound when a user clicks a button
$("div.btn").click(function () {
    // var userSelection = $(this).attr("id");
    var userSelection = this.id;
    userSequence.push(userSelection);

    playSound(userSelection);
    AnimateButtonPressed(userSelection);
    checkButtonPressed(userSequence.length - 1)
});

// -------------------------------------- Function - Create a random number
function computeRandomNumber() {
    return Math.floor(Math.random() * 4);
}

// -------------------------------------- Function - Play sound
function playSound(color) {
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

// -------------------------------------- Function - Create/expand a sequence
function createSequence() {
    // Increasing the level counter. Updating the h1
    level++;
    $("h1").text(`Level ${level}`);

    //User's sequence must be cleared 
    userSequence = []

    // Append a random color in the sequence
    var randomColor = colorOptions[computeRandomNumber()];
    colorSequence.push(randomColor);

    // Flash random button and play its sound
    $(`div#${randomColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

// -------------------------------------- Function - Change CSS properties when clicking a button
function AnimateButtonPressed(color) {
    $(`div#${color}`).addClass("pressed");
    setTimeout(function () {
        $(`div#${color}`).removeClass("pressed");
    }, 100);
}

// -------------------------------------- Function - Check pressed button
function checkButtonPressed(level) {
    // User clicked on the right button
    if (userSequence[level] === colorSequence[level]) {

        // The sequence has finished for this level. Add some difficulty
        if (userSequence.length === colorSequence.length) {
            setTimeout(function () {
                createSequence()
            }, 1000);
        }
    } else {
        // Playing the loosing sound
        playSound("wrong")

        // Adding some effects to the interface for when loosing
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        // Starting over
        startOver();
    }
}

// -------------------------------------- Function - Start Over
function startOver() {
    level = 0;
    colorSequence = [];
    hasStarted = false;
}
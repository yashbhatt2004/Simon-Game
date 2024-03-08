var buttonColours = ["green", "red", "yellow", "blue"]
var gamePattern = [];
var userClickedPattern = [];
var score = 0; 

function playSound(color) {
    var buttonSound = new Audio("sounds/" + color + ".mp3");
    buttonSound.play();
}

function nextSequence() {
    $("#score-title").text("Score " + score);
    score++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $(".btn").eq(randomNumber).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animateClick(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 10)
}

function gameStart() {
    score=0;
    $("body").on("keydown", function () {
        nextSequence();
        $("body").off();
    })
}
function gameOver() {
    var wrongSound=new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("#score-title").html("<p>Game Over!</p> <p>Press Any Key To Restart</p>");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
    },100)
    gamePattern.length=0;
    userClickedPattern.length=0;
    gameStart();
}
function checkPattern(gamePattern, userClickedPattern,userChosenColor) {
    if (gamePattern.length==0)
    {
        gameOver();
    }
    for (var i = 0; i < Math.min(userClickedPattern.length, gamePattern.length); i++) {
        if (gamePattern[i] == userClickedPattern[i]) {
            playSound(userChosenColor)
            if (i == gamePattern.length - 1) {
                setTimeout(function(){
                    nextSequence();
                },1000);
                userClickedPattern.length = 0;
            }
        }
        else
        {
            gameOver();
        }
    }
}
gameStart();
$(".btn").on("click", function (e) {
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    animateClick(userChosenColor);
    checkPattern(gamePattern, userClickedPattern,userChosenColor);

})

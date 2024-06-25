let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red","blue","green","yellow"]
let level = 0;
let gameStarted = false;

$(document).keydown(function(){
    if(!gameStarted){
        $(`#level-title`).text(`Level ${level}`)
        nextSequence();
        gameStarted = true;
    }
})


$(".btn").click(function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor)
    console.log(userClickedPattern);
    console.log(gamePattern);
    playSound(userChosenColor)
    // $(`.${userChosenColor}`).fadeIn().fadeOut().fadeIn();
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1)
    
 })

 function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
            nextSequence();
        },1000)
        }
    }

    else{
        console.log("wrong");
        var wrong = new Audio(`./sounds/wrong.mp3`)
        wrong.play()
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over") 
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
    }
 }

function nextSequence(){
    userClickedPattern = [];
    level++;
     $("#level-title").text(`Level ${level}`)
     console.log(level);

    let randomNumber = Math.floor((Math.random())*4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    console.log(randomChosenColor)


    //to add flash
     $(`#${randomChosenColor}`).fadeIn().fadeOut().fadeIn();
     playSound(randomChosenColor); 
    

     
    //to add audio according to color     
    // var randomAudio = new Audio(`./sounds/${randomChosenColor}.mp3`)
    //  randomAudio.play()

}
function playSound(name){
    var randomAudio = new Audio(`./sounds/${name}.mp3`)
    randomAudio.play()
   
}
function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(()=>{
    $(`#${currentColor}`).removeClass("pressed");
    },100)
}
console.log("Gp "+gamePattern);
console.log("User "+userClickedPattern);
function startOver(){
    level = 0;
    gamePattern = []
    gameStarted = false;
}
     




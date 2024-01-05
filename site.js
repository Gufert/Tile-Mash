let orderArray = [];
let keys = ["d", "f", "j", "k"];
let score = 0;
let highScore = 0;
let gameTime = 0;
let gameOver = true;

let scoreCount = document.getElementById("score-count");
let grid = document.getElementById("tile-grid");
let high = document.getElementById("high-score-count");
let countDown = document.getElementById("countdown");
let startButton = document.getElementById("start");
let checked = document.getElementById("checkbox");
let time = document.getElementById("time-rem");

function siteLoad(){
    if(localStorage.getItem("high-score")){
        highScore = Number(localStorage.getItem("high-score"));
        high.innerHTML = highScore;
    }
    for(let i = 0; i < 6; i++){
        addRow();
    }
}
siteLoad();

function start(){
    startButton.disabled = true;
    if(checked.checked){
        reset();
    }
    else{
        countDown.style.display = "flex";
        var seconds = 3;
        countDown.innerHTML = 3;
        var interval = setInterval(function() {
            countDown.innerHTML = --seconds;
        
            if (seconds <= 0)
            {
                clearInterval(interval);
                countDown.style.display = "none";
                reset();
            }
        }, 1000);
    }
}

function reset(){
    gameOver = false;
    orderArray = [];
    score = 0;
    scoreCount.innerText = score;
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    }
    for(let i = 0; i < 6; i++){
        addRow();
    }
    startTimer();
}

function addRow(){
    let tileRow = document.createElement("div");
    tileRow.className = "tile-row";
    let color =  Math.floor(Math.random() * 4);
    orderArray.push(color);
    for(let i = 0; i < 4; i++){
        let tile = document.createElement("div");
        tile.className = "tile";
        if(color == i && !gameOver){
            tile.style["background-color"] = "blue";
        }
        else{
            tile.style["background-color"] = "rgb(150, 150, 150)";
        }
        tileRow.appendChild(tile);
    }
    grid.appendChild(tileRow);
}

function startTimer(){
    gameTime = 3;
    var interval = setInterval(function() {
        if(gameOver){
            clearInterval(interval);
        }
        else{
            gameTime = gameTime - 0.01;
            time.innerHTML = gameTime.toFixed(2);
    
            if (gameTime <= 0)
            {
                clearInterval(interval);
                grid.firstElementChild.children[orderArray[0]].style["background-color"] = "red";
                time.innerHTML = Number(0).toFixed(2);
                endGame();
            }
        }
    }, 10);
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if(gameOver){
        if(key == "Enter"){
            start();
        }
        else{
            return;
        }
    }
    if(keys.indexOf(key) == orderArray[0]){
        grid.removeChild(grid.firstElementChild);
        addRow();
        orderArray.shift();
        scoreCount.innerText = ++score;
        gameTime = gameTime + 0.15;
    }
    else if(keys.indexOf(key) != -1){
        grid.firstElementChild.children[keys.indexOf(key)].style["background-color"] = "red";
        endGame();
    }
});

function endGame(){
    gameOver = true;
    startButton.disabled = false;

    if(localStorage.getItem("high-score")){
        if(score > highScore){
            highScore = score;
            localStorage.setItem("high-score", highScore);
        }
    }
    else{
        localStorage.setItem("high-score", score);
        high.innerText = score;
    }
    high.innerHTML = highScore;
}

window.onbeforeunload = function(){
    localStorage.setItem("high-score", highScore);
}
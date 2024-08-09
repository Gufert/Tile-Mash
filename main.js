let orderArray = [];
let allKeys = ["a", "s", "d", "f", "j", "k", "l", ";"];
let keys = [];
let score = 0;
let highScore = 0;
let gameTime = 0;
let gameOver = true;
let rows = 0;
let keyCount = 0;

let grid = document.getElementById("tile-grid");
let countDown = document.getElementById("countdown");
let keysLine = document.getElementById("keys-line");
let time = document.getElementById("time-rem");
let scoreCount = document.getElementById("score-count");
let high = document.getElementById("high-score-count");
let startButton = document.getElementById("start");
let checkboxes = document.getElementsByClassName("settings-checkbox");
let output = document.getElementById("kc-value");
let slider = document.getElementById("kc-slider");

function siteLoad(){
    if(localStorage.getItem("high-score")){
        highScore = Number(localStorage.getItem("high-score"));
        high.innerHTML = highScore;
    }
    updateGameMode(slider.value);
}
siteLoad();

function updateGameMode(sliderValue){
    keyCount = sliderValue;
    output.innerHTML = keyCount;

    redrawGrid();
    setKeys();
}

function redrawGrid(){
    rows = keyCount;

    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    }
    for(let i = 0; i < 6; i++){
        addRow(rows);
    }
}

function addRow(rows){
    let tileRow = document.createElement("div");
    tileRow.className = "tile-row";
    let color =  Math.floor(Math.random() * rows);
    orderArray.push(color);
    for(let i = 0; i < rows; i++){
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

function setKeys(){
    keys = allKeys.slice((allKeys.length / 2) - (keyCount / 2), (allKeys.length / 2) + (keyCount / 2));

    while (keysLine.hasChildNodes()){
        keysLine.removeChild(keysLine.firstChild);
    }
    for(let i = 0; i < keys.length; i++){
        let keyLabel = document.createElement("div");
        keyLabel.className = "key";
        keyLabel.innerHTML = keys[i].toLocaleUpperCase();
        keysLine.appendChild(keyLabel);
    }
}

function start(){
    startButton.disabled = true;
    for (let el of checkboxes) el.disabled = true;
    slider.disabled = true;

    if(checkboxes[0].checked){
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
    redrawGrid();
    if(!checkboxes[1].checked){
        startTimer();
    }
}

function startTimer(){
    gameTime = 2;
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
    const key = event.key.toLowerCase();
    if(gameOver){
        if(key == "enter"){
            start();
        }
        else{
            return;
        }
    }
    if(keys.indexOf(key) == orderArray[0]){
        grid.removeChild(grid.firstElementChild);
        addRow(rows);
        orderArray.shift();
        scoreCount.innerText = ++score;
        gameTime = 2;
    }
    else if(keys.indexOf(key) != -1){
        grid.firstElementChild.children[keys.indexOf(key)].style["background-color"] = "red";
        endGame();
    }
});

function endGame(){
    gameOver = true;
    startButton.disabled = false;
    for (let el of checkboxes) el.disabled = false;
    slider.disabled = false;

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

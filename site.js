let orderArray = [];
let keys = ["d", "f", "j", "k"];
let score = 0;
let gameOver = true;

let scoreCount = document.getElementById("score-count");
let grid = document.getElementById("tile-grid");
let high = document.getElementById("high-score-count");
let countDown = document.getElementById("countdown");
let startButton = document.getElementById("start");

function siteLoad(){
    if(localStorage.getItem("high-score")){
        high.innerHTML = localStorage.getItem("high-score");
    }
    for(let i = 0; i < 6; i++){
        addRow();
    }
}
siteLoad();

function start(){
    startButton.disabled = true;
    countDown.style.display = "flex";
    var seconds = 3;
    countDown.innerHTML = 3;
    var interval = setInterval(function() {
        countDown.innerHTML = --seconds;
    
        if (seconds <= 0)
        {
            clearInterval(interval);
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
            countDown.style.display = "none";
        }
    }, 1000);
}

function addRow(){
    let tileRow = document.createElement("div");
    tileRow.className = "tile-row";
    let color = Math.floor(Math.random() * 4);
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

document.addEventListener('keydown', function(event) {
    if(gameOver) return;
    const key = event.key;
    if(keys.indexOf(key) == orderArray[0]){
        grid.removeChild(grid.firstElementChild);
        addRow();
        orderArray.shift();
        scoreCount.innerText = ++score;
    }
    else if(keys.indexOf(key) != -1){
        gameOver = true;
        startButton.disabled = false;
        grid.firstElementChild.children[keys.indexOf(key)].style["background-color"] = "red";
        if(localStorage.getItem("high-score")){
            if(score > Number(localStorage.getItem("high-score"))){
                localStorage.setItem("high-score", score);
                high.innerHTML = localStorage.getItem("high-score");
            }
        }
        else{
            localStorage.setItem("high-score", score);
            high.innerText = score;
        }
    }
});
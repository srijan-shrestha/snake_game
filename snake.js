

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const box = 32;

const ground = new Image();
ground.src = "img/ground.png"

const foodImg = new Image();
foodImg.src = "img/food.png"


let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let food = {
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}

let score = 0;

let snakeDirection;

document.addEventListener("keydown", direction);

function direction(event){
    debugger;
    let key = event.keyCode;
    if( key == 37 && snakeDirection != "RIGHT"){
        snakeDirection = "LEFT";
    }else if(key == 38 && snakeDirection != "DOWN"){
        snakeDirection = "UP";
    }else if(key == 39 && snakeDirection != "LEFT"){
        snakeDirection = "RIGHT";
    }else if(key == 40 && snakeDirection != "UP"){
        snakeDirection = "DOWN";
    }
}

function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.drawImage(ground, 0, 0);
    for(let i=0; i < snake.length; i++) {
        ctx.fillStyle = "#2a9d8f";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "#264653";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( snakeDirection == "LEFT") snakeX -= box;
    if( snakeDirection == "UP") snakeY -= box;
    if( snakeDirection == "RIGHT") snakeX += box;
    if( snakeDirection == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }else{
        snake.pop();
    }

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game over !!! \n \n" + "You score is: " + score);
        const anyKey = prompt("Press S to restart the game", "")
        if(anyKey != null){
            resetGame();
        }
    }

    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif";
    ctx.fillText(score, 2*box, 1.6*box);

}

function resetGame () {
    // score = 0;
    location.reload();
}

let game = setInterval(draw, 250);
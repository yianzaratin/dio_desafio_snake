/* Observações 
  - A cobrinha é um array de coordenadas onde adiciona 1 e retira o ultimo
  - A comidinha é carregada aleatoriamente no quadrado maior

*/
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let score = document.querySelector('h2');

let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box
};
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
}
let sum = 0;

function criarBG() {
  // Define a cor
  context.fillStyle = "black";
  // Desenha o retangulo do jogo
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "red";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// Desenha a comida da cobrinha
function drawFood() {
  context.fillStyle = "green";
  context.fillRect(food.x, food.y, box, box);
}

// Captura o evento de keydown e executa a função update
document.addEventListener('keydown', update);

function update() {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
};

function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  // Esse for verifica se a cobrinha vai bater nela mesma para finalizar o jogo
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert('Game Over :( ');
      score.textContent = `Score : 0`;
    }
  }

  criarBG();
  criarCobrinha();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    // Retira a ultima posição do array ou seja da cobrinha 
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
    sum = sum + 1;
    score.textContent = `Score : ${sum}`;
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  snake.unshift(newHead);

};

let jogo = setInterval(iniciarJogo, 400);


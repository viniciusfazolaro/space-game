// importa os objetos do jogo
import { Spaceship } from './class/Spaceship.js';
import { Asteroid } from './class/Asteroid.js';
import { Queue } from './class/Queue.js';

let asteroidsQueue; // declara a fila de asteroides

// define a dificuldade do jogo de acordo com a url assim que a página carrega
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search); // pega os parâmetros da url
    const diff = urlParams.get('diff'); // pega a dificuldade da url
    defineDifficulty(diff); // define a dificuldade do jogo
};

const canvas = document.getElementById('spaceGame'); // seleciona o canvas no html
const context = canvas.getContext('2d'); // define o contexto do canvas como 2d

// definindo o tamanho do canvas para o tamanho da tela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// constantes
const spaceshipStartPositionX = canvas.width / 2; // posição inicial da nave no eixo x
const spaceshipStartPositionY = canvas.height - 135; // posição inicial da nave no eixo y
const spaceshipWidth = 67; // largura da nave
const spaceshipHeight = 138; // altura da nave
const spaceshipSpeed = 25; // velocidade da nave

// cria a nave
const spaceship = new Spaceship(spaceshipStartPositionX, spaceshipStartPositionY, spaceshipWidth, spaceshipHeight, spaceshipSpeed, 'assets/img/spaceship.png');


let maxAsteroids; // maximo de asteroides na tela
let asteroidGenSpeed; // velocidade de geração de asteroides
let score = 0; // pontuação do jogo de acordo com a quantidade de asteroides desviados

function defineDifficulty(diff) {
    // definir a velocidade de geração de asteroides e a quantidade máxima de asteroides de acordo com a dificuldade
    if (diff === 'easy') {
        asteroidGenSpeed = 0.05; 
        maxAsteroids = 45; 
    } else if (diff === 'normal') {
        asteroidGenSpeed = 0.1; 
        maxAsteroids = 55;
    } else if (diff === 'hard') {
        asteroidGenSpeed = 0.15;
        maxAsteroids = 75;
    }

    asteroidsQueue = new Queue(maxAsteroids); // fila de asteroides

    updateGame(diff); // inicia o jogo
}

// "desenha" os asteroides na tela
function drawAsteroids() {
    for (let asteroid of asteroidsQueue) { // percorre a fila
        asteroid.draw(context);
    }
}

// escreve a pontuação na tela
function writeScore() {
    context.font = "20px Arial";
    context.fillStyle = "white";
    context.fillText("Score: " + score, 10, 30);
}

// verifica a tecla pressionada
window.addEventListener('keydown', (pressed) => {
    if (pressed.key === 'ArrowLeft' || pressed.key === 'a' || pressed.key === 'A') { // movimenta a nave para a esquerda
        spaceship.moveLeft();
    } else if (pressed.key === 'ArrowRight' || pressed.key === 'd' || pressed.key === 'D') { // movimenta a nave para a direita
        spaceship.moveRight(canvas.width);
    }
});

// carrega a imagem de fundo
const backgroundImage = new Image();
backgroundImage.src = 'assets/img/background.jpg';

// "desenha" o background
function drawBackground() {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

// atualiza o jogo
function updateGame(diff) {
    // limpa o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // desenha o background 
    drawBackground();

    // desenha a nave
    spaceship.draw(context);
    
    // desenha os asteroides
    drawAsteroids();

    // escreve a pontuação na tela
    writeScore();

    // verifica se asteroidsQueue está definido
    if (asteroidsQueue) {

        // atualiza os asteroides
        for (let asteroid of asteroidsQueue) {
            asteroid.update();

            // verifica colisão da nave com os asteroides
            if (checkCollision(spaceship, asteroid)) {
                // game over
                window.location.href = 'gameOver.html?score=' + score;
                resetGame(); // reseta o jogo
            }
        }

        // verifica se asteroides passaram pela nave
        for (let i = 0; i < asteroidsQueue.size(); i++) {
            if (asteroidsQueue.size() > 0 && asteroidsQueue.asteroids[0].y > canvas.height) { // verifica se o primeiro asteroide da fila passou da nave
                asteroidsQueue.dequeue(); // remove o primeiro asteroide da fila
                score++;
            }
        }

        // gera um novo asteroide com base na aleatoriedade e dificuldade
        if (Math.random() < asteroidGenSpeed && asteroidsQueue.size() < maxAsteroids) {
            let size = Math.floor(Math.random() * 50) + 10; // gera um tamanho aleatório entre 10 e 60
            let speed = 7; // velocidade padrão

            // ajusta a velocidade dos asteroides de acordo com a dificuldade
            if (diff == 'normal') { // dificuldade média
                speed = 10;
            } else if (diff == 'hard') { // dificuldade difícil
                speed = 12;
            }

            // cria um novo asteroide
            let asteroid = new Asteroid(Math.random() * (canvas.width - size), -size, size, size, speed, 'assets/img/asteroid.png');

            // adiciona o asteroide à fila
            asteroidsQueue.enqueue(asteroid);
        }

        // aumenta a velocidade de geração dos asteroides ao longo do tempo
        asteroidGenSpeed += 0.0005;
    }

    // chama a função updateGame() a cada frame
    requestAnimationFrame(() => updateGame(diff));
}


// verifica se houve colisão entre a nave e um asteroide
function checkCollision(spaceship, asteroid) { //boolean
    const spaceshipPadding = 10; // padding da nave

    // calcula o raio da nave
    const spaceshipRadius = (spaceship.width - 2 * spaceshipPadding) / 2; // raio original da nave
    const adjustedSpaceshipRadius = spaceshipRadius * 0.8; // ajusta o raio da nave para ser menor no centro

    // calcula a distância entre a nave e o asteroide
    const dx = (spaceship.x + spaceshipPadding) + spaceshipRadius - (asteroid.x + asteroid.width / 2); // distância entre a nave e o asteroide no eixo x
    const dy = (spaceship.y + spaceshipPadding) + spaceshipRadius - (asteroid.y + asteroid.height / 2); // distância entre a nave e o asteroide no eixo y

    const distance = Math.sqrt(dx * dx + dy * dy); // distância entre a nave e o asteroide

    return distance < (adjustedSpaceshipRadius + asteroid.width / 2); // retorna true se a nave colidir com o asteroide
}

// reseta o jogo
function resetGame() {
    /* ----- recentraliza a nave ----- */
    spaceship.x = canvas.width / 2;
    spaceship.y = canvas.height - 135;

    /* ----- limpa a fila de asteroides ----- */
    asteroidsQueue = new Queue(maxAsteroids);

    /* ----- reseta a pontuação ----- */
    score = 0;
    asteroidGenSpeed = 0;
    maxAsteroids = 0;
}

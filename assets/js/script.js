let order = [];
let clickedOrder = [];
let score = 0;
let readyToClick = false;

// 0 = verde
// 1 = vermelho
// 2 = amarelo
// 3 = azul

const green = document.querySelector('#green');
const red = document.querySelector('#red');
const yellow = document.querySelector('#yellow');
const blue = document.querySelector('#blue');
const circle2 = document.querySelector('#circle2');
const textBox1 = document.querySelector('#textBox1');
const textBox2 = document.querySelector('#textBox2');
const textBox3 = document.getElementById('textBox3');
const toque = document.getElementById('toque');
const somGameOver = document.getElementById('gameOver');

// Cria ordem aleatória de cores
let shuffleOrder = () => {
    let colorSelected = Math.floor(Math.random() * 4);
    order[order.length] = colorSelected;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
    time = order.length * 500;
    setTimeout(() => {
        readyToClick = true;
    }, time);
}

// Acende a próxima cor
let lightColor = (element, number) => {
    number = number * 500;

    setTimeout(() => {
        element.classList.add('selected');
        toque.play();
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
        toque.stop();
    }, number);
}

// Chega se os botões clicados correspondem com a ordem gerada no jogo
let checkOrder = () => {
    let continuar = false;

    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            score--;
            continuar = false;
            gameOver();
            break;
        } else {
            continuar = true;
        }
    }
    if (clickedOrder.length == order.length && continuar === true) {
        // alert(`Pontuação: ${score}\nVocê acertou! Iniciando a próxima rodada!`);
        textBox2.innerHTML = score;
        textBox3.style.backgroundColor = 'green';
        textBox3.innerHTML = 'ACERTOU';
        readyToClick = false;
        setTimeout(nextRound, 2000);
    }
}

// Função para o clique do usuário
let click = (color) => {
    if (readyToClick == true) {
        clickedOrder[clickedOrder.length] = color;
        createColorElement(color).classList.add('selected');
        toque.play();

        setTimeout(() => {
            createColorElement(color).classList.remove('selected');
        }, 100);
        checkOrder();
    }
}

// Função que retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// Função que inicia o próximo round
let nextRound = () => {
    textBox3.style.backgroundColor = '#ffffff';
    textBox3.innerHTML = '';
    score++;
    console.log(score);
    readyToClick = false;
    shuffleOrder();
}

// Função para Game Over
let gameOver = () => {
    // alert(`Você perdeu o jogo!\nClique em INICIAR para recomeçar um novo jogo!`);

    somGameOver.play();
    textBox3.style.backgroundColor = 'red';
    textBox3.innerHTML = 'GAME OVER';
    order = [];
    clickedOrder = [];
    circle2.addEventListener('click', playGame);
    circle2.innerHTML = 'REINICIAR';
}

// Função de inicio do jogo
let start = () => {
    alert('Bem vindo ao Gênesis!\nClique em INICIAR para começar um novo jogo!');
    score = 0;
}

let playGame = () => {
    order = [];
    clickedOrder = [];
    score = 0;
    textBox2.innerHTML = '';
    circle2.removeEventListener('click', playGame);
    circle2.innerHTML = '';

    nextRound();
}

// Eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

circle2.addEventListener('click', playGame);
// circle2.onclick = () => {
//     order = [];
//     clickedOrder = [];
//     playGame();
// }

// Iniciando o jogo
start();
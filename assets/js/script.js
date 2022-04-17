let order = [];
let clickedOrder = [];
let score = 0;

// 0 = verde
// 1 = vermelho
// 2 = amarelo
// 3 = azul

const green = document.querySelector('#green');
const red = document.querySelector('#red');
const yellow = document.querySelector('#yellow');
const blue = document.querySelector('#blue');
const circle2 = document.querySelector('#circle2');

// Cria ordem aleatória de cores
let shuffleOrder = () => {
    let colorSelected = Math.floor(Math.random() * 4);
    order[order.length] = colorSelected;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// Acende a próxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
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
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando a próxima rodada!`);
        nextRound();
    }
}

// Função para o clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
    }, 250);
    setTimeout(() => {
        checkOrder();
    }, 500);
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
    score++;
    shuffleOrder();
}

// Função para Game Over
let gameOver = () => {
    alert(`Pontuação: ${score}\nVocê perdeu o jogo!\nClique em INICIAR para recomeçar um novo jogo!`);

    order = [];
    clickedOrder = [];
    // start();
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
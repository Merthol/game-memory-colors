let order = []; // Salva a ordem de cores aleatórias criada pelo sistema
let clickedOrder = []; // Salva a ordem de cores escolhida pelo usuário
let score = 0; // Salva quantos rounds o usuário acertou
let readyToClick = false; // Verifica se o clique nas cores está liberado

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
    // Escolhe uma cor aleatória de acordo com o número de 1 a 4 e adiciona ao fim da sequência de cores
    let colorSelected = Math.floor(Math.random() * 4);
    order[order.length] = colorSelected; // Salva a cor na próxima posição do array de sequência de cores
    clickedOrder = []; // Zera o array de cores clicadas para ser feita uma nova verificação

    for (let i in order) {
        // Para cada cor do array de sequência de cores, pisca a cor correspondente na tela
        let elementColor = createColorElement(order[i]); // Cria o elemento da cor pelo seu número
        lightColor(elementColor, Number(i) + 1); // Pisca o elemento de acordo com a cor
    }
    time = order.length * 500;
    setTimeout(() => {
        readyToClick = true; // Ao fim da exibição completa de uma sequência de cores, libera o clique nas cores
    }, time);
}

// Acende a próxima cor
let lightColor = (element, number) => {
    // Recebe como parâmetro o elemento a ser acendido, assim como o seu número na ordem para definir em que momento
    // ele será aceso e apagado
    number = number * 500;

    setTimeout(() => {
        // Adiciona a classe selected para indicar que o elemento foi selecionado após o período informado
        element.classList.add('selected');
        toque.play();
    }, number - 250);
    setTimeout(() => {
        // Exclui a classe selected para voltar o elemento a sua cor original após o período informado
        element.classList.remove('selected');
        toque.stop();
    }, number);
}

// Checa se os botões clicados correspondem com a ordem gerada no jogo
let checkOrder = () => {
    let continuar = false; // Durante a verificação, impede que novos cliques sejam realizados nas cores

    for (let i in clickedOrder) {
        // Verifica se a sequência clicada corresponde com a sequência informada
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
        // Caso chegue ao fim da verificação com sucesso, informa que acertou, round depois de um período de tempo
        textBox2.innerHTML = score;
        textBox3.style.backgroundColor = 'green';
        textBox3.innerHTML = 'ACERTOU';
        readyToClick = false; // Desabilita o clique até que uma nova sequência seja exibida completamente
        setTimeout(nextRound, 2000); // Tempo para iniciar o próximo round
    }
}

// Função para o clique do usuário
let click = (color) => {
    // Checa se o clique é permitido. Se o sistema estiver no meio da execução de uma sequência, ou tiver finalizado a
    // verificação de uma sequência digitada pelo usuário, não permite novos cliques.
    // O clique nas cores só é liberado depois de o sistema demonstrar uma sequência completa.
    if (readyToClick == true) {
        clickedOrder[clickedOrder.length] = color;
        createColorElement(color).classList.add('selected');

        toque.play();

        setTimeout(() => {
            // Acende a cor que foi clicada por um curto período de tempo
            createColorElement(color).classList.remove('selected');
        }, 100);
        checkOrder(); // A cada clique realizado, verifica se a sequência clicada até aquele momento corresponde com a
        // sequência informada pelo sistema
    }
}

// Função que retorna a cor
let createColorElement = (color) => {
    // Recebe como parâmetro um número, e de acordo com o número informado, retorna um elemento da cor correspondente
    // com aquele número
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
    // Apaga os campos de informação enquanto inicia um novo round, e aumenta o score para indicar qual round está
    // sendo executado
    textBox3.style.backgroundColor = '#ffffff';
    textBox3.innerHTML = '';
    score++;
    readyToClick = false; // Impede que seja feito clique nas cores até que uma nova sequência seja totalmente exibida
    shuffleOrder(); // Exibe uma nova sequência
}

// Função para Game Over
let gameOver = () => {
    // Toca um som indicando o fim do jogo, exibe mensagem de fim de jogo, zera o array de ordem de cores do sistema e
    // permite que seja clicado no circulo central par inicio de um novo jogo
    somGameOver.play();
    textBox3.style.backgroundColor = 'red';
    textBox3.innerHTML = 'GAME OVER';
    order = [];
    circle2.addEventListener('click', playGame); // Recolocando o evento de click para permitir reiniciar um novo jogo
    circle2.innerHTML = 'REINICIAR';
}

// Função de inicio do jogo
let playGame = () => {

    // Zerando variáveis para iniciar um novo jogo
    order = [];
    score = 0;
    textBox2.innerHTML = '';
    circle2.innerHTML = '';

    circle2.removeEventListener('click', playGame); // Removendo o click de inicio para impedir a interrupção do jogo

    nextRound();
}

// Eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

circle2.addEventListener('click', playGame);
alert('Bem vindo ao Gênesis!\nClique em INICIAR para começar um novo jogo!');

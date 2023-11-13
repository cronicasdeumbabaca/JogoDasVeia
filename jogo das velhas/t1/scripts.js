// Seleção de Elementos do DOM:
const cells = document.querySelectorAll('.celula');  // Seleciona todas as células do tabuleiro
const message = document.getElementById('msg');  // Seleciona o elemento de mensagem

// Variáveis e Estado do Jogo:
let currentPlayer = 'X';  // Define o jogador inicial como 'X'
let gameEnd = false;  // Indica se o jogo terminou
let board = ['', '', '', '', '', '', '', '', ''];  // Representa o estado do tabuleiro

// Função chamada quando uma célula é clicada
function movim(index) {
    // Verifica se o jogo já terminou ou se a célula já foi preenchida
    if (gameEnd || board[index] !== '') return;

    // Atualiza o estado do tabuleiro e a exibição com o símbolo do jogador atual
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer);

    // Verifica se o jogador atual venceu chamando a função checkWin(player)
    if (checkWin(currentPlayer)) {
        message.textContent = `O jogador ${currentPlayer} venceu!`;
        gameEnd = true;
        return;
    }

    // Verifica se o jogo é um empate chamando a função checkDraw()
    if (checkDraw()) {
        message.textContent = "Empate!";
        gameEnd = true;
        return;
    }

    // Alterna o jogador atual
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `É a vez do jogador ${currentPlayer}`;
}

// Função que verifica se o jogador atual venceu
function checkWin(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // colunas
        [0, 4, 8], [2, 4, 6]  // diagonais
    ];

    // Itera sobre as condições de vitória e verifica se o jogador atual venceu
    for (let condition of winConditions) {
        if (board[condition[0]] === player && board[condition[1]] === player && board[condition[2]] === player) {
            return true;
        }
    }

    // Retorna falso se não houver vitória
    return false;
}

// Função que verifica se o jogo é um empate
function checkDraw() {
    // Retorna verdadeiro se não houver células vazias no tabuleiro
    return !board.includes('');
}

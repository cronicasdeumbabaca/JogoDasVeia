let jogadorX = true;
let tabuleiro = Array(9).fill("");
let jogoEncerrado = false;
let jogador1, jogador2;

function initGame() {
    jogador1 = document.querySelector('input[type="text"]');
    jogador2 = document.getElementById('jogador2');
    
    if (jogador1.value.trim() === "" || jogador2.value.trim() === "") {
        alert("Por favor, preencha os nomes dos jogadores!");
        return;
    }

    document.getElementById('jogadorAtual').innerHTML = `Vez de ${jogador1.value}`;
    document.querySelector('fieldset').style.display = 'none';
}

function jogar(index) {
    if (tabuleiro[index] === "" && !jogoEncerrado) {
        const celula = document.getElementById(`celula${index}`);
        tabuleiro[index] = jogadorX ? "X" : "O";
        celula.innerHTML = tabuleiro[index];

        if (verificarVencedor()) {
            const vencedor = jogadorX ? jogador1.value : jogador2.value;
            document.getElementById("msg").innerHTML = `Jogador ${vencedor} venceu!`;
            jogoEncerrado = true;
        } else if (tabuleiro.every((value) => value !== "")) {
            document.getElementById("msg").innerHTML = "Empate!";
            jogoEncerrado = true;
        } else {
            jogadorX = !jogadorX;
            document.getElementById("jogadorAtual").innerHTML = `Vez de ${jogadorX ? jogador1.value : jogador2.value}`;
        }
    }
}

function verificarVencedor() {
    const linhas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const linha of linhas) {
        const [a, b, c] = linha;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return true;
        }
    }

    return false;
}

function voltar() {
    document.querySelector('fieldset').style.display = 'flex';
}

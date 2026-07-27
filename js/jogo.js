let j1 = {
    x: Math.floor(Math.random() * 3),
    y: Math.floor(Math.random() * 3)
};
let j2 = {
    x: Math.floor(Math.random() * 3),
    y: Math.floor(Math.random() * 3)
};
let turnoatual = "j1";

while (j1.x === j2.x && j1.y === j2.y) {
    j2.x = Math.floor(Math.random() * 3);
    j2.y = Math.floor(Math.random() * 3);
}

function mover(jogador, direcao) {
    if (direcao === "direita") {
        jogador.x++;
        if (jogador.x > 2) jogador.x = 0;
    }
    else if (direcao === "esquerda") {
        jogador.x--;
        if (jogador.x < 0) jogador.x = 2;
    }
    else if (direcao === "cima") {
        if (jogador.y === 0) {
            jogador.y = 2;
            jogador.x = Math.floor(Math.random() * 3);
        } else {
            jogador.y--;
        }
    }
    else if (direcao === "baixo") {
        if (jogador.y === 2) {
            jogador.y = 0;
            jogador.x = Math.floor(Math.random() * 3);
        } else {
            jogador.y++;
        }
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp")    jogar("cima");
    if (event.key === "ArrowDown")  jogar("baixo");
    if (event.key === "ArrowLeft")  jogar("esquerda");
    if (event.key === "ArrowRight") jogar("direita");
});

function encontrou(j1, j2) {
    return j1.x === j2.x && j1.y === j2.y;
}

function jogar(direcao) {
    if (turnoatual === "j1") {
        mover(j1, direcao);
    } else {
        mover(j2, direcao);
    }

    if (encontrou(j1, j2)) {
        mostrarFinal(turnoatual);
        return;
    }

    atualizarCena();
    mostrarPassagem();
}

const locais = {
    "0,0": {
        j1: { imagem: "img/jogador_1/00.png", texto: "Você está em 0,0" },
        j2: { imagem: "img/jogador_2/00.png", texto: "Você está em 0,0" }
    },
    "1,0": {
        j1: { imagem: "img/jogador_1/10.png", texto: "Você está em 1,0" },
        j2: { imagem: "img/jogador_2/10.png", texto: "Você está em 1,0" }
    },
    "2,0": {
        j1: { imagem: "img/jogador_1/20.png", texto: "Você está em 2,0" },
        j2: { imagem: "img/jogador_2/20.png", texto: "Você está em 2,0" }
    },
    "0,1": {
        j1: { imagem: "img/jogador_1/01.png", texto: "Você está em 0,1" },
        j2: { imagem: "img/jogador_2/01.png", texto: "Você está em 0,1" }
    },
    "1,1": {
        j1: { imagem: "img/jogador_1/11.png", texto: "Você está em 1,1" },
        j2: { imagem: "img/jogador_2/11.png", texto: "Você está em 1,1" }
    },
    "2,1": {
        j1: { imagem: "img/jogador_1/21.png", texto: "Você está em 2,1" },
        j2: { imagem: "img/jogador_2/21.png", texto: "Você está em 2,1" }
    },
    "0,2": {
        j1: { imagem: "img/jogador_1/02.png", texto: "Você está em 0,2" },
        j2: { imagem: "img/jogador_2/02.png", texto: "Você está em 0,2" }
    },
    "1,2": {
        j1: { imagem: "img/jogador_1/12.png", texto: "Você está em 1,2" },
        j2: { imagem: "img/jogador_2/12.png", texto: "Você está em 1,2" }
    },
    "2,2": {
        j1: { imagem: "img/jogador_1/22.png", texto: "Você está em 2,2" },
        j2: { imagem: "img/jogador_2/22.png", texto: "Você está em 2,2" }
    }
};

function iniciarJogo() {
    document.getElementById("inicio").classList.add("escondido");
    document.getElementById("jogo").classList.remove("escondido");
    atualizarCena();
}

function atualizarCena() {
    let jogador = turnoatual === "j1" ? j1 : j2;
    let chave = jogador.x + "," + jogador.y;
    let dados = locais[chave][turnoatual];

    document.getElementById("imagemCena").src = dados.imagem;
    document.getElementById("descricao").innerText = dados.texto;
    document.getElementById("turno").innerText = "Turno: " + (turnoatual === "j1" ? "Jogador 1" : "Jogador 2");

    atualizarDistancia();
}

function atualizarDistancia() {
    let distancia = Math.abs(j1.x - j2.x) + Math.abs(j1.y - j2.y);
    let texto;

    if (distancia >= 4) {
        texto = "Tudo parece silencioso.";
    } else if (distancia >= 2) {
        texto = "Você sente uma presença distante.";
    } else {
        texto = "Algo está muito próximo.";
    }

    document.getElementById("dicaDistancia").innerText = texto;
}

function mostrarPassagem() {
    document.getElementById("jogo").classList.add("escondido");
    document.getElementById("passagem").classList.remove("escondido");

    let proximo = turnoatual === "j1" ? "Jogador 2" : "Jogador 1";
    document.getElementById("textoPassagem").innerText = "Passe o controle para: " + proximo;
}

function continuarTurno() {
    turnoatual = turnoatual === "j1" ? "j2" : "j1";

    document.getElementById("passagem").classList.add("escondido");
    document.getElementById("jogo").classList.remove("escondido");

    atualizarCena();
}

function mostrarFinal(vencedor) {
    document.getElementById("jogo").classList.add("escondido");
    document.getElementById("final").classList.remove("escondido");

    if (vencedor === "j1") {
        document.getElementById("imagemFinal").src = "img/final_jogador_1.png";
        document.getElementById("textoFinal").innerText = "Jogador 1 venceu.";
    } else {
        document.getElementById("imagemFinal").src = "img/final_jogador_2.png";
        document.getElementById("textoFinal").innerText = "Jogador 2 venceu.";
    }
}

// ========================================
// FRUTA VIVA — ÁFRICA
// Corrida da Melancia 🍉
// ========================================


// ========================================
// 1. CONFIGURAÇÕES
// ========================================

const CONFIG = {
    metaGotas: 7,

    duracao: 30,

    vidasIniciais: 3,

    gravidade: 1750,

    impulsoPulo: 690,

    velocidadeObjetos: 245,

    intervaloSpawn: 1050,

    chanceGota: 0.55,

    invulnerabilidadeMs: 900
};


// ========================================
// 2. ESTADO DO JOGO
// ========================================

let estado = "PREPARANDO";
// PREPARANDO | JOGANDO | VITORIA | DERROTA | QUIZ_LIBERADO

let gotas = 0;

let vidas = CONFIG.vidasIniciais;

let tempoRestante = CONFIG.duracao;

let tempoInicio = 0;

let ultimoSegundoMostrado = CONFIG.duracao;

let playerY = 0;

let velocidadeY = 0;

let ultimoFrame = 0;

let rafId = null;

let spawnId = null;

let objetos = [];

let podeColidirObstaculo = true;


// Alterna:
// pedra no chão
// alvo no alto
let proximoObstaculo = "chao";

let ultimoObjetoFoiGota = false;


// ========================================
// 3. DOM
// ========================================

const DOM = {

    startScreen: document.getElementById("start-screen"),

    gameScreen: document.getElementById("game-screen"),

    victoryScreen: document.getElementById("victory-screen"),

    btnStart: document.getElementById("btn-start"),

    btnReset: document.getElementById("btn-reset"),

    btnQuiz: document.getElementById("btn-quiz"),

    gameArea: document.getElementById("game-area"),

    player: document.getElementById("player"),

    progressText: document.getElementById("progress-text"),

    progressFill: document.getElementById("progress-fill"),

    message: document.getElementById("message"),

    announcer: document.getElementById("aria-announcer")
};


// ========================================
// 4. TELAS
// ========================================

function mostrarTela(nome) {

    DOM.startScreen.classList.toggle(
        "hidden",
        nome !== "inicio"
    );

    DOM.gameScreen.classList.toggle(
        "hidden",
        nome !== "jogo"
    );

    DOM.victoryScreen.classList.toggle(
        "hidden",
        nome !== "vitoria"
    );
}


// ========================================
// 5. INICIAR JOGO
// ========================================

function iniciarJogo() {

    pararJogo();

    limparObjetos();

    estado = "JOGANDO";

    gotas = 0;

    vidas = CONFIG.vidasIniciais;

    tempoRestante = CONFIG.duracao;

    ultimoSegundoMostrado = CONFIG.duracao;

    playerY = 0;

    velocidadeY = 0;

    podeColidirObstaculo = true;

    proximoObstaculo = "chao";


    atualizarPlayer();

    atualizarProgresso();

    mensagem("Pegue as gotas! 💧");


    mostrarTela("jogo");


    DOM.player.classList.remove("hit");

    DOM.player.classList.add("running");


    DOM.gameArea.focus({
        preventScroll: true
    });


    tempoInicio = performance.now();

    ultimoFrame = tempoInicio;


    rafId = requestAnimationFrame(loop);


    spawnId = setInterval(
        criarObjeto,
        CONFIG.intervaloSpawn
    );
}


// ========================================
// 6. PARAR JOGO
// ========================================

function pararJogo() {

    if (rafId) {

        cancelAnimationFrame(rafId);

        rafId = null;
    }


    if (spawnId) {

        clearInterval(spawnId);

        spawnId = null;
    }
}


// ========================================
// 7. LIMPAR OBJETOS
// ========================================

function limparObjetos() {

    objetos.forEach(obj => {

        if (obj.el) {
            obj.el.remove();
        }

    });


    objetos = [];
}


// ========================================
// 8. PULO
// ========================================

function pular() {

    if (estado !== "JOGANDO") return;


    // Só pula se estiver no chão
    if (playerY <= 4) {

        velocidadeY = CONFIG.impulsoPulo;

        mensagem("Pulo! 🍉");
    }
}


// ========================================
// 9. POSIÇÃO DO PLAYER
// ========================================

function atualizarPlayer() {

    DOM.player.style.bottom =
        `${58 + playerY}px`;
}


// ========================================
// 10. CRIAR OBJETO
// ========================================

function criarObjeto() {

    if (estado !== "JOGANDO") return;

    // Se o último objeto foi uma gota,
    // agora obrigatoriamente vem obstáculo
    if (ultimoObjetoFoiGota) {

        criarObstaculoAlternado();

        ultimoObjetoFoiGota = false;

        return;
    }

    // Diminui um pouco a chance de gota
    const ehGota = Math.random() < 0.40;

    if (ehGota) {

        criarGota();

        ultimoObjetoFoiGota = true;

    } else {

        criarObstaculoAlternado();

        ultimoObjetoFoiGota = false;
    }
}
function criarObstaculoAlternado() {

    if (proximoObstaculo === "chao") {

        criarObstaculoChao();

        proximoObstaculo = "alto";

    } else {

        criarObstaculoAlto();

        proximoObstaculo = "chao";
    }
}

// ========================================
// 11. CRIAR GOTA
// ========================================

function criarGota() {

    const el = document.createElement("div");

    el.className = "runner-object drop";

    el.textContent = "💧";


    // Algumas gotas ficam baixas
    // outras obrigam o jogador a pular
    const altura = 55 + Math.random() * 105;


    const obj = {

        tipo: "gota",

        x: DOM.gameArea.clientWidth + 20,

        bottom: 58 + altura,

        el: el,

        usado: false
    };


    posicionarNovoObjeto(obj);
}


// ========================================
// 12. PEDRA NO CHÃO
// ========================================

function criarObstaculoChao() {

    const el = document.createElement("div");

    el.className =
        "runner-object obstacle obstacle-ground";

    el.textContent = "🪨";


    const obj = {

        tipo: "pedra",

        x: DOM.gameArea.clientWidth + 20,

        bottom: 56,

        el: el,

        usado: false
    };


    posicionarNovoObjeto(obj);
}


// ========================================
// 13. OBSTÁCULO NO ALTO
// ========================================

function criarObstaculoAlto() {

    const el = document.createElement("div");

    el.className =
        "runner-object obstacle obstacle-high";

    el.textContent = "🎯";


    /*
       O alvo passa por cima da melancia
       quando ela está correndo.

       Se o jogador pular na hora errada,
       bate nele.
    */

    const alturaPlayer =
        DOM.player.offsetHeight || 70;


    const obj = {

        tipo: "alto",

        x: DOM.gameArea.clientWidth + 20,

        bottom: 58 + alturaPlayer + 25,

        el: el,

        usado: false
    };


    posicionarNovoObjeto(obj);
}


// ========================================
// 14. POSICIONAR OBJETO
// ========================================

function posicionarNovoObjeto(obj) {

    obj.el.style.left =
        `${obj.x}px`;

    obj.el.style.bottom =
        `${obj.bottom}px`;


    DOM.gameArea.appendChild(obj.el);


    objetos.push(obj);
}


// ========================================
// 15. MOVIMENTAR OBJETOS
// ========================================

function atualizarObjetos(delta) {

    const distancia =
        CONFIG.velocidadeObjetos * delta;


    objetos.forEach(obj => {

        if (obj.usado) return;


        obj.x -= distancia;


        obj.el.style.left =
            `${obj.x}px`;


        // Saiu da tela
        if (obj.x < -80) {

            obj.usado = true;

            obj.el.remove();
        }
    });


    objetos = objetos.filter(obj => {

        return !obj.usado ||
            document.body.contains(obj.el);

    });
}


// ========================================
// 16. FÍSICA DO PULO
// ========================================

function atualizarFisica(delta) {

    if (
        playerY > 0 ||
        velocidadeY > 0
    ) {

        velocidadeY -=
            CONFIG.gravidade * delta;


        playerY +=
            velocidadeY * delta;


        // Voltou ao chão
        if (playerY <= 0) {

            playerY = 0;

            velocidadeY = 0;
        }


        atualizarPlayer();
    }
}


// ========================================
// 17. COLISÃO
// ========================================

function retangulosColidem(
    a,
    b,
    margem = 8
) {

    return !(

        a.right - margem <
        b.left + margem ||

        a.left + margem >
        b.right - margem ||

        a.bottom - margem <
        b.top + margem ||

        a.top + margem >
        b.bottom - margem

    );
}


// ========================================
// 18. VERIFICAR COLISÕES
// ========================================

function verificarColisoes() {

    if (estado !== "JOGANDO") return;


    const playerRect =
        DOM.player.getBoundingClientRect();


    objetos.forEach(obj => {

        if (obj.usado) return;


        const objRect =
            obj.el.getBoundingClientRect();


        if (
            !retangulosColidem(
                playerRect,
                objRect,
                10
            )
        ) {

            return;
        }


        // =================================
        // GOTA
        // =================================

        if (obj.tipo === "gota") {

            coletarGota(obj);

            return;
        }


        // =================================
        // OBSTÁCULO
        // =================================

        if (podeColidirObstaculo) {

            baterObstaculo(obj);
        }

    });
}


// ========================================
// 19. COLETAR GOTA
// ========================================

function coletarGota(obj) {

    if (obj.usado) return;


    obj.usado = true;


    gotas++;


    obj.el.classList.add("collected");


    setTimeout(() => {

        obj.el.remove();

    }, 240);


    atualizarProgresso();


    anunciar(
        `Gota coletada. ${gotas} de ${CONFIG.metaGotas}.`
    );


    mensagem("Boa! +1 💧");


    // =====================================
    // VITÓRIA
    // =====================================

    if (gotas >= CONFIG.metaGotas) {

        vencer();
    }
}


// ========================================
// 20. BATER NO OBSTÁCULO
// ========================================

function baterObstaculo(obj) {

    if (!podeColidirObstaculo) return;


    podeColidirObstaculo = false;


    obj.usado = true;

    obj.el.remove();


    // =====================================
    // PERDE UMA VIDA
    // =====================================

    vidas--;


    if (vidas < 0) {

        vidas = 0;
    }


    // =====================================
    // ANIMAÇÃO DE DANO
    // =====================================

    DOM.player.classList.remove("hit");

    void DOM.player.offsetWidth;

    DOM.player.classList.add("hit");


    // =====================================
    // MENSAGEM DIFERENTE
    // =====================================

    if (obj.tipo === "pedra") {

        mensagem(
            `Ai! Bateu na pedra! ❤️ ${vidas}`
        );

    } else {

        mensagem(
            `Pulou na hora errada! ❤️ ${vidas}`
        );
    }


    anunciar(
        `Você tomou dano. Restam ${vidas} vidas.`
    );


    atualizarProgresso();


    // =====================================
    // SEM VIDAS
    // =====================================

    if (vidas <= 0) {

        perder("vidas");

        return;
    }


    // =====================================
    // INVULNERABILIDADE TEMPORÁRIA
    // =====================================

    setTimeout(() => {

        podeColidirObstaculo = true;

        DOM.player.classList.remove("hit");

    }, CONFIG.invulnerabilidadeMs);
}


// ========================================
// 21. TIMER
// ========================================

function atualizarTimer(agora) {

    const tempoPassado =
        (agora - tempoInicio) / 1000;


    tempoRestante =
        Math.max(
            0,
            Math.ceil(
                CONFIG.duracao -
                tempoPassado
            )
        );


    // Atualiza somente quando muda o segundo
    if (
        tempoRestante !==
        ultimoSegundoMostrado
    ) {

        ultimoSegundoMostrado =
            tempoRestante;


        atualizarProgresso();
    }


    // =====================================
    // TEMPO ESGOTADO
    // =====================================

    if (tempoRestante <= 0) {

        perder("tempo");
    }
}


// ========================================
// 22. HUD / PROGRESSO
// ========================================

function atualizarProgresso() {

    DOM.progressText.textContent =
        `${gotas} / ${CONFIG.metaGotas} 💧  |  ❤️ ${vidas}  |  ⏱️ ${tempoRestante}s`;


    DOM.progressFill.style.width =
        `${Math.min(
            100,
            (gotas / CONFIG.metaGotas) * 100
        )}%`;
}


// ========================================
// 23. MENSAGEM
// ========================================

function mensagem(texto) {

    DOM.message.textContent = texto;
}


// ========================================
// 24. ACESSIBILIDADE
// ========================================

function anunciar(texto) {

    DOM.announcer.textContent = "";


    setTimeout(() => {

        DOM.announcer.textContent =
            texto;

    }, 30);
}


// ========================================
// 25. LOOP PRINCIPAL
// ========================================

function loop(agora) {

    if (estado !== "JOGANDO") return;


    const delta =
        Math.min(
            (agora - ultimoFrame) / 1000,
            0.033
        );


    ultimoFrame = agora;


    // TIMER
    atualizarTimer(agora);


    if (estado !== "JOGANDO") return;


    // FÍSICA
    atualizarFisica(delta);


    // OBJETOS
    atualizarObjetos(delta);


    // COLISÕES
    verificarColisoes();


    if (estado === "JOGANDO") {

        rafId =
            requestAnimationFrame(loop);
    }
}


// ========================================
// 26. VITÓRIA
// ========================================

function vencer() {

    if (estado !== "JOGANDO") return;


    estado = "VITORIA";


    pararJogo();

    limparObjetos();


    DOM.player.classList.remove(
        "running"
    );


    DOM.player.classList.remove(
        "hit"
    );


    mensagem(
        "Melancia hidratada! 🍉💧"
    );


    anunciar(
        "Parabéns! Melancia hidratada. Quiz liberado."
    );


    setTimeout(() => {

        mostrarTela("vitoria");

    }, 450);
}


// ========================================
// 27. DERROTA
// ========================================

function perder(motivo) {

    if (estado !== "JOGANDO") return;


    estado = "DERROTA";


    pararJogo();

    limparObjetos();


    DOM.player.classList.remove(
        "running"
    );


    DOM.player.classList.remove(
        "hit"
    );


    if (motivo === "tempo") {

        mensagem(
            "⏱️ Tempo acabou! Tente novamente."
        );


        anunciar(
            "O tempo acabou. Tente novamente."
        );

    } else {

        mensagem(
            "❤️ Suas vidas acabaram! Tente novamente."
        );


        anunciar(
            "Suas vidas acabaram. Tente novamente."
        );
    }


    // Volta para a tela inicial
    // para poder jogar novamente
    setTimeout(() => {

        mostrarTela("inicio");

        estado = "PREPARANDO";

    }, 1400);
}


// ========================================
// 28. INTEGRAÇÃO COM FRUTA VIVA
// ========================================

function onMinigameConcluido(
    idFruta
) {

    window.dispatchEvent(

        new CustomEvent(
            "frutaviva:minigame-concluido",
            {

                detail: {

                    fruta: idFruta,

                    continente: "africa"

                }

            }
        )
    );


    if (
        window.parent &&
        window.parent !== window
    ) {

        window.parent.postMessage(
            {

                type:
                    "frutaviva:minigame-concluido",

                detail: {

                    fruta: idFruta,

                    continente:
                        "africa"

                }

            },
            "*"
        );
    }


    console.log(
        `[Fruta Viva] Minigame concluído: ${idFruta}`
    );
}


// ========================================
// 29. LIBERAR QUIZ
// ========================================

function liberarQuiz() {

    if (
        estado === "QUIZ_LIBERADO"
    ) {

        return;
    }


    estado = "QUIZ_LIBERADO";


    onMinigameConcluido(
        "melancia"
    );
}


// ========================================
// 30. BOTÃO INICIAR
// ========================================

DOM.btnStart.addEventListener(
    "click",
    iniciarJogo
);


// ========================================
// 31. BOTÃO REINICIAR
// ========================================

DOM.btnReset.addEventListener(
    "click",
    iniciarJogo
);


// ========================================
// 32. BOTÃO QUIZ
// ========================================

DOM.btnQuiz.addEventListener(
    "click",
    () => {

        liberarQuiz();


        DOM.btnQuiz.textContent =
            "Quiz liberado! ✓";


        DOM.btnQuiz.disabled =
            true;
    }
);


// ========================================
// 33. TOQUE NA TELA
// ========================================

DOM.gameArea.addEventListener(
    "pointerdown",
    event => {

        if (
            event.target.closest("button")
        ) {

            return;
        }


        pular();
    }
);


// ========================================
// 34. TECLADO
// ========================================

window.addEventListener(
    "keydown",
    event => {

        if (
            estado !== "JOGANDO"
        ) {

            return;
        }


        if (
            event.code === "Space" ||
            event.code === "ArrowUp"
        ) {

            event.preventDefault();

            pular();
        }
    }
);


// ========================================
// 35. QUANDO MUDA DE ABA
// ========================================

window.addEventListener(
    "blur",
    () => {

        if (
            estado === "JOGANDO"
        ) {

            ultimoFrame =
                performance.now();
        }
    }
);
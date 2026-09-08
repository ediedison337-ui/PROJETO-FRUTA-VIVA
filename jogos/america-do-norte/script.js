// ========================================
// FRUTA VIVA
// AMÉRICA DO NORTE - JOGO DA MAÇÃ
// ========================================


// ========================================
// 1. CONFIGURAÇÕES
// ========================================

const CONFIG_JOGO = {

    frutaAlvoId: "maca",

    metaAlvo: 8,

    tempoTotal: 60,

    maxFrutasSimultaneas: 3,

    intervaloSpawnMs: 1200,

    chanceFrutaAlvo: 0.45,

    tamanhoFruta: 90,

    raioAcerto: 45
};


// ========================================
// 2. FRUTAS
// ========================================

const FRUTAS = {

    maca: {
        id: "maca",
        nome: "Maçã",
        emoji: "🍎"
    },

    uva: {
        id: "uva",
        nome: "Uva",
        emoji: "🍇"
    },

    laranja: {
        id: "laranja",
        nome: "Laranja",
        emoji: "🍊"
    },

    morango: {
        id: "morango",
        nome: "Morango",
        emoji: "🍓"
    },

    abacaxi: {
        id: "abacaxi",
        nome: "Abacaxi",
        emoji: "🍍"
    },

    banana: {
        id: "banana",
        nome: "Banana",
        emoji: "🍌"
    },

    kiwi: {
        id: "kiwi",
        nome: "Kiwi",
        emoji: "🥝"
    }

};


// ========================================
// 3. ESTADO DO JOGO
// ========================================

let estadoJogo = "PREPARANDO";

let progresso = 0;

let frutasAtivas = [];

let idIntervaloSpawn = null;

let idAnimationFrame = null;

let idTimer = null;

let tempoRestante =
    CONFIG_JOGO.tempoTotal;


let ponteiroAtivoId = null;

let pontoAnterior = null;

let pontoAtual = null;

let ultimaVezFeedback = 0;

let frutasDesdeUltimaMaca = 2;
// ========================================
// 4. ELEMENTOS HTML
// ========================================

const DOM = {

    startScreen:
        document.getElementById(
            "start-screen"
        ),

    gameScreen:
        document.getElementById(
            "game-screen"
        ),

    victoryScreen:
        document.getElementById(
            "victory-screen"
        ),

    btnStart:
        document.getElementById(
            "btn-start"
        ),

    btnReset:
        document.getElementById(
            "btn-reset"
        ),

    btnQuiz:
        document.getElementById(
            "btn-quiz"
        ),

    gameArea:
        document.getElementById(
            "game-area"
        ),

    fruitsContainer:
        document.getElementById(
            "fruits-container"
        ),

    particlesContainer:
        document.getElementById(
            "particles-container"
        ),

    swipeTrailContainer:
        document.getElementById(
            "swipe-trail-container"
        ),

    basketSlots:
        document.getElementById(
            "basket-slots"
        ),

    progressText:
        document.getElementById(
            "progress-text"
        ),

    feedbackMessage:
        document.getElementById(
            "feedback-message"
        ),

    confettiContainer:
        document.getElementById(
            "confetti-container"
        )

};


// ========================================
// 5. CRIA O TIMER NA TELA
// ========================================

function criarTimerVisual() {

    let timer =
        document.getElementById(
            "tempo-jogo"
        );


    if (!timer) {

        timer =
            document.createElement(
                "div"
            );

        timer.id =
            "tempo-jogo";

        timer.style.textAlign =
            "center";

        timer.style.fontWeight =
            "700";

        timer.style.fontSize =
            "20px";

        timer.style.margin =
            "8px 0";

        timer.style.color =
            "#333";


        if (DOM.gameArea) {

            DOM.gameArea
                .parentNode
                .insertBefore(
                    timer,
                    DOM.gameArea
                );

        }

    }


    atualizarTimerVisual();

}


// ========================================
// 6. ATUALIZA TIMER
// ========================================

function atualizarTimerVisual() {

    const timer =
        document.getElementById(
            "tempo-jogo"
        );


    if (!timer) return;


    timer.textContent =
        `⏱️ Tempo: ${tempoRestante}s`;


    if (tempoRestante <= 10) {

        timer.style.color =
            "#e63946";

    }

    else {

        timer.style.color =
            "#333";

    }

}


// ========================================
// 7. CESTA
// ========================================

function inicializarCestaVisual() {

    DOM.basketSlots.innerHTML =
        "";


    for (
        let i = 0;
        i < CONFIG_JOGO.metaAlvo;
        i++
    ) {

        const slot =
            document.createElement(
                "div"
            );

        slot.className =
            "basket-slot";

        slot.dataset.index =
            i;

        DOM.basketSlots
            .appendChild(
                slot
            );

    }

}


// ========================================
// 8. COMEÇAR JOGO
// ========================================

function iniciarJogo() {

    limparTudo();


    estadoJogo =
        "JOGANDO";


    progresso =
        0;


    tempoRestante =
        CONFIG_JOGO.tempoTotal;


    DOM.startScreen
        .classList
        .add("hidden");


    DOM.victoryScreen
        .classList
        .add("hidden");


    DOM.gameScreen
        .classList
        .remove("hidden");


    inicializarCestaVisual();

    atualizarHUD();

    criarTimerVisual();


    // GERA FRUTAS

    idIntervaloSpawn =
        setInterval(
            gerarFruta,
            CONFIG_JOGO.intervaloSpawnMs
        );


    // TIMER

    idTimer =
        setInterval(() => {

            if (
                estadoJogo !==
                "JOGANDO"
            ) {

                return;

            }


            tempoRestante--;


            atualizarTimerVisual();


            if (
                tempoRestante <= 0
            ) {

                tempoEsgotado();

            }

        }, 1000);


    // ANIMAÇÃO

    idAnimationFrame =
        requestAnimationFrame(
            loopPrincipal
        );

}


// ========================================
// 9. REINICIAR
// ========================================

function reiniciarJogo() {

    limparTudo();

    iniciarJogo();

}


// ========================================
// 10. LIMPAR
// ========================================

function limparTudo() {

    if (idIntervaloSpawn) {

        clearInterval(
            idIntervaloSpawn
        );

        idIntervaloSpawn =
            null;

    }


    if (idAnimationFrame) {

        cancelAnimationFrame(
            idAnimationFrame
        );

        idAnimationFrame =
            null;

    }


    if (idTimer) {

        clearInterval(
            idTimer
        );

        idTimer =
            null;

    }


    frutasAtivas
        .forEach(fruta => {

            if (fruta.elemento) {

                fruta.elemento
                    .remove();

            }

        });


    frutasAtivas =
        [];


    if (DOM.fruitsContainer) {

        DOM.fruitsContainer
            .innerHTML =
            "";

    }


    if (DOM.particlesContainer) {

        DOM.particlesContainer
            .innerHTML =
            "";

    }


    if (DOM.swipeTrailContainer) {

        DOM.swipeTrailContainer
            .innerHTML =
            "";

    }


    ponteiroAtivoId =
        null;

    pontoAnterior =
        null;

    pontoAtual =
        null;

}


// ========================================
// 11. SORTEAR FRUTA
// ========================================

function sortearTipoFruta() {

    const chaves =
        Object.keys(FRUTAS);

    const outras =
        chaves.filter(
            fruta =>
                fruta !==
                CONFIG_JOGO.frutaAlvoId
        );


    // ====================================
    // DEPOIS DE UMA MAÇÃ,
    // OBRIGA 2 OUTRAS FRUTAS
    // ====================================

    if (
        frutasDesdeUltimaMaca < 2
    ) {

        frutasDesdeUltimaMaca++;

        return outras[
            Math.floor(
                Math.random() *
                outras.length
            )
        ];

    }


    // ====================================
    // PODE SORTEAR MAÇÃ
    // ====================================

    if (
        Math.random() <
        CONFIG_JOGO.chanceFrutaAlvo
    ) {

        frutasDesdeUltimaMaca = 0;

        return CONFIG_JOGO
            .frutaAlvoId;

    }


    // ====================================
    // VEIO OUTRA FRUTA
    // ====================================

    frutasDesdeUltimaMaca++;

    return outras[
        Math.floor(
            Math.random() *
            outras.length
        )
    ];

}

// ========================================
// 12. GERAR FRUTA
// ========================================

function gerarFruta() {

    if (
        estadoJogo !==
        "JOGANDO"
    ) {

        return;

    }


    if (
        frutasAtivas.length >=
        CONFIG_JOGO
            .maxFrutasSimultaneas
    ) {

        return;

    }


    const tipoId =
        sortearTipoFruta();


    const dadosFruta =
        FRUTAS[tipoId];


    const areaRect =
        DOM.gameArea
            .getBoundingClientRect();


    const larguraArea =
        areaRect.width;


    const alturaArea =
        areaRect.height;


    const tam =
        CONFIG_JOGO
            .tamanhoFruta;


    const margem =
        40;


    const xMin =
        margem;


    const xMax =
        larguraArea -
        tam -
        margem;


    const x =
        xMin +
        Math.random() *
        (xMax - xMin);


    const y =
        alturaArea -
        tam -
        20;


    let velocidadeX =
        (Math.random() - 0.5) *
        2.2;


    let velocidadeY =
        -(11 +
        Math.random() * 3.5);


    const elemento =
        document.createElement(
            "div"
        );


    elemento.className =
        "fruit-item";


    elemento.innerHTML =
        `
        <span class="fruit-emoji">
            ${dadosFruta.emoji}
        </span>
        `;


    DOM.fruitsContainer
        .appendChild(
            elemento
        );


    const novaFruta = {

        id:
            Math.random()
                .toString(36)
                .substring(2, 9),

        tipo:
            tipoId,

        x:
            x,

        y:
            y,

        velocidadeX:
            velocidadeX,

        velocidadeY:
            velocidadeY,

        tamanho:
            tam,

        raioAcerto:
            CONFIG_JOGO
                .raioAcerto,

        cortada:
            false,

        elemento:
            elemento

    };


    frutasAtivas
        .push(
            novaFruta
        );


    atualizarPosicaoElemento(
        novaFruta
    );

}


// ========================================
// 13. FÍSICA
// ========================================

const gravidade =
    0.38;


function loopPrincipal() {

    if (
        estadoJogo !==
        "JOGANDO"
    ) {

        return;

    }


    const areaAltura =
        DOM.gameArea
            .clientHeight;


    for (
        let i =
            frutasAtivas.length - 1;

        i >= 0;

        i--
    ) {

        const fruta =
            frutasAtivas[i];


        if (
            fruta.cortada
        ) {

            continue;

        }


        fruta.velocidadeY +=
            gravidade;


        fruta.x +=
            fruta.velocidadeX;


        fruta.y +=
            fruta.velocidadeY;


        atualizarPosicaoElemento(
            fruta
        );


        // ====================================
        // FRUTA CAIU
        // ====================================

        if (
            fruta.y >
            areaAltura + 50
        ) {


            // SE ERA MAÇÃ
            // PERDE 1

            if (
                fruta.tipo ===
                CONFIG_JOGO
                    .frutaAlvoId
            ) {

                perderPonto(
                    "🍎 Você perdeu uma maçã! -1"
                );

            }


            fruta.elemento
                .remove();


            frutasAtivas
                .splice(
                    i,
                    1
                );

        }

    }


    idAnimationFrame =
        requestAnimationFrame(
            loopPrincipal
        );

}


// ========================================
// 14. POSIÇÃO
// ========================================

function atualizarPosicaoElemento(
    fruta
) {

    fruta.elemento
        .style
        .transform =
        `translate3d(
            ${fruta.x}px,
            ${fruta.y}px,
            0
        )`;

}


// ========================================
// 15. CONTROLE TOUCH / MOUSE
// ========================================

function configurarPointerEvents() {

    DOM.gameArea
        .addEventListener(
            "pointerdown",
            evento => {


                if (
                    estadoJogo !==
                    "JOGANDO"
                ) {

                    return;

                }


                if (
                    ponteiroAtivoId !==
                    null
                ) {

                    return;

                }


                ponteiroAtivoId =
                    evento.pointerId;


                try {

                    DOM.gameArea
                        .setPointerCapture(
                            evento.pointerId
                        );

                }

                catch (erro) {}


                const coords =
                    obterCoordenadasRelativas(
                        evento
                    );


                pontoAnterior =
                    coords;


                pontoAtual =
                    coords;


                adicionarPontoTrilha(
                    coords.x,
                    coords.y
                );


                verificarColisaoPontoUnico(
                    coords.x,
                    coords.y
                );

            }
        );


    DOM.gameArea
        .addEventListener(
            "pointermove",
            evento => {


                if (
                    estadoJogo !==
                    "JOGANDO"
                ) {

                    return;

                }


                if (
                    evento.pointerId !==
                    ponteiroAtivoId
                ) {

                    return;

                }


                const coords =
                    obterCoordenadasRelativas(
                        evento
                    );


                pontoAnterior =
                    pontoAtual;


                pontoAtual =
                    coords;


                adicionarPontoTrilha(
                    coords.x,
                    coords.y
                );


                verificarColisaoSwipe(
                    pontoAnterior,
                    pontoAtual
                );

            }
        );


    const finalizarPointer =
        evento => {


            if (
                evento.pointerId !==
                ponteiroAtivoId
            ) {

                return;

            }


            ponteiroAtivoId =
                null;


            pontoAnterior =
                null;


            pontoAtual =
                null;

        };


    DOM.gameArea
        .addEventListener(
            "pointerup",
            finalizarPointer
        );


    DOM.gameArea
        .addEventListener(
            "pointercancel",
            finalizarPointer
        );

}


// ========================================
// 16. COORDENADAS
// ========================================

function obterCoordenadasRelativas(
    evento
) {

    const rect =
        DOM.gameArea
            .getBoundingClientRect();


    return {

        x:
            evento.clientX -
            rect.left,

        y:
            evento.clientY -
            rect.top

    };

}


// ========================================
// 17. DISTÂNCIA
// ========================================

function distanciaPontoParaSegmento(
    px,
    py,
    x1,
    y1,
    x2,
    y2
) {

    const A =
        px - x1;

    const B =
        py - y1;

    const C =
        x2 - x1;

    const D =
        y2 - y1;


    const dot =
        A * C +
        B * D;


    const lenSq =
        C * C +
        D * D;


    let param =
        -1;


    if (
        lenSq !== 0
    ) {

        param =
            dot / lenSq;

    }


    let xx;

    let yy;


    if (
        param < 0
    ) {

        xx =
            x1;

        yy =
            y1;

    }

    else if (
        param > 1
    ) {

        xx =
            x2;

        yy =
            y2;

    }

    else {

        xx =
            x1 +
            param * C;

        yy =
            y1 +
            param * D;

    }


    const dx =
        px - xx;


    const dy =
        py - yy;


    return Math.sqrt(
        dx * dx +
        dy * dy
    );

}


// ========================================
// 18. COLISÃO SWIPE
// ========================================

function verificarColisaoSwipe(
    ponto1,
    ponto2
) {

    if (
        !ponto1 ||
        !ponto2
    ) {

        return;

    }


    [...frutasAtivas]
        .forEach(fruta => {


            if (
                fruta.cortada
            ) {

                return;

            }


            const centroX =
                fruta.x +
                fruta.tamanho / 2;


            const centroY =
                fruta.y +
                fruta.tamanho / 2;


            const distancia =
                distanciaPontoParaSegmento(

                    centroX,

                    centroY,

                    ponto1.x,

                    ponto1.y,

                    ponto2.x,

                    ponto2.y

                );


            if (
                distancia <=
                fruta.raioAcerto
            ) {

                processarCorteFruta(
                    fruta
                );

            }

        });

}


// ========================================
// 19. COLISÃO CLICK
// ========================================

function verificarColisaoPontoUnico(
    px,
    py
) {

    [...frutasAtivas]
        .forEach(fruta => {


            if (
                fruta.cortada
            ) {

                return;

            }


            const centroX =
                fruta.x +
                fruta.tamanho / 2;


            const centroY =
                fruta.y +
                fruta.tamanho / 2;


            const dx =
                px - centroX;


            const dy =
                py - centroY;


            const distancia =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distancia <=
                fruta.raioAcerto
            ) {

                processarCorteFruta(
                    fruta
                );

            }

        });

}


// ========================================
// 20. CORTAR FRUTA
// ========================================

function processarCorteFruta(
    fruta
) {

    if (
        fruta.cortada
    ) {

        return;

    }


    fruta.cortada =
        true;


    const centroX =
        fruta.x +
        fruta.tamanho / 2;


    const centroY =
        fruta.y +
        fruta.tamanho / 2;


    // ====================================
    // MAÇÃ CORRETA
    // ====================================

    if (
        fruta.tipo ===
        CONFIG_JOGO
            .frutaAlvoId
    ) {

        progresso++;


        atualizarHUD();


        animarCorteFrutaCorreta(

            fruta,

            centroX,

            centroY

        );


        criarParticulasSuco(

            centroX,

            centroY

        );


        exibirFeedback(
            "🍎 Boa! +1"
        );


        verificarVitoria();

    }


    // ====================================
    // FRUTA ERRADA
    // ====================================

    else {

        perderPonto(
            "❌ Fruta errada! -1"
        );


        animarFrutaErrada(
            fruta
        );

    }

}


// ========================================
// 21. PERDER PONTO
// ========================================

function perderPonto(
    mensagem
) {

    progresso =
        Math.max(
            0,
            progresso - 1
        );


    atualizarHUD();


    exibirFeedback(
        mensagem
    );

}


// ========================================
// 22. FEEDBACK
// ========================================

function exibirFeedback(
    texto
) {

    const agora =
        Date.now();


    if (
        agora -
        ultimaVezFeedback <
        350
    ) {

        return;

    }


    ultimaVezFeedback =
        agora;


    DOM.feedbackMessage
        .textContent =
        texto;


    DOM.feedbackMessage
        .classList
        .remove("hidden");


    setTimeout(() => {

        DOM.feedbackMessage
            .classList
            .add("hidden");

    }, 800);

}


// ========================================
// 23. FRUTA ERRADA
// ========================================

function animarFrutaErrada(
    fruta
) {

    fruta.elemento
        .classList
        .add("shake");


    setTimeout(() => {

        fruta.elemento
            .remove();


        const indice =
            frutasAtivas
                .indexOf(
                    fruta
                );


        if (
            indice > -1
        ) {

            frutasAtivas
                .splice(
                    indice,
                    1
                );

        }

    }, 250);

}


// ========================================
// 24. TRILHA
// ========================================

function adicionarPontoTrilha(
    x,
    y
) {

    const ponto =
        document.createElement(
            "div"
        );


    ponto.className =
        "swipe-dot";


    ponto.style.left =
        `${x - 6}px`;


    ponto.style.top =
        `${y - 6}px`;


    DOM.swipeTrailContainer
        .appendChild(
            ponto
        );


    setTimeout(() => {

        ponto.style.opacity =
            "0";


        ponto.style.transform =
            "scale(0.5)";


        setTimeout(
            () => ponto.remove(),
            200
        );

    }, 80);

}


// ========================================
// 25. CORTE DA MAÇÃ
// ========================================

function animarCorteFrutaCorreta(
    fruta,
    centroX,
    centroY
) {

    fruta.elemento
        .remove();


    const emojiOriginal =
        FRUTAS[
            fruta.tipo
        ].emoji;


    const metadeEsq =
        document.createElement(
            "div"
        );


    metadeEsq.className =
        "fruit-half left";


    metadeEsq.textContent =
        emojiOriginal;


    metadeEsq.style.left =
        `${fruta.x}px`;


    metadeEsq.style.top =
        `${fruta.y}px`;


    const metadeDir =
        document.createElement(
            "div"
        );


    metadeDir.className =
        "fruit-half right";


    metadeDir.textContent =
        emojiOriginal;


    metadeDir.style.left =
        `${fruta.x}px`;


    metadeDir.style.top =
        `${fruta.y}px`;


    DOM.fruitsContainer
        .appendChild(
            metadeEsq
        );


    DOM.fruitsContainer
        .appendChild(
            metadeDir
        );


    setTimeout(() => {

        metadeEsq.remove();

        metadeDir.remove();

    }, 500);


    const indice =
        frutasAtivas
            .indexOf(
                fruta
            );


    if (
        indice > -1
    ) {

        frutasAtivas
            .splice(
                indice,
                1
            );

    }

}


// ========================================
// 26. PARTÍCULAS
// ========================================

function criarParticulasSuco(
    cx,
    cy
) {

    const quantidade =
        5;


    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const particula =
            document.createElement(
                "div"
            );


        particula.className =
            "juice-particle";


        particula.style.left =
            `${cx}px`;


        particula.style.top =
            `${cy}px`;


        const angulo =
            Math.random() *
            Math.PI *
            2;


        const distancia =
            30 +
            Math.random() *
            40;


        const destX =
            Math.cos(
                angulo
            ) *
            distancia;


        const destY =
            Math.sin(
                angulo
            ) *
            distancia +
            20;


        particula.style
            .setProperty(
                "--translate-end",
                `translate(
                    ${destX}px,
                    ${destY}px
                )`
            );


        DOM.particlesContainer
            .appendChild(
                particula
            );


        setTimeout(
            () =>
                particula.remove(),
            400
        );

    }

}


// ========================================
// 27. HUD
// ========================================

function atualizarHUD() {

    DOM.progressText
        .textContent =
        `${progresso} / ${CONFIG_JOGO.metaAlvo}`;


    const slots =
        DOM.basketSlots
            .children;


    for (
        let i = 0;
        i < slots.length;
        i++
    ) {

        if (
            i < progresso
        ) {

            slots[i]
                .classList
                .add("filled");


            slots[i]
                .textContent =
                "🍎";

        }

        else {

            slots[i]
                .classList
                .remove("filled");


            slots[i]
                .textContent =
                "";

        }

    }

}


// ========================================
// 28. VITÓRIA
// ========================================

function verificarVitoria() {

    if (
        progresso <
        CONFIG_JOGO.metaAlvo
    ) {

        return;

    }


    estadoJogo =
        "VITORIA";


    if (
        idIntervaloSpawn
    ) {

        clearInterval(
            idIntervaloSpawn
        );

    }


    if (
        idAnimationFrame
    ) {

        cancelAnimationFrame(
            idAnimationFrame
        );

    }


    if (
        idTimer
    ) {

        clearInterval(
            idTimer
        );

    }


    frutasAtivas
        .forEach(fruta => {

            fruta.elemento
                .remove();

        });


    frutasAtivas =
        [];


    dispararConfetes();


    DOM.victoryScreen
        .classList
        .remove("hidden");

}


// ========================================
// 29. TEMPO ACABOU
// ========================================

function tempoEsgotado() {

    if (
        estadoJogo !==
        "JOGANDO"
    ) {

        return;

    }


    estadoJogo =
        "TEMPO_ESGOTADO";


    limparTudo();


    setTimeout(() => {

        alert(
            `⏰ Tempo esgotado!

Você conseguiu ${progresso} de ${CONFIG_JOGO.metaAlvo} maçãs.

Tente novamente! 🍎`
        );


        iniciarJogo();

    }, 300);

}


// ========================================
// 30. CONFETES
// ========================================

function dispararConfetes() {

    DOM.confettiContainer
        .innerHTML =
        "";


    const cores = [

        "#ff3333",

        "#ffb703",

        "#52b788",

        "#90e0ef",

        "#ffffff"

    ];


    for (
        let i = 0;
        i < 40;
        i++
    ) {

        const confete =
            document.createElement(
                "div"
            );


        confete.className =
            "confetti-piece";


        confete.style.left =
            `${Math.random() * 100}%`;


        confete.style.backgroundColor =

            cores[
                Math.floor(
                    Math.random() *
                    cores.length
                )
            ];


        confete.style.animationDuration =
            `${1.2 +
            Math.random() *
            1.5}s`;


        confete.style.animationDelay =
            `${Math.random() *
            0.4}s`;


        DOM.confettiContainer
            .appendChild(
                confete
            );

    }

}


// ========================================
// 31. EVENTOS
// ========================================

function configurarEventosGerais() {

    DOM.btnStart
        .addEventListener(
            "click",
            iniciarJogo
        );


    DOM.btnReset
        .addEventListener(
            "click",
            reiniciarJogo
        );


    configurarPointerEvents();

}


// ========================================
// 32. AVISA MAPA
// ========================================

function onMinigameConcluido(
    fruta
) {

    window.parent
        .postMessage({

            type:
                "frutaviva:minigame-concluido",

            detail: {

                fruta:
                    fruta

            }

        }, "*");

}


// ========================================
// 33. BOTÃO QUIZ
// ========================================

function configurarIntegracaoQuiz() {

    DOM.btnQuiz
        .addEventListener(
            "click",
            () => {

                estadoJogo =
                    "QUIZ_LIBERADO";


                onMinigameConcluido(
                    CONFIG_JOGO
                        .frutaAlvoId
                );

            }
        );

}


// ========================================
// 34. INICIALIZAÇÃO
// ========================================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        configurarEventosGerais();

        configurarIntegracaoQuiz();

    }
);
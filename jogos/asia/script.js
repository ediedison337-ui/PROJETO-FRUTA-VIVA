// ========================================
// 1. CONFIGURAÇÕES DO JOGO
// ========================================
const CONFIG_JOGO = {
    totalPecas: 9,
    tempoAnimacaoTrocaMs: 300,
    tempoLimiteSegundos: 15
};


// ========================================
// 2. DADOS DAS PEÇAS
// ========================================
let pecasMosaico = [];


// ========================================
// 3. ESTADO DO JOGO
// ========================================
let estadoJogo = "PREPARANDO";
// PREPARANDO, JOGANDO, TROCANDO, VITORIA, QUIZ_LIBERADO

let indiceSelecionado = null;

let trocaEmAndamento = false;

let timeoutTrocaAtivo = null;

let timeoutVitoriaAtivo = null;

// ========================================
// TIMER
// ========================================

let tempoRestante = CONFIG_JOGO.tempoLimiteSegundos;

let intervaloTimerAtivo = null;

let quantidadeCorretasAtual = 0;


// ========================================
// 4. ELEMENTOS DO DOM
// ========================================
const DOM = {
    startScreen: document.getElementById("start-screen"),
    gameScreen: document.getElementById("game-screen"),
    victoryScreen: document.getElementById("victory-screen"),

    btnStart: document.getElementById("btn-start"),
    btnReset: document.getElementById("btn-reset"),
    btnQuiz: document.getElementById("btn-quiz"),

    puzzleBoard: document.getElementById("puzzle-board"),

    progressText: document.getElementById("progress-text"),
    tilesIndicator: document.getElementById("tiles-indicator"),

    ariaAnnouncer: document.getElementById("aria-announcer")
};


// ========================================
// 5. CRIAÇÃO DAS PEÇAS
// ========================================
function criarPecas() {

    let pecasGeradas = [];

    let idContador = 0;


    // Cria uma matriz visual 3x3.
    // Linha vai de 0 até 2.
    // Coluna vai de 0 até 2.
    for (let linha = 0; linha < 3; linha++) {

        for (let coluna = 0; coluna < 3; coluna++) {

            pecasGeradas.push({

                id: idContador,

                posicaoCorreta: idContador,

                linhaOriginal: linha,

                colunaOriginal: coluna
            });


            idContador++;
        }
    }


    return pecasGeradas;
}


// ========================================
// 6. EMBARALHAMENTO
// ========================================
function embaralharPecas(pecas) {

    let arrayEmbaralhado = [...pecas];


    // Fisher-Yates
    for (let i = arrayEmbaralhado.length - 1; i > 0; i--) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );


        [
            arrayEmbaralhado[i],
            arrayEmbaralhado[j]
        ] = [
            arrayEmbaralhado[j],
            arrayEmbaralhado[i]
        ];
    }


    // Conta quantas peças ficaram fora
    // de suas posições corretas.
    const pecasForaDoLugar = arrayEmbaralhado.filter(
        (peca, indice) => {

            return peca.posicaoCorreta !== indice;
        }
    ).length;


    // Não deixa o jogo começar praticamente resolvido.
    // Queremos pelo menos 3 peças fora do lugar.
    if (pecasForaDoLugar < 9) {

        return embaralharPecas(pecas);
    }


    return arrayEmbaralhado;
}


// Verifica se TODAS as peças estão corretas.
function verificarSeEstaResolvido(pecas) {

    return pecas.every(
        (peca, indice) => {

            return peca.posicaoCorreta === indice;
        }
    );
}


// ========================================
// 7. RENDERIZAÇÃO
// ========================================

// Cria os 9 quadradinhos visuais
// usados para mostrar o progresso.
function inicializarIndicadoresVisuais() {

    DOM.tilesIndicator.innerHTML = "";


    for (
        let i = 0;
        i < CONFIG_JOGO.totalPecas;
        i++
    ) {

        const box = document.createElement("div");

        box.className = "tile-box";

        box.dataset.index = i;

        DOM.tilesIndicator.appendChild(box);
    }
}


// Cria visualmente as 9 peças do mosaico.
function renderizarTabuleiro() {

    DOM.puzzleBoard.innerHTML = "";


    pecasMosaico.forEach(
        (peca, indiceAtual) => {

            const botao = document.createElement("button");


            botao.type = "button";

            botao.className = "peca";

            botao.dataset.index = indiceAtual;


            // ========================================
            // RECORTE DA IMAGEM
            // ========================================
            //
            // Como a imagem está dividida em 3 partes:
            //
            // coluna 0 = 0%
            // coluna 1 = 50%
            // coluna 2 = 100%
            //
            // linha 0 = 0%
            // linha 1 = 50%
            // linha 2 = 100%
            //
            // Isso posiciona corretamente cada pedaço
            // da imagem da manga.

            const posX =
                (peca.colunaOriginal / 2) * 100;

            const posY =
                (peca.linhaOriginal / 2) * 100;


            botao.style.backgroundPosition =
                `${posX}% ${posY}%`;


            // Verifica se a peça está
            // na posição correta.
            const correta = pecaEstaCorreta(
                peca,
                indiceAtual
            );


            if (correta) {

                botao.classList.add("correta");
            }


            // Mostra visualmente
            // a peça selecionada.
            if (
                indiceSelecionado === indiceAtual
            ) {

                botao.classList.add("selecionada");
            }


            // ========================================
            // ACESSIBILIDADE
            // ========================================

            if (correta) {

                botao.setAttribute(
                    "aria-label",
                    `Peça ${indiceAtual + 1} na posição correta`
                );

            } else if (
                indiceSelecionado === indiceAtual
            ) {

                botao.setAttribute(
                    "aria-label",
                    `Peça ${indiceAtual + 1} selecionada. Escolha outra peça para trocar.`
                );

            } else {

                botao.setAttribute(
                    "aria-label",
                    `Peça do mosaico, posição ${indiceAtual + 1}`
                );
            }


            DOM.puzzleBoard.appendChild(botao);
        }
    );
}


// ========================================
// 8. SELEÇÃO DAS PEÇAS
// ========================================
function lidarComCliquePeca(event) {

    // Se estiver no meio de uma troca,
    // ignora novos cliques.
    if (
        trocaEmAndamento ||
        estadoJogo !== "JOGANDO"
    ) {

        return;
    }


    const botaoPeca =
        event.target.closest(".peca");


    if (!botaoPeca) {

        return;
    }


    const indiceClicado =
        parseInt(
            botaoPeca.dataset.index,
            10
        );


    const pecaClicada =
        pecasMosaico[indiceClicado];


    // Se a peça já estiver correta,
    // ela fica travada.
    if (
        pecaEstaCorreta(
            pecaClicada,
            indiceClicado
        )
    ) {

        return;
    }


    // ========================================
    // PRIMEIRA PEÇA
    // ========================================
    if (indiceSelecionado === null) {

        indiceSelecionado = indiceClicado;


        anunciarParaLeitorTela(
            `Peça selecionada na posição ${indiceClicado + 1}. Escolha outra peça para trocar.`
        );


        renderizarTabuleiro();

        return;
    }


    // ========================================
    // CLICOU NA MESMA PEÇA
    // ========================================
    if (
        indiceSelecionado === indiceClicado
    ) {

        indiceSelecionado = null;


        anunciarParaLeitorTela(
            "Seleção cancelada."
        );


        renderizarTabuleiro();

        return;
    }


    // ========================================
    // SEGUNDA PEÇA
    // ========================================
    trocarPecas(
        indiceSelecionado,
        indiceClicado
    );
}


// ========================================
// 9. TROCA DAS PEÇAS
// ========================================
function trocarPecas(indiceA, indiceB) {

    estadoJogo = "TROCANDO";

    trocaEmAndamento = true;


    // Guarda temporariamente
    // a primeira peça.
    const temp =
        pecasMosaico[indiceA];


    // Coloca B no lugar de A.
    pecasMosaico[indiceA] =
        pecasMosaico[indiceB];


    // Coloca A no lugar de B.
    pecasMosaico[indiceB] =
        temp;


    // Limpa a seleção.
    indiceSelecionado = null;


    // Atualiza visualmente.
    renderizarTabuleiro();


    anunciarParaLeitorTela(
        "Peças trocadas."
    );


    // Espera a animação terminar
    // antes de liberar novos cliques.
    timeoutTrocaAtivo = setTimeout(
        () => {

            timeoutTrocaAtivo = null;

            trocaEmAndamento = false;


            verificarPecasCorretas();

        },
        CONFIG_JOGO.tempoAnimacaoTrocaMs
    );
}


// ========================================
// 10. VERIFICAÇÃO DAS POSIÇÕES
// ========================================

// Uma peça está correta quando:
//
// posição correta dela
//
// é igual
//
// ao índice onde ela está atualmente.
function pecaEstaCorreta(
    peca,
    indiceAtual
) {

    return (
        peca.posicaoCorreta ===
        indiceAtual
    );
}


// Verifica TODAS as peças
// depois de cada troca.
function verificarPecasCorretas() {

    let quantidadeCorretas = 0;


    pecasMosaico.forEach(
        (peca, indice) => {

            if (
                pecaEstaCorreta(
                    peca,
                    indice
                )
            ) {

                quantidadeCorretas++;
            }
        }
    );


    atualizarProgressoVisual(
        quantidadeCorretas
    );


    // ========================================
    // VITÓRIA
    // ========================================
    if (
        quantidadeCorretas ===
        CONFIG_JOGO.totalPecas
    ) {

        dispararVitoria();

        return;
    }


    // Se ainda não venceu,
    // volta a aceitar cliques.
    estadoJogo = "JOGANDO";
}


// ========================================
// 11. PROGRESSO
// ========================================
function atualizarProgressoVisual(
    quantidadeCorretas
) {

    quantidadeCorretasAtual =
        quantidadeCorretas;


    atualizarTextoProgresso();


    const boxes =
        DOM.tilesIndicator.children;


    for (
        let i = 0;
        i < boxes.length;
        i++
    ) {

        if (
            i < quantidadeCorretas
        ) {

            boxes[i].classList.add(
                "active"
            );

        } else {

            boxes[i].classList.remove(
                "active"
            );
        }
    }


    anunciarParaLeitorTela(
        `${quantidadeCorretas} de ${CONFIG_JOGO.totalPecas} peças no lugar`
    );
}


// ========================================
// TEXTO DO PROGRESSO + TIMER
// ========================================

function atualizarTextoProgresso() {

    DOM.progressText.textContent =
        `${quantidadeCorretasAtual} / ${CONFIG_JOGO.totalPecas}  |  ⏱️ ${tempoRestante}s`;
}


// ========================================
// INICIAR TIMER
// ========================================

function iniciarTimer() {

    pararTimer();


    tempoRestante =
        CONFIG_JOGO.tempoLimiteSegundos;


    atualizarTextoProgresso();


    intervaloTimerAtivo =
        setInterval(() => {

            if (
                estadoJogo !== "JOGANDO" &&
                estadoJogo !== "TROCANDO"
            ) {

                return;
            }


            tempoRestante--;


            if (tempoRestante < 0) {

                tempoRestante = 0;
            }


            atualizarTextoProgresso();


            if (tempoRestante <= 0) {

                tempoEsgotado();
            }

        }, 1000);
}


// ========================================
// PARAR TIMER
// ========================================

function pararTimer() {

    if (intervaloTimerAtivo) {

        clearInterval(
            intervaloTimerAtivo
        );

        intervaloTimerAtivo = null;
    }
}


// ========================================
// TEMPO ESGOTADO
// ========================================

function tempoEsgotado() {

    pararTimer();


    estadoJogo =
        "TEMPO_ESGOTADO";


    trocaEmAndamento = true;

    indiceSelecionado = null;


    // Cancela uma troca
    // que ainda estivesse acontecendo.
    if (timeoutTrocaAtivo) {

        clearTimeout(
            timeoutTrocaAtivo
        );

        timeoutTrocaAtivo = null;
    }


    DOM.progressText.textContent =
        "TEMPO ESGOTADO! ⏱️ 0s";


    renderizarTabuleiro();


    anunciarParaLeitorTela(
        "Tempo esgotado! Clique em reiniciar para tentar novamente."
    );
}

// Mensagens destinadas
// principalmente a leitores de tela.
function anunciarParaLeitorTela(
    mensagem
) {

    DOM.ariaAnnouncer.textContent = "";


    setTimeout(
        () => {

            DOM.ariaAnnouncer.textContent =
                mensagem;

        },
        50
    );
}


// ========================================
// 12. REINICIAR
// ========================================
function reiniciarJogo() {

    // Cancela qualquer troca
    // que ainda estiver pendente.
    if (timeoutTrocaAtivo) {

        clearTimeout(
            timeoutTrocaAtivo
        );

        timeoutTrocaAtivo = null;
    }


    // Cancela também o modal
    // de vitória pendente.
    if (timeoutVitoriaAtivo) {

        clearTimeout(
            timeoutVitoriaAtivo
        );

        timeoutVitoriaAtivo = null;
    }


    indiceSelecionado = null;

    trocaEmAndamento = false;


    DOM.victoryScreen.classList.add(
        "hidden"
    );


    // Cria novamente as peças.
    const pecasBase =
        criarPecas();


    // Embaralha.
    pecasMosaico =
        embaralharPecas(
            pecasBase
        );


    // Recria os indicadores.
    inicializarIndicadoresVisuais();


    // Mostra o tabuleiro.
    renderizarTabuleiro();


    // ========================================
    // PROGRESSO INICIAL
    // ========================================

    let corretasIniciais = 0;


    pecasMosaico.forEach(
        (peca, indice) => {

            if (
                pecaEstaCorreta(
                    peca,
                    indice
                )
            ) {

                corretasIniciais++;
            }
        }
    );


    atualizarProgressoVisual(
        corretasIniciais
    );


        estadoJogo = "JOGANDO";

    iniciarTimer();
}


    pararTimer();

    tempoRestante =
        CONFIG_JOGO.tempoLimiteSegundos;

    quantidadeCorretasAtual = 0;
// ========================================
// 13. VITÓRIA
// ========================================
function dispararVitoria() {

    pararTimer();
    
    estadoJogo = "VITORIA";

    trocaEmAndamento = true;


    // Guarda o timeout para podermos
    // cancelá-lo caso o jogo seja reiniciado.
    timeoutVitoriaAtivo = setTimeout(
        () => {

            // Só mostra a vitória
            // se o jogo AINDA estiver
            // no estado VITORIA.
            if (
                estadoJogo === "VITORIA"
            ) {

                DOM.victoryScreen.classList.remove(
                    "hidden"
                );


                anunciarParaLeitorTela(
                    "Mosaico completo! Você montou a manga!"
                );
            }


            timeoutVitoriaAtivo = null;

        },
        400
    );
}


// ========================================
// 14. EVENTOS
// ========================================
function configurarEventosGerais() {

    // COMEÇAR
    DOM.btnStart.addEventListener(
        "click",
        () => {

            DOM.startScreen.classList.add(
                "hidden"
            );


            DOM.gameScreen.classList.remove(
                "hidden"
            );


            reiniciarJogo();
        }
    );


    // REINICIAR
    DOM.btnReset.addEventListener(
        "click",
        reiniciarJogo
    );


    // Um único listener no tabuleiro.
    // As peças são criadas dinamicamente.
    DOM.puzzleBoard.addEventListener(
        "click",
        lidarComCliquePeca
    );
}


// ========================================
// 15. INTEGRAÇÃO FUTURA
// ========================================
function onMinigameConcluido() {

    window.parent.postMessage({
        type: 'frutaviva:minigame-concluido',
        detail: {
            fruta: 'manga'
        }
    }, '*');

}


function configurarIntegracaoQuiz() {

    DOM.btnQuiz.addEventListener(
        "click",
        () => {

            estadoJogo =
                "QUIZ_LIBERADO";


            onMinigameConcluido();
        }
    );
}


// ========================================
// INICIALIZAÇÃO
// ========================================
window.addEventListener(
    "DOMContentLoaded",
    () => {

        configurarEventosGerais();

        configurarIntegracaoQuiz();
    }
);
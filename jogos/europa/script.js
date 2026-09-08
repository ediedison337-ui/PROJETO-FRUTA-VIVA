// ========================================
// FRUTA VIVA
// EUROPA — UVA
// JOGO DOS TUBINHOS
// ========================================


// ========================================
// 1. CONFIGURAÇÕES
// ========================================

const CONFIG_FASE = {

    frutaNome: "uva",

    corAlvo: "roxo",

    capacidadeJarra: 6,

    capacidadeRecipiente: 4,


    // ====================================
    // 3 TUBOS CHEIOS
    // 1 TUBO VAZIO
    // ====================================

    estadoInicial: {

        tubos: [

            [
                "roxo",
                "verde",
                "roxo",
                "amarelo"
            ],

            [
                "verde",
                "roxo",
                "amarelo",
                "roxo"
            ],

            [
                "amarelo",
                "roxo",
                "verde",
                "roxo"
            ],

            []
        ],

        nivelJarra: 0
    }
};


// ========================================
// 2. ESTADO
// ========================================

let estadoJogo = {

    status: "PREPARANDO",

    tubos: [],

    nivelJarra: 0,

    recipienteSelecionadoIndex: null,

    historicoPassos: []
};


// ========================================
// 3. RENDERIZAÇÃO
// ========================================

function renderizarTudo() {

    renderizarRecipientes();

    renderizarJarra();
}


// ========================================
// RENDERIZAR TUBOS
// ========================================

function renderizarRecipientes() {

    const container =
        document.getElementById(
            "tubes-container"
        );


    container.innerHTML = "";


    estadoJogo.tubos.forEach(
        (tubo, index) => {


            const elementoTubo =
                document.createElement(
                    "div"
                );


            elementoTubo.className =
                "tube";


            elementoTubo.dataset.index =
                index;


            elementoTubo.setAttribute(
                "role",
                "button"
            );


            elementoTubo.setAttribute(
                "tabindex",
                "0"
            );


            elementoTubo.setAttribute(
                "aria-label",
                `Tubo ${index + 1}`
            );


            // =============================
            // TUBO VAZIO
            // =============================

            if (
                tubo.length === 0
            ) {

                elementoTubo.classList.add(
                    "empty"
                );


                const labelVazio =
                    document.createElement(
                        "span"
                    );


                labelVazio.className =
                    "empty-label";


                labelVazio.textContent =
                    "LIVRE";


                elementoTubo.appendChild(
                    labelVazio
                );
            }


            // =============================
            // SELECIONADO
            // =============================

            if (
                estadoJogo
                    .recipienteSelecionadoIndex
                === index
            ) {

                elementoTubo.classList.add(
                    "selected"
                );
            }


            // =============================
            // DESTINO POSSÍVEL
            // =============================

            else if (
                estadoJogo
                    .recipienteSelecionadoIndex
                !== null
            ) {

                const origem =
                    estadoJogo
                        .recipienteSelecionadoIndex;


                const corOrigem =
                    obterCorTopo(
                        origem
                    );


                if (
                    corOrigem &&
                    podeMover(
                        origem,
                        index
                    )
                ) {

                    elementoTubo
                        .classList
                        .add(
                            "highlighted"
                        );
                }
            }


            // =============================
            // LÍQUIDOS
            // =============================

            tubo.forEach(
                cor => {


                    const blocoLiquido =
                        document.createElement(
                            "div"
                        );


                    blocoLiquido.className =
                        `liquid-block liquid-${cor}`;


                    elementoTubo.appendChild(
                        blocoLiquido
                    );

                }
            );


            // =============================
            // CLIQUE
            // =============================

            elementoTubo.addEventListener(
                "click",
                () => {

                    lidarComCliqueTubo(
                        index
                    );
                }
            );


            // =============================
            // TECLADO
            // =============================

            elementoTubo.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        lidarComCliqueTubo(
                            index
                        );
                    }
                }
            );


            container.appendChild(
                elementoTubo
            );
        }
    );
}


// ========================================
// RENDERIZAR JARRA
// ========================================

function renderizarJarra() {

    const jarraEl =
        document.getElementById(
            "jarra"
        );


    const liquidoEl =
        document.getElementById(
            "jar-liquid"
        );


    const progressoEl =
        document.getElementById(
            "jar-progress-text"
        );


    const percentual =
        (
            estadoJogo.nivelJarra /
            CONFIG_FASE.capacidadeJarra
        ) * 100;


    liquidoEl.style.height =
        `${percentual}%`;


    progressoEl.textContent =
        `${estadoJogo.nivelJarra} / ${CONFIG_FASE.capacidadeJarra}`;


    // ====================================
    // JARRA PODE RECEBER ROXO
    // ====================================

    if (
        estadoJogo
            .recipienteSelecionadoIndex
        !== null
    ) {

        const corTopo =
            obterCorTopo(
                estadoJogo
                    .recipienteSelecionadoIndex
            );


        if (
            corTopo ===
                CONFIG_FASE.corAlvo &&

            estadoJogo.nivelJarra <
                CONFIG_FASE.capacidadeJarra
        ) {

            jarraEl.classList.add(
                "highlighted"
            );

        } else {

            jarraEl.classList.remove(
                "highlighted"
            );
        }

    } else {

        jarraEl.classList.remove(
            "highlighted"
        );
    }
}


// ========================================
// 4. REGRAS
// ========================================

function obterCorTopo(
    indiceTubo
) {

    const tubo =
        estadoJogo.tubos[
            indiceTubo
        ];


    if (
        tubo.length === 0
    ) {

        return null;
    }


    return tubo[
        tubo.length - 1
    ];
}


// ========================================
// CORES IGUAIS NO TOPO
// ========================================

function contarConsecutivosTopo(
    indiceTubo
) {

    const tubo =
        estadoJogo.tubos[
            indiceTubo
        ];


    if (
        tubo.length === 0
    ) {

        return 0;
    }


    const corTopo =
        tubo[
            tubo.length - 1
        ];


    let quantidade = 0;


    for (
        let i =
            tubo.length - 1;

        i >= 0;

        i--
    ) {

        if (
            tubo[i] ===
            corTopo
        ) {

            quantidade++;

        } else {

            break;
        }
    }


    return quantidade;
}


// ========================================
// ESPAÇO DO DESTINO
// ========================================

function calcularEspacoDisponivel(
    indiceDestino
) {

    const destino =
        estadoJogo.tubos[
            indiceDestino
        ];


    return (
        CONFIG_FASE
            .capacidadeRecipiente
        -
        destino.length
    );
}


// ========================================
// PODE MOVER?
// ========================================

function podeMover(
    origemIndex,
    destinoIndex
) {

    if (
        origemIndex ===
        destinoIndex
    ) {

        return false;
    }


    const origem =
        estadoJogo.tubos[
            origemIndex
        ];


    const destino =
        estadoJogo.tubos[
            destinoIndex
        ];


    // Origem vazia
    if (
        origem.length === 0
    ) {

        return false;
    }


    // Destino cheio
    if (
        destino.length >=
        CONFIG_FASE
            .capacidadeRecipiente
    ) {

        return false;
    }


    // Destino vazio
    if (
        destino.length === 0
    ) {

        return true;
    }


    const corOrigem =
        obterCorTopo(
            origemIndex
        );


    const corDestino =
        obterCorTopo(
            destinoIndex
        );


    // Só junta cores iguais
    return (
        corOrigem ===
        corDestino
    );
}


// ========================================
// 5. HISTÓRICO
// ========================================

function salvarEstadoHistorico() {

    const copia = {

        tubos:
            JSON.parse(
                JSON.stringify(
                    estadoJogo.tubos
                )
            ),

        nivelJarra:
            estadoJogo.nivelJarra
    };


    estadoJogo
        .historicoPassos
        .push(
            copia
        );
}


// ========================================
// 6. TRANSFERÊNCIA ENTRE TUBOS
// ========================================

function executarTransferencia(
    origemIndex,
    destinoIndex
) {

    salvarEstadoHistorico();


    const quantidadeTopo =
        contarConsecutivosTopo(
            origemIndex
        );


    const espaco =
        calcularEspacoDisponivel(
            destinoIndex
        );


    const quantidadeTransferir =
        Math.min(
            quantidadeTopo,
            espaco
        );


    for (
        let i = 0;

        i < quantidadeTransferir;

        i++
    ) {

        const cor =
            estadoJogo
                .tubos[
                    origemIndex
                ]
                .pop();


        estadoJogo
            .tubos[
                destinoIndex
            ]
            .push(
                cor
            );
    }


    estadoJogo
        .recipienteSelecionadoIndex =
        null;


    renderizarTudo();


    verificarVitoria();
}


// ========================================
// 7. TRANSFERÊNCIA PARA A JARRA
// ========================================

function executarTransferenciaParaJarra(
    origemIndex
) {

    const corOrigem =
        obterCorTopo(
            origemIndex
        );


    // ====================================
    // COR ERRADA
    // ====================================

    if (
        corOrigem !==
        CONFIG_FASE.corAlvo
    ) {

        animarShakeElement(
            document.getElementById(
                "jarra"
            )
        );


        mostrarFeedback(
            "Só o ROXO vai para a jarra! 🍇"
        );


        estadoJogo
            .recipienteSelecionadoIndex =
            null;


        renderizarTudo();


        return;
    }


    salvarEstadoHistorico();


    const quantidadeTopo =
        contarConsecutivosTopo(
            origemIndex
        );


    const espacoJarra =
        CONFIG_FASE
            .capacidadeJarra
        -
        estadoJogo.nivelJarra;


    const quantidadeTransferir =
        Math.min(
            quantidadeTopo,
            espacoJarra
        );


    for (
        let i = 0;

        i < quantidadeTransferir;

        i++
    ) {

        estadoJogo
            .tubos[
                origemIndex
            ]
            .pop();
    }


    estadoJogo.nivelJarra +=
        quantidadeTransferir;


    estadoJogo
        .recipienteSelecionadoIndex =
        null;


    renderizarTudo();


    verificarVitoria();
}


// ========================================
// 8. CLIQUE NO TUBO
// ========================================

function lidarComCliqueTubo(
    index
) {

    if (
        estadoJogo.status ===
            "VITORIA" ||

        estadoJogo.status ===
            "QUIZ_LIBERADO" ||

        estadoJogo.status ===
            "ANIMANDO"
    ) {

        return;
    }


    const selecionado =
        estadoJogo
            .recipienteSelecionadoIndex;


    // ====================================
    // PRIMEIRO CLIQUE
    // ====================================

    if (
        selecionado === null
    ) {

        if (
            estadoJogo
                .tubos[index]
                .length > 0
        ) {

            estadoJogo
                .recipienteSelecionadoIndex =
                index;


            renderizarTudo();
        }


        return;
    }


    // ====================================
    // MESMO TUBO
    // ====================================

    if (
        selecionado === index
    ) {

        estadoJogo
            .recipienteSelecionadoIndex =
            null;


        renderizarTudo();


        return;
    }


    // ====================================
    // TRANSFERÊNCIA VÁLIDA
    // ====================================

    if (
        podeMover(
            selecionado,
            index
        )
    ) {

        executarTransferencia(
            selecionado,
            index
        );


        return;
    }


    // ====================================
    // MOVIMENTO INVÁLIDO
    // ====================================

    const tuboDestino =
        document.querySelector(
            `[data-index="${index}"]`
        );


    animarShakeElement(
        tuboDestino
    );


    mostrarFeedback(
        "Esse líquido não pode ir aí."
    );


    estadoJogo
        .recipienteSelecionadoIndex =
        null;


    renderizarTudo();
}


// ========================================
// 9. CLIQUE NA JARRA
// ========================================

function configurarEventosJarra() {

    const jarra =
        document.getElementById(
            "jarra"
        );


    jarra.addEventListener(
        "click",
        () => {

            if (
                estadoJogo.status ===
                    "VITORIA" ||

                estadoJogo.status ===
                    "QUIZ_LIBERADO"
            ) {

                return;
            }


            const origem =
                estadoJogo
                    .recipienteSelecionadoIndex;


            if (
                origem !== null
            ) {

                executarTransferenciaParaJarra(
                    origem
                );
            }
        }
    );
}


// ========================================
// 10. DESFAZER
// ========================================

function acionarDesfazer() {

    if (
        estadoJogo
            .historicoPassos
            .length === 0
        ||
        estadoJogo.status ===
            "VITORIA"
    ) {

        return;
    }


    const ultimo =
        estadoJogo
            .historicoPassos
            .pop();


    estadoJogo.tubos =
        ultimo.tubos;


    estadoJogo.nivelJarra =
        ultimo.nivelJarra;


    estadoJogo
        .recipienteSelecionadoIndex =
        null;


    renderizarTudo();
}


// ========================================
// 11. REINICIAR
// ========================================

function acionarReiniciar() {

    estadoJogo.tubos =
        JSON.parse(
            JSON.stringify(
                CONFIG_FASE
                    .estadoInicial
                    .tubos
            )
        );


    estadoJogo.nivelJarra =
        CONFIG_FASE
            .estadoInicial
            .nivelJarra;


    estadoJogo
        .recipienteSelecionadoIndex =
        null;


    estadoJogo
        .historicoPassos =
        [];


    estadoJogo.status =
        "JOGANDO";


    document
        .getElementById(
            "victory-modal"
        )
        .classList
        .add(
            "hidden"
        );


    renderizarTudo();
}


// ========================================
// 12. FEEDBACK
// ========================================

let feedbackTimeout =
    null;


function mostrarFeedback(
    texto
) {

    const feedback =
        document.getElementById(
            "feedback-message"
        );


    feedback.textContent =
        texto;


    feedback.classList.remove(
        "hidden"
    );


    if (
        feedbackTimeout
    ) {

        clearTimeout(
            feedbackTimeout
        );
    }


    feedbackTimeout =
        setTimeout(
            () => {

                feedback
                    .classList
                    .add(
                        "hidden"
                    );

            },
            1200
        );
}


// ========================================
// SHAKE
// ========================================

function animarShakeElement(
    elemento
) {

    if (
        !elemento
    ) {

        return;
    }


    elemento.classList.remove(
        "shake"
    );


    void elemento.offsetWidth;


    elemento.classList.add(
        "shake"
    );


    setTimeout(
        () => {

            elemento
                .classList
                .remove(
                    "shake"
                );

        },
        300
    );
}


// ========================================
// 13. CONFETES
// ========================================

function dispararConfetes() {

    const container =
        document.getElementById(
            "confetti-container"
        );


    container.innerHTML =
        "";


    const cores = [

        "#9d4edd",

        "#ff9e00",

        "#52b788",

        "#ffcf33",

        "#c061ff"
    ];


    for (
        let i = 0;

        i < 38;

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
            `${1.4 + Math.random() * 1.4}s`;


        confete.style.animationDelay =
            `${Math.random() * 0.45}s`;


        container.appendChild(
            confete
        );
    }
}


// ========================================
// 14. VITÓRIA
// ========================================

function verificarVitoria() {

    if (
        estadoJogo.nivelJarra ===
        CONFIG_FASE.capacidadeJarra
    ) {

        estadoJogo.status =
            "VITORIA";


        dispararConfetes();


        document
            .getElementById(
                "victory-modal"
            )
            .classList
            .remove(
                "hidden"
            );
    }
}


// ========================================
// 15. INTEGRAÇÃO COM O MAPA
// ========================================

function onMinigameConcluido(
    fruta
) {

    // Evento na própria página
    window.dispatchEvent(

        new CustomEvent(
            "frutaviva:minigame-concluido",
            {

                detail: {

                    fruta:
                        fruta,

                    continente:
                        "europa"
                }
            }
        )
    );


    // Comunicação com iframe / mapa
    if (
        window.parent &&
        window.parent !==
            window
    ) {

        window.parent.postMessage(
            {

                type:
                    "frutaviva:minigame-concluido",

                detail: {

                    fruta:
                        fruta,

                    continente:
                        "europa"
                }

            },
            "*"
        );
    }


    console.log(
        `[Fruta Viva] Europa concluída: ${fruta}`
    );
}


// ========================================
// QUIZ
// ========================================

function configurarIntegracaoQuiz() {

    const btnQuiz =
        document.getElementById(
            "btn-quiz"
        );


    btnQuiz.addEventListener(
        "click",
        () => {

            if (
                estadoJogo.status !==
                "VITORIA"
            ) {

                return;
            }


            estadoJogo.status =
                "QUIZ_LIBERADO";


            onMinigameConcluido(
                CONFIG_FASE.frutaNome
            );


            btnQuiz.textContent =
                "Quiz liberado! ✓";


            btnQuiz.disabled =
                true;
        }
    );
}


// ========================================
// 16. INICIALIZAÇÃO
// ========================================

window.addEventListener(
    "DOMContentLoaded",
    () => {


        acionarReiniciar();


        configurarEventosJarra();


        configurarIntegracaoQuiz();


        document
            .getElementById(
                "btn-undo"
            )
            .addEventListener(
                "click",
                acionarDesfazer
            );


        document
            .getElementById(
                "btn-reset"
            )
            .addEventListener(
                "click",
                () => {

                    const btnQuiz =
                        document.getElementById(
                            "btn-quiz"
                        );


                    btnQuiz.disabled =
                        false;


                    btnQuiz.textContent =
                        "RESPONDER QUIZ";


                    acionarReiniciar();
                }
            );

    }
);
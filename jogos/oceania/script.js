// ========================================
// 1. CONFIGURAÇÕES DO JOGO
// ========================================

const CONFIG_JOGO = {
    tempoEsperaErroMs: 1000,
    totalPares: 9
};


// ========================================
// 2. DADOS DOS ITENS
// ========================================

const ITENS_MEMORIA = [

    {
        id: "maca",
        nome: "Maçã",
        tipo: "fruta",
        emoji: "🍎"
    },

    {
        id: "uva",
        nome: "Uva",
        tipo: "fruta",
        emoji: "🍇"
    },

    {
        id: "laranja",
        nome: "Laranja",
        tipo: "fruta",
        emoji: "🍊"
    },

    {
        id: "morango",
        nome: "Morango",
        tipo: "fruta",
        emoji: "🍓"
    },

    {
        id: "abacaxi",
        nome: "Abacaxi",
        tipo: "fruta",
        emoji: "🍍"
    },

    {
        id: "banana",
        nome: "Banana",
        tipo: "fruta",
        emoji: "🍌"
    },

    {
        id: "kiwi",
        nome: "Kiwi",
        tipo: "fruta",
        emoji: "🥝"
    },

    {
        id: "maraculivia",
        nome: "MaracuLívia",
        tipo: "personagem",
        imagem: "imagens/maraculivia.png"
    },

    {
        id: "laranjinha",
        nome: "Laranjinha",
        tipo: "personagem",
        imagem: "imagens/laranjinha.png"
    }

];


// ========================================
// 3. ESTADO DO JOGO
// ========================================

let estadoJogo = "PREPARANDO";

/*
Estados possíveis:

PREPARANDO
JOGANDO
COMPARANDO
VITORIA
QUIZ_LIBERADO
*/

let baralhoCartas = [];

let primeiraCarta = null;
let segundaCarta = null;

let tabuleiroBloqueado = false;

let paresEncontrados = 0;

/*
Guarda o timeout usado quando
duas cartas diferentes estão abertas.
*/
let timeoutComparacaoAtivo = null;

/*
Guarda o timeout usado para abrir
a tela de vitória.

Assim conseguimos cancelar esse evento
caso o jogador clique em Reiniciar.
*/
let timeoutVitoriaAtivo = null;


// ========================================
// 4. ELEMENTOS DO DOM
// ========================================

const DOM = {

    startScreen:
        document.getElementById("start-screen"),

    gameScreen:
        document.getElementById("game-screen"),

    victoryScreen:
        document.getElementById("victory-screen"),

    btnStart:
        document.getElementById("btn-start"),

    btnReset:
        document.getElementById("btn-reset"),

    btnQuiz:
        document.getElementById("btn-quiz"),

    memoryBoard:
        document.getElementById("memory-board"),

    progressText:
        document.getElementById("progress-text"),

    shellContainer:
        document.getElementById("shell-container")

};


// ========================================
// 5. CRIAÇÃO E EMBARALHAMENTO DAS CARTAS
// ========================================

function criarBaralho() {

    const cartasGeradas = [];

    /*
    Cada item é duplicado.

    Exemplo:

    maca-a
    maca-b

    As duas possuem:

    pairId = "maca"

    É o pairId que decide se existe um par.
    */

    ITENS_MEMORIA.forEach(item => {

        // Carta A
        cartasGeradas.push({

            cardId: `${item.id}-a`,

            pairId: item.id,

            nome: item.nome,

            tipo: item.tipo,

            emoji: item.emoji || null,

            imagem: item.imagem || null,

            virada: false,

            encontrada: false
        });


        // Carta B
        cartasGeradas.push({

            cardId: `${item.id}-b`,

            pairId: item.id,

            nome: item.nome,

            tipo: item.tipo,

            emoji: item.emoji || null,

            imagem: item.imagem || null,

            virada: false,

            encontrada: false
        });

    });


    baralhoCartas =
        embaralharCartas(cartasGeradas);
}


/*
Algoritmo Fisher-Yates.

Ele percorre o array de trás para frente
e troca cada posição por outra posição
aleatória.

Isso embaralha as 18 cartas.
*/
function embaralharCartas(cartas) {

    const arrayEmbaralhado = [...cartas];


    for (
        let i = arrayEmbaralhado.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
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


    return arrayEmbaralhado;
}


// ========================================
// 6. RENDERIZAÇÃO
// ========================================

function inicializarConchasVisual() {

    DOM.shellContainer.innerHTML = "";


    for (
        let i = 0;
        i < CONFIG_JOGO.totalPares;
        i++
    ) {

        const shell =
            document.createElement("span");


        shell.className = "shell-item";

        shell.textContent = "🐚";

        shell.dataset.index = i;


        DOM.shellContainer.appendChild(shell);
    }
}


function renderizarTabuleiro() {

    DOM.memoryBoard.innerHTML = "";


    baralhoCartas.forEach(carta => {

        /*
        Cada carta é um botão.

        Isso permite:

        mouse
        toque
        TAB
        Enter
        Espaço
        */

        const botao =
            document.createElement("button");


        botao.type = "button";

        botao.className =
            `carta
            ${carta.virada ? "virada" : ""}
            ${carta.encontrada ? "encontrada" : ""}`;


        botao.dataset.cardId =
            carta.cardId;


        // ------------------------------
        // Acessibilidade
        // ------------------------------

        if (carta.encontrada) {

            botao.setAttribute(
                "aria-label",
                `${carta.nome}, par encontrado`
            );

        }
        else if (carta.virada) {

            botao.setAttribute(
                "aria-label",
                `Carta: ${carta.nome}`
            );

        }
        else {

            /*
            Carta fechada NÃO revela
            qual item está escondido.
            */
            botao.setAttribute(
                "aria-label",
                "Carta escondida"
            );
        }


        // ------------------------------
        // Parte interna da carta
        // ------------------------------

        const interna =
            document.createElement("div");


        interna.className =
            "carta-interna";


        // ------------------------------
        // Face fechada
        // ------------------------------

        const verso =
            document.createElement("div");


        verso.className =
            "carta-verso";


        verso.innerHTML = "🌊";


        // ------------------------------
        // Face revelada
        // ------------------------------

        const frente =
            document.createElement("div");


        frente.className =
            "carta-frente";


        frente.appendChild(
            criarConteudoItem(carta)
        );


        // Montagem da carta
        interna.appendChild(verso);

        interna.appendChild(frente);

        botao.appendChild(interna);

        DOM.memoryBoard.appendChild(botao);
    });
}


/*
Esta função decide apenas COMO
mostrar o conteúdo da carta.

Se existir imagem:
usa imagem.

Se não existir:
usa emoji.

Por isso MaracuLívia e Laranjinha
funcionam sem regra especial.
*/
function criarConteudoItem(item) {

    const container =
        document.createElement("div");


    container.style.display = "flex";

    container.style.flexDirection = "column";

    container.style.alignItems = "center";

    container.style.justifyContent = "center";

    container.style.gap = "2px";

    container.style.width = "100%";

    container.style.height = "100%";


    // ------------------------------
    // Imagem
    // ------------------------------

    if (item.imagem) {

        const img =
            document.createElement("img");


        img.src = item.imagem;

        img.alt = item.nome;


        container.appendChild(img);
    }

    // ------------------------------
    // Emoji
    // ------------------------------

    else if (item.emoji) {

        const spanEmoji =
            document.createElement("span");


        spanEmoji.className =
            "emoji-conteudo";


        spanEmoji.textContent =
            item.emoji;


        container.appendChild(spanEmoji);
    }


    // ------------------------------
    // Nome
    // ------------------------------

    const spanNome =
        document.createElement("span");


    spanNome.className =
        "nome-conteudo";


    spanNome.textContent =
        item.nome;


    container.appendChild(spanNome);


    return container;
}


// ========================================
// 7. SELEÇÃO DAS CARTAS
// ========================================

function lidarComCliqueCarta(event) {

    /*
    Se o tabuleiro estiver bloqueado
    ou não estivermos jogando,
    não acontece nada.
    */
    if (
        tabuleiroBloqueado ||
        estadoJogo !== "JOGANDO"
    ) {
        return;
    }


    /*
    event.target pode ser:

    imagem
    texto
    div interna

    closest(".carta") sobe até encontrar
    o botão correspondente.
    */
    const botaoCarta =
        event.target.closest(".carta");


    if (!botaoCarta) {
        return;
    }


    const cardId =
        botaoCarta.dataset.cardId;


    const cartaSelecionada =
        baralhoCartas.find(
            carta =>
                carta.cardId === cardId
        );


    // ------------------------------
    // Proteções
    // ------------------------------

    if (!cartaSelecionada) {
        return;
    }


    // Carta já encontrada
    if (cartaSelecionada.encontrada) {
        return;
    }


    // Carta já aberta
    if (cartaSelecionada.virada) {
        return;
    }


    /*
    Impede usar a mesma carta
    como primeiro e segundo clique.
    */
    if (
        primeiraCarta &&
        primeiraCarta.cardId ===
        cartaSelecionada.cardId
    ) {
        return;
    }


    // Abre visualmente a carta
    virarCartaVisual(
        cartaSelecionada,
        true
    );


    // ------------------------------
    // PRIMEIRA CARTA
    // ------------------------------

    if (!primeiraCarta) {

        primeiraCarta =
            cartaSelecionada;

        return;
    }


    // ------------------------------
    // SEGUNDA CARTA
    // ------------------------------

    segundaCarta =
        cartaSelecionada;


    /*
    Agora temos duas cartas abertas.

    Bloqueamos o tabuleiro
    antes de comparar.
    */
    tabuleiroBloqueado = true;


    compararCartas();
}


function virarCartaVisual(carta, virar) {

    carta.virada = virar;


    const botao =
        DOM.memoryBoard.querySelector(
            `[data-card-id="${carta.cardId}"]`
        );


    if (!botao) {
        return;
    }


    if (virar) {

        botao.classList.add("virada");


        botao.setAttribute(
            "aria-label",
            `Carta: ${carta.nome}`
        );
    }

    else {

        botao.classList.remove("virada");


        botao.setAttribute(
            "aria-label",
            "Carta escondida"
        );
    }
}


// ========================================
// 8. COMPARAÇÃO DOS PARES
// ========================================

function compararCartas() {

    estadoJogo = "COMPARANDO";


    /*
    Aqui está a regra principal
    do jogo da memória.

    Se os pairId forem iguais,
    encontramos um par.
    */

    if (
        primeiraCarta.pairId ===
        segundaCarta.pairId
    ) {

        // =================================
        // PAR CORRETO
        // =================================

        primeiraCarta.encontrada = true;

        segundaCarta.encontrada = true;


        marcarCartaEncontradaVisual(
            primeiraCarta
        );


        marcarCartaEncontradaVisual(
            segundaCarta
        );


        paresEncontrados++;


        atualizarProgressoVisual();


        /*
        Limpamos as cartas escolhidas
        para permitir a próxima jogada.
        */
        limparSelecaoPar();


        verificarVitoria();
    }

    else {

        // =================================
        // PAR ERRADO
        // =================================

        /*
        Mantemos as duas cartas abertas
        durante 1000ms.

        Durante esse tempo,
        o tabuleiro permanece bloqueado.
        */

        timeoutComparacaoAtivo =
            setTimeout(() => {

                /*
                Esta verificação evita que
                um timeout antigo altere
                uma partida que já mudou
                de estado.
                */
                if (
                    estadoJogo ===
                    "COMPARANDO"
                ) {

                    virarCartaVisual(
                        primeiraCarta,
                        false
                    );


                    virarCartaVisual(
                        segundaCarta,
                        false
                    );


                    limparSelecaoPar();
                }


                timeoutComparacaoAtivo =
                    null;

            }, CONFIG_JOGO.tempoEsperaErroMs);
    }
}


function marcarCartaEncontradaVisual(carta) {

    const botao =
        DOM.memoryBoard.querySelector(
            `[data-card-id="${carta.cardId}"]`
        );


    if (!botao) {
        return;
    }


    botao.classList.add("encontrada");


    botao.setAttribute(
        "aria-label",
        `${carta.nome}, par encontrado`
    );
}


function limparSelecaoPar() {

    primeiraCarta = null;

    segundaCarta = null;


    /*
    Se ainda não vencemos,
    o tabuleiro volta ao estado normal.
    */
    if (
        estadoJogo !== "VITORIA"
    ) {

        estadoJogo = "JOGANDO";

        tabuleiroBloqueado = false;
    }
}


// ========================================
// 9. PROGRESSO
// ========================================

function atualizarProgressoVisual() {

    DOM.progressText.textContent =
        `${paresEncontrados} / ${CONFIG_JOGO.totalPares}`;


    const shells =
        DOM.shellContainer.children;


    /*
    paresEncontrados começa em 1.

    Arrays/HTMLCollection começam em 0.

    Por isso usamos:
    paresEncontrados - 1
    */

    const indice =
        paresEncontrados - 1;


    if (shells[indice]) {

        shells[indice]
            .classList
            .add("active");
    }
}


// ========================================
// 10. REINICIAR
// ========================================

function reiniciarJogo() {

    /*
    PRIMEIRO:

    cancela qualquer comparação antiga
    que ainda esteja esperando os 1000ms.
    */

    if (timeoutComparacaoAtivo) {

        clearTimeout(
            timeoutComparacaoAtivo
        );


        timeoutComparacaoAtivo = null;
    }


    /*
    Também cancela qualquer tela
    de vitória que esteja esperando
    os 400ms para aparecer.

    Esta é a correção importante.
    */

    if (timeoutVitoriaAtivo) {

        clearTimeout(
            timeoutVitoriaAtivo
        );


        timeoutVitoriaAtivo = null;
    }


    // ------------------------------
    // Reseta estado
    // ------------------------------

    primeiraCarta = null;

    segundaCarta = null;

    tabuleiroBloqueado = true;

    paresEncontrados = 0;


    // Esconde vitória
    DOM.victoryScreen
        .classList
        .add("hidden");


    // ------------------------------
    // Cria nova partida
    // ------------------------------

    criarBaralho();

    inicializarConchasVisual();

    renderizarTabuleiro();


    DOM.progressText.textContent =
        `0 / ${CONFIG_JOGO.totalPares}`;


    estadoJogo = "JOGANDO";

    tabuleiroBloqueado = false;
}


// ========================================
// 11. ANIMAÇÕES E FEEDBACK
// ========================================

function iniciarJogoApp() {

    DOM.startScreen
        .classList
        .add("hidden");


    DOM.victoryScreen
        .classList
        .add("hidden");


    DOM.gameScreen
        .classList
        .remove("hidden");


    reiniciarJogo();
}


// ========================================
// 12. VITÓRIA
// ========================================

function verificarVitoria() {

    if (
        paresEncontrados >=
        CONFIG_JOGO.totalPares
    ) {

        estadoJogo = "VITORIA";

        tabuleiroBloqueado = true;


        /*
        A vitória espera 400ms.

        Assim dá tempo do último par
        aparecer antes do modal.
        */

        timeoutVitoriaAtivo =
            setTimeout(() => {

                /*
                Só mostra a vitória
                se o jogo ainda estiver
                realmente em VITORIA.
                */

                if (
                    estadoJogo ===
                    "VITORIA"
                ) {

                    DOM.victoryScreen
                        .classList
                        .remove("hidden");
                }


                timeoutVitoriaAtivo =
                    null;

            }, 400);
    }
}


// ========================================
// 13. EVENTOS
// ========================================

function configurarEventosGerais() {

    DOM.btnStart.addEventListener(
        "click",
        iniciarJogoApp
    );


    DOM.btnReset.addEventListener(
        "click",
        reiniciarJogo
    );


    /*
    Um único listener cuida
    das 18 cartas.

    As cartas podem ser recriadas
    quantas vezes quisermos.
    */

    DOM.memoryBoard.addEventListener(
        "click",
        lidarComCliqueCarta
    );
}


// ========================================
// 14. INTEGRAÇÃO FUTURA
// ========================================

function onMinigameConcluido() {

    window.parent.postMessage({
        type: "frutaviva:minigame-concluido",
        detail: {
            fruta: "kiwi"
        }
    }, "*");

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
// INICIALIZAÇÃO GERAL
// ========================================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        configurarEventosGerais();

        configurarIntegracaoQuiz();
    }
);
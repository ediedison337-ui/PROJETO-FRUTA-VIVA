// ==========================================
// FRUTA VIVA - AVENTURAS PELO MUNDO
// JavaScript reorganizado e limpo
// ==========================================


// ==========================================
// 1. VÍDEOS DA AVENTURA
// ==========================================

const videos = {
    inicial: 'videos/video-inicial.mp4',
    meio: 'videos/video-meio.mp4',
    bonus: 'videos/video-bonus.mp4',
    final: 'videos/video-final.mp4'
};

let videoInicialJaTocou = false;
let videoMeioJaTocou = false;
let videoBonusJaTocou = false;

const videoContainer = document.getElementById('video-container');
const videoAventura = document.getElementById('video-aventura');


function tocarVideo(tipo, quandoTerminar) {

    // Se não existir vídeo na tela, continua o jogo normalmente
    if (!videoContainer || !videoAventura || !videos[tipo]) {
        if (quandoTerminar) {
            quandoTerminar();
        }
        return;
    }

    videoAventura.src = videos[tipo];
    videoContainer.classList.remove('hidden');
    videoAventura.currentTime = 0;

    const finalizarVideo = () => {

        videoContainer.classList.add('hidden');
        videoAventura.onended = null;

        if (quandoTerminar) {
            quandoTerminar();
        }

    };

    videoAventura.onended = finalizarVideo;

    const tentativaPlay = videoAventura.play();

    if (tentativaPlay && typeof tentativaPlay.catch === 'function') {

        tentativaPlay.catch(() => {

            console.warn(`Não foi possível reproduzir o vídeo: ${tipo}`);

            finalizarVideo();

        });

    }

}


// ==========================================
// 2. DESTINOS, FRUTAS E QUIZZES
// ==========================================

const destinos = [

    // ======================================
    // BÔNUS
    // ======================================

    {
        id: 'abacaxi',
        fruta: 'Abacaxi 🍍',
        nome: 'Destino Surpresa ⭐',
        tipo: 'bonus',
        x: 50,
        y: 50,

        perguntas: [

            {
                pergunta: 'Qual destas frutas tem uma coroa de folhas no topo?',
                alternativas: [
                    'Abacaxi',
                    'Uva',
                    'Maçã'
                ],
                correta: 0
            },

            {
                pergunta: 'Como é normalmente a polpa do abacaxi?',
                alternativas: [
                    'Amarela',
                    'Roxa',
                    'Azul'
                ],
                correta: 0
            },

            {
                pergunta: 'Qual destas características combina com o abacaxi?',
                alternativas: [
                    'Casca áspera',
                    'Casca peluda',
                    'Cresce em cachos'
                ],
                correta: 0
            }

        ]
    },


    // ======================================
    // OCEANIA
    // ======================================

    {
        id: 'kiwi',
        fruta: 'Kiwi 🥝',
        nome: 'Oceania 🌏',
        tipo: 'normal',
        x: 85,
        y: 67,

        perguntas: [

            {
                pergunta: 'Qual destas frutas geralmente tem casca marrom e polpa verde?',
                alternativas: [
                    'Kiwi',
                    'Manga',
                    'Uva'
                ],
                correta: 0
            },

            {
                pergunta: 'O que encontramos no centro da polpa do kiwi?',
                alternativas: [
                    'Pequenas sementes pretas',
                    'Um caroço grande',
                    'Nenhuma semente'
                ],
                correta: 0
            },

            {
                pergunta: 'Qual destas características é comum na casca do kiwi?',
                alternativas: [
                    'Possui pequenos pelos',
                    'É cheia de espinhos',
                    'É totalmente lisa e roxa'
                ],
                correta: 0
            }

        ]
    },


    // ======================================
    // AMÉRICA DO NORTE
    // ======================================

    {
        id: 'maca',
        fruta: 'Maçã 🍎',
        nome: 'América do Norte 🌎',
        tipo: 'normal',
        x: 20,
        y: 25,

        perguntas: [

            {
                pergunta: 'Qual destas cores uma maçã pode ter?',
                alternativas: [
                    'Somente azul',
                    'Vermelha, verde ou amarela',
                    'Somente roxa'
                ],
                correta: 1
            },

            {
                pergunta: 'Onde ficam as sementes da maçã?',
                alternativas: [
                    'No miolo da fruta',
                    'Na casca',
                    'Nas folhas'
                ],
                correta: 0
            },

            {
                pergunta: 'A maçã cresce normalmente em qual planta?',
                alternativas: [
                    'Em uma palmeira',
                    'Em uma videira',
                    'Em uma macieira'
                ],
                correta: 2
            }

        ]
    },


    // ======================================
    // AMÉRICA DO SUL
    // ======================================

    {
        id: 'maracuja',
        fruta: 'Maracujá 💛',
        nome: 'América do Sul 🌎',
        tipo: 'normal',
        x: 30,
        y: 60,

        perguntas: [

            {
                pergunta: 'O que encontramos dentro do maracujá?',
                alternativas: [
                    'Um caroço gigante',
                    'Polpa com várias sementes',
                    'Somente água'
                ],
                correta: 1
            },

            {
                pergunta: 'Qual bebida é muito preparada com maracujá?',
                alternativas: [
                    'Suco',
                    'Café',
                    'Leite puro'
                ],
                correta: 0
            },

            {
                pergunta: 'Como costuma ser o sabor do maracujá?',
                alternativas: [
                    'Salgado',
                    'Picante',
                    'Ácido e marcante'
                ],
                correta: 2
            }

        ]
    },


    // ======================================
    // ÁSIA
    // ======================================

    {
        id: 'manga',
        fruta: 'Manga 🥭',
        nome: 'Ásia 🌏',
        tipo: 'normal',
        x: 73,
        y: 30,

        perguntas: [

            {
                pergunta: 'O que encontramos no centro da manga?',
                alternativas: [
                    'Várias sementinhas',
                    'Um caroço grande',
                    'Uma parte oca'
                ],
                correta: 1
            },

            {
                pergunta: 'Em qual planta a manga cresce?',
                alternativas: [
                    'Mangueira',
                    'Videira',
                    'Macieira'
                ],
                correta: 0
            },

            {
                pergunta: 'Qual destas frutas costuma ter uma polpa doce e suculenta?',
                alternativas: [
                    'Limão',
                    'Manga',
                    'Alho'
                ],
                correta: 1
            }

        ]
    },


    // ======================================
    // ÁFRICA
    // ======================================

    {
        id: 'melancia',
        fruta: 'Melancia 🍉',
        nome: 'África 🌍',
        tipo: 'normal',
        x: 55,
        y: 52,

        perguntas: [

            {
                pergunta: 'Qual característica é muito conhecida na melancia?',
                alternativas: [
                    'Possui bastante água',
                    'É completamente seca',
                    'Tem casca com pelos'
                ],
                correta: 0
            },

            {
                pergunta: 'Qual é uma cor comum da polpa da melancia?',
                alternativas: [
                    'Azul',
                    'Vermelha',
                    'Cinza'
                ],
                correta: 1
            },

            {
                pergunta: 'A melancia costuma ser uma fruta de qual tamanho?',
                alternativas: [
                    'Muito pequena como uma uva',
                    'Do tamanho de um grão de arroz',
                    'Grande em comparação com muitas frutas'
                ],
                correta: 2
            }

        ]
    },


    // ======================================
    // EUROPA
    // ======================================

    {
        id: 'uva',
        fruta: 'Uva 🍇',
        nome: 'Europa 🌍',
        tipo: 'normal',
        x: 55,
        y: 25,

        perguntas: [

            {
                pergunta: 'Qual destas frutas cresce normalmente em cachos?',
                alternativas: [
                    'Uva',
                    'Melancia',
                    'Manga'
                ],
                correta: 0
            },

            {
                pergunta: 'Quais cores as uvas podem ter?',
                alternativas: [
                    'Somente azul',
                    'Verdes, vermelhas, roxas ou quase pretas',
                    'Somente laranja'
                ],
                correta: 1
            },

            {
                pergunta: 'A uva pode ser usada para fazer qual destes alimentos?',
                alternativas: [
                    'Geleia',
                    'Arroz',
                    'Feijão'
                ],
                correta: 0
            }

        ]
    }

];


// ==========================================
// 3. ROTAS DOS MINIGAMES
// ==========================================

const rotasJogos = {

    maracuja: '../jogos/america-do-sul/index.html',

    maca: '../jogos/america-do-norte/index.html',

    manga: '../jogos/asia/index.html',

    uva: '../jogos/europa/index.html',

    melancia: '../jogos/africa/index.html',

    kiwi: '../jogos/oceania/index.html',

    abacaxi: '../jogos/bonus/index.html'

};


// ==========================================
// 4. ESTADO DO JOGO
// ==========================================

function lerVisitadosSalvos() {

    try {

        const salvos = JSON.parse(
            localStorage.getItem('fv_visitados')
        );

        return Array.isArray(salvos)
            ? salvos
            : [];

    } catch (erro) {

        console.warn(
            'Não foi possível ler os destinos visitados.',
            erro
        );

        return [];

    }

}


let estadoJogo = {

    estrelas:
        Number.parseInt(
            localStorage.getItem('fv_estrelas'),
            10
        ) || 0,

    visitados:
        lerVisitadosSalvos(),

    destinoAtual:
        null

};


// Remove algum ID antigo que tenha ficado salvo

const idsValidos =
    destinos.map(destino => destino.id);


estadoJogo.visitados =
    estadoJogo.visitados.filter(id =>
        idsValidos.includes(id)
    );


let viagemEmAndamento = false;

let respondendoQuiz = false;


// ==========================================
// 5. ELEMENTOS DO HTML
// ==========================================

const screens = {

    map:
        document.getElementById('map-screen'),

    minigame:
        document.getElementById('minigame-screen'),

    quiz:
        document.getElementById('quiz-screen'),

    completed:
        document.getElementById('completed-screen')

};


const spanEstrelas =
    document.getElementById('star-count');


const avatarJogador =
    document.getElementById('avatar-jogador');


const nomeJogador =
    document.getElementById('nome-jogador');


const mapBoard =
    document.getElementById('map-board');


const planeElement =
    document.getElementById('plane');


const btnStartAdventure =
    document.getElementById('btn-start-adventure');


const btnFinishMinigame =
    document.getElementById('btn-finish-minigame');


const destinationTitle =
    document.getElementById('destination-title');


const gameFrameWrapper =
    document.getElementById('game-frame-wrapper');


const gameFrame =
    document.getElementById('game-frame');


const quizQuestion =
    document.getElementById('quiz-question');


const quizOptions =
    document.getElementById('quiz-options');


const btnRestartCampaign =
    document.getElementById('btn-restart-campaign');


// ==========================================
// 6. PERFIL DO JOGADOR
// ==========================================

function carregarPerfilJogador() {

    const dadosSalvos =
        localStorage.getItem('frutaVivaPerfil');


    if (!dadosSalvos) {

        console.log(
            'Nenhum perfil do jogador encontrado.'
        );

        return;

    }


    try {

        const perfil =
            JSON.parse(dadosSalvos);


        if (
            nomeJogador &&
            perfil.nome
        ) {

            nomeJogador.textContent =
                perfil.nome;

        }


        if (
            avatarJogador &&
            perfil.avatar
        ) {

            avatarJogador.src =
                `../tela-avatar/images/${perfil.avatar}`;

        }


    } catch (erro) {

        console.error(
            'Erro ao carregar o perfil do jogador:',
            erro
        );

    }

}


// ==========================================
// 7. FUNÇÕES GERAIS
// ==========================================

function salvarProgresso() {

    localStorage.setItem(
        'fv_estrelas',
        String(estadoJogo.estrelas)
    );


    localStorage.setItem(
        'fv_visitados',
        JSON.stringify(
            estadoJogo.visitados
        )
    );

}


function mudarTela(nomeTela) {

    Object.values(screens)
        .forEach(screen => {

            if (screen) {

                screen.classList.remove(
                    'active'
                );

            }

        });


    const telaDestino =
        screens[nomeTela];


    if (!telaDestino) {

        console.error(
            `Tela não encontrada: ${nomeTela}`
        );

        return;

    }


    telaDestino.classList.add(
        'active'
    );

}


function atualizarInterface() {

    if (spanEstrelas) {

        spanEstrelas.textContent =
            estadoJogo.estrelas;

    }


    if (planeElement) {

        planeElement.textContent =
            '✈️';

    }


    renderizarMapaPins();

}


// ==========================================
// 8. MAPA E PINS
// ==========================================

function contarContinentesConcluidos() {

    return destinos.filter(destino =>

        destino.tipo === 'normal' &&

        estadoJogo.visitados.includes(
            destino.id
        )

    ).length;

}


function renderizarMapaPins() {

    if (!mapBoard) {

        console.warn(
            'Elemento #map-board não encontrado.'
        );

        return;

    }


    mapBoard
        .querySelectorAll('.map-pin')
        .forEach(pin =>
            pin.remove()
        );


    const continentesConcluidos =
        contarContinentesConcluidos();


    destinos.forEach(destino => {


        // O bônus só aparece depois de concluir
        // os 6 continentes normais

        if (
            destino.tipo === 'bonus' &&
            continentesConcluidos < 6
        ) {

            return;

        }


        const pin =
            document.createElement('div');


        pin.classList.add(
            'map-pin'
        );


        if (
            estadoJogo.visitados.includes(
                destino.id
            )
        ) {

            pin.classList.add(
                'visited'
            );

            pin.textContent =
                '✅';

        } else {

            pin.textContent =
                '📍';

        }


        pin.style.left =
            `${destino.x}%`;


        pin.style.top =
            `${destino.y}%`;


        pin.dataset.destino =
            destino.id;


        mapBoard.appendChild(
            pin
        );

    });

}


// ==========================================
// 9. ESCOLHA DO PRÓXIMO DESTINO
// ==========================================

function obterDestinosNormaisPendentes() {

    return destinos.filter(destino =>

        destino.tipo === 'normal' &&

        !estadoJogo.visitados.includes(
            destino.id
        )

    );

}


function obterDestinosDisponiveis() {

    const normaisPendentes =
        obterDestinosNormaisPendentes();


    if (
        normaisPendentes.length > 0
    ) {

        return normaisPendentes;

    }


    return destinos.filter(destino =>

        destino.tipo === 'bonus' &&

        !estadoJogo.visitados.includes(
            destino.id
        )

    );

}


function descobrirOrigemDoAviao() {

    if (
        estadoJogo.visitados.length === 0
    ) {

        // Brasil - início da aventura

        return {
            x: 30,
            y: 65
        };

    }


    const ultimoVisitado =
        estadoJogo.visitados[
        estadoJogo.visitados.length - 1
        ];


    const destinoAnterior =
        destinos.find(destino =>
            destino.id === ultimoVisitado
        );


    return destinoAnterior || {

        x: 30,
        y: 65

    };

}


// ==========================================
// 10. ABRIR MINIGAME
// ==========================================

function abrirMinigame(destino) {

    if (destinationTitle) {

        destinationTitle.textContent =
            `Destino: ${destino.nome} | Fruta: ${destino.fruta}`;

    }


    mudarTela('minigame');


    const genericBox =
        document.getElementById(
            'generic-minigame-box'
        );


    const rotaJogo =
        rotasJogos[destino.id];


    if (
        rotaJogo &&
        gameFrame &&
        gameFrameWrapper
    ) {

        if (genericBox) {

            genericBox.classList.add(
                'hidden'
            );

        }


        gameFrame.src =
            rotaJogo;


        gameFrameWrapper
            .classList
            .remove('hidden');


        return;

    }


    // Se algum jogo ainda não estiver ligado

    if (gameFrame) {

        gameFrame.src = '';

    }


    if (gameFrameWrapper) {

        gameFrameWrapper
            .classList
            .add('hidden');

    }


    if (genericBox) {

        genericBox
            .classList
            .remove('hidden');

    }

}


// ==========================================
// 11. INICIAR PRÓXIMA VIAGEM
// ==========================================

function iniciarProximaAventura() {

    if (viagemEmAndamento) {

        return;

    }


    // ======================================
    // VÍDEO INICIAL
    // ======================================

    if (!videoInicialJaTocou) {

        videoInicialJaTocou = true;


        tocarVideo(
            'inicial',
            iniciarProximaAventura
        );


        return;

    }


    // ======================================
    // VÍDEO DO MEIO
    // ======================================

    if (
        estadoJogo.visitados.length === 3 &&
        !videoMeioJaTocou
    ) {

        videoMeioJaTocou = true;


        tocarVideo(
            'meio',
            iniciarProximaAventura
        );


        return;

    }


    const normaisPendentes =
        obterDestinosNormaisPendentes();


    // ======================================
    // VÍDEO ANTES DA FASE BÔNUS
    // ======================================

    if (

        normaisPendentes.length === 0 &&

        !estadoJogo.visitados.includes(
            'abacaxi'
        ) &&

        !videoBonusJaTocou

    ) {

        videoBonusJaTocou = true;


        tocarVideo(
            'bonus',
            iniciarProximaAventura
        );


        return;

    }


    const naoVisitados =
        obterDestinosDisponiveis();


    // ======================================
    // TODAS AS FASES FINALIZADAS
    // ======================================

    if (
        naoVisitados.length === 0
    ) {

        mudarTela(
            'completed'
        );

        return;

    }


    // ======================================
    // SORTEIA UMA FASE NÃO VISITADA
    // ======================================

    const indiceSorteado =
        Math.floor(
            Math.random() *
            naoVisitados.length
        );


    const destinoSorteado =
        naoVisitados[
        indiceSorteado
        ];


    estadoJogo.destinoAtual =
        destinoSorteado;


    viagemEmAndamento =
        true;


    const origem =
        descobrirOrigemDoAviao();


    // Se o avião não existir,
    // simplesmente abre a fase

    if (!planeElement) {

        viagemEmAndamento =
            false;


        abrirMinigame(
            destinoSorteado
        );


        return;

    }


    // ======================================
    // POSIÇÃO INICIAL DO AVIÃO
    // ======================================

    planeElement.style.left =
        `${origem.x}%`;


    planeElement.style.top =
        `${origem.y}%`;


    planeElement.classList.remove(
        'hidden'
    );


    // ======================================
    // MOVIMENTO ATÉ O DESTINO
    // ======================================

    setTimeout(() => {

        planeElement.style.left =
            `${destinoSorteado.x}%`;


        planeElement.style.top =
            `${destinoSorteado.y}%`;

    }, 100);


    // ======================================
    // ABRE O JOGO DEPOIS DO VOO
    // ======================================

    setTimeout(() => {

        planeElement.classList.add(
            'hidden'
        );


        viagemEmAndamento =
            false;


        abrirMinigame(
            destinoSorteado
        );

    }, 1600);

}
// ==========================================
// CONTROLE DAS PERGUNTAS SORTEADAS
// ==========================================

const perguntasUsadasPorDestino = {};

function sortearPergunta(destino) {

    const listaPerguntas =
        Array.isArray(destino.perguntas) &&
            destino.perguntas.length > 0
            ? destino.perguntas
            : [destino];


    // Cria a lista desse destino
    if (!perguntasUsadasPorDestino[destino.id]) {
        perguntasUsadasPorDestino[destino.id] = [];
    }


    // Se já usou todas, libera todas novamente
    if (
        perguntasUsadasPorDestino[destino.id].length >=
        listaPerguntas.length
    ) {
        perguntasUsadasPorDestino[destino.id] = [];
    }


    // Descobre quais ainda não foram usadas
    const indicesDisponiveis =
        listaPerguntas
            .map((_, indice) => indice)
            .filter(indice =>
                !perguntasUsadasPorDestino[destino.id]
                    .includes(indice)
            );


    // Sorteia entre as que ainda não apareceram
    const indiceSorteado =
        indicesDisponiveis[
        Math.floor(
            Math.random() *
            indicesDisponiveis.length
        )
        ];


    perguntasUsadasPorDestino[destino.id]
        .push(indiceSorteado);


    return listaPerguntas[indiceSorteado];
}


// ==========================================
// 12. QUIZ
// ==========================================

function carregarQuiz() {

    const destino =
        estadoJogo.destinoAtual;


    if (!destino) {

        console.error(
            'Não existe destino atual para carregar o quiz.'
        );


        mudarTela(
            'map'
        );


        return;

    }


    if (
        !quizQuestion ||
        !quizOptions
    ) {

        console.error(
            'Elementos do quiz não encontrados.'
        );


        return;

    }


    const perguntaAtual =
        sortearPergunta(destino);


    if (

        !perguntaAtual ||

        !Array.isArray(
            perguntaAtual.alternativas
        ) ||

        typeof perguntaAtual.correta !==
        'number'

    ) {

        console.error(
            'Pergunta inválida:',
            destino.id
        );


        return;

    }


    respondendoQuiz =
        false;


    quizQuestion.textContent =
        perguntaAtual.pergunta;


    quizOptions.innerHTML =
        '';


    perguntaAtual.alternativas
        .forEach(
            (alternativa, index) => {


                const botao =
                    document.createElement(
                        'button'
                    );


                botao.classList.add(
                    'quiz-btn'
                );


                botao.textContent =
                    alternativa;


                botao.addEventListener(
                    'click',
                    () => {

                        verificarResposta(
                            index,
                            perguntaAtual.correta
                        );

                    }
                );


                quizOptions.appendChild(
                    botao
                );

            }
        );

}


// ==========================================
// 13. VERIFICAR RESPOSTA DO QUIZ
// ==========================================

function verificarResposta(
    indiceEscolhido,
    indiceCorreto
) {

    if (respondendoQuiz) {

        return;

    }


    // ======================================
    // RESPOSTA ERRADA
    // ======================================

    if (
        indiceEscolhido !==
        indiceCorreto
    ) {

        mostrarModalRecompensa(
            'Quase lá! 😊',
            'Resposta errada! Tente novamente na próxima.'
        );


        return;

    }


    respondendoQuiz =
        true;


    const destino =
        estadoJogo.destinoAtual;


    if (!destino) {

        respondendoQuiz =
            false;


        console.error(
            'Destino atual não encontrado.'
        );


        mudarTela(
            'map'
        );


        return;

    }


    // ======================================
    // VERIFICA SE A FASE JÁ FOI FEITA
    // ======================================

    const jaFoiConcluido =

        estadoJogo.visitados.includes(
            destino.id
        );


    // ======================================
    // GANHA A ESTRELA
    // ======================================

    if (!jaFoiConcluido) {

        estadoJogo.estrelas +=
            1;


        estadoJogo.visitados.push(
            destino.id
        );

    }


    // ======================================
    // SALVA
    // ======================================

    salvarProgresso();


    // ======================================
    // ATUALIZA TELA
    // ======================================

    atualizarInterface();


    // ======================================
    // ALERTA
    // ======================================

    if (!jaFoiConcluido) {

        mostrarModalRecompensa(
            'Parabéns! ⭐',
            'Resposta correta! Você ganhou +1 estrela!'
        );
    } else {

        alert(
            '🎉 Resposta correta!'
        );

    }


    // ======================================
    // FASE BÔNUS
    // ======================================

    if (
        destino.tipo === 'bonus'
    ) {

        tocarVideo(
            'final',
            () => {

                mudarTela(
                    'completed'
                );

            }
        );


        return;

    }


    // ======================================
    // FASE NORMAL
    // VOLTA AO MAPA
    // ======================================

    estadoJogo.destinoAtual =
        null;


    mudarTela(
        'map'
    );

}


// ==========================================
// 14. CONCLUSÃO DO MINIGAME
// ==========================================

function concluirMinigameAtual() {

    if (
        !estadoJogo.destinoAtual
    ) {

        console.warn(
            'Nenhum destino atual para abrir o quiz.'
        );


        mudarTela(
            'map'
        );


        return;

    }


    if (gameFrame) {

        gameFrame.src =
            '';

    }


    if (gameFrameWrapper) {

        gameFrameWrapper
            .classList
            .add('hidden');

    }


    carregarQuiz();


    mudarTela(
        'quiz'
    );

}


// ==========================================
// 15. EVENTOS
// ==========================================


// Botão iniciar próxima viagem

if (btnStartAdventure) {

    btnStartAdventure.addEventListener(

        'click',

        iniciarProximaAventura

    );

}


// Botão de teste / fallback

if (btnFinishMinigame) {

    btnFinishMinigame.addEventListener(

        'click',

        concluirMinigameAtual

    );

}


// ==========================================
// RECEBE MENSAGEM DO MINIGAME
// ==========================================

window.addEventListener(
    'message',
    event => {


        const mensagem =
            event.data;


        if (

            !mensagem ||

            mensagem.type !==
            'frutaviva:minigame-concluido'

        ) {

            return;

        }


        if (
            !estadoJogo.destinoAtual
        ) {

            console.warn(
                'Mensagem recebida, mas não existe destino atual.'
            );


            return;

        }


        const frutaConcluida =
            mensagem.detail?.fruta;


        // Garante que o jogo terminado
        // é o mesmo destino sorteado

        if (

            frutaConcluida !==
            estadoJogo.destinoAtual.id

        ) {

            console.warn(

                'Minigame não corresponde ao destino atual:',

                frutaConcluida,

                estadoJogo.destinoAtual.id

            );


            return;

        }


        concluirMinigameAtual();

    }
);
// ==========================================
// MODAL DE RECOMPENSA
// ==========================================

const modalRecompensa = document.getElementById('modal-recompensa');
const modalRecompensaTitulo = document.getElementById('modal-recompensa-titulo');
const modalRecompensaTexto = document.getElementById('modal-recompensa-texto');
const btnFecharRecompensa = document.getElementById('btn-fechar-recompensa');

function mostrarModalRecompensa(titulo, texto) {
    modalRecompensaTitulo.textContent = titulo;
    modalRecompensaTexto.textContent = texto;
    modalRecompensa.classList.remove('hidden');
}

function fecharModalRecompensa() {
    modalRecompensa.classList.add('hidden');
}

if (btnFecharRecompensa) {
    btnFecharRecompensa.addEventListener('click', fecharModalRecompensa);
}

if (modalRecompensa) {
    modalRecompensa.addEventListener('click', (e) => {
        if (e.target === modalRecompensa) {
            fecharModalRecompensa();
        }
    });
}

// ==========================================
// 16. REINICIAR CAMPANHA
// ==========================================

if (btnRestartCampaign) {

    btnRestartCampaign.addEventListener(
        'click',
        () => {


            estadoJogo.visitados =
                [];


            estadoJogo.destinoAtual =
                null;


            // As estrelas continuam acumuladas
            // por enquanto.


            videoInicialJaTocou =
                false;


            videoMeioJaTocou =
                false;


            videoBonusJaTocou =
                false;


            viagemEmAndamento =
                false;


            respondendoQuiz =
                false;


            if (gameFrame) {

                gameFrame.src =
                    '';

            }


            if (gameFrameWrapper) {

                gameFrameWrapper
                    .classList
                    .add('hidden');

            }


            if (planeElement) {

                planeElement
                    .classList
                    .add('hidden');

            }


            salvarProgresso();


            atualizarInterface();


            mudarTela(
                'map'
            );

        }
    );

}


// ==========================================
// 17. INICIALIZAÇÃO DO JOGO
// ==========================================

window.addEventListener(
    'DOMContentLoaded',
    () => {


        carregarPerfilJogador();


        atualizarInterface();


        mudarTela(
            'map'
        );

    }
);
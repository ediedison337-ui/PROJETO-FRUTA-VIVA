let canvas;
let ctx;

let suikaFruits = [];
let nextFruitType = 0;
let suikaScore = 0;

const suikaMeta = 300;

let suikaTerminou = false;
let suikaAnimationId = null;

let podeSoltarFruta = true;
let jogadas = 0;

const intervaloEntreJogadas = 400;

let tempoRestante = 45;
let timerJogo = null;

let formouMelancia = false;
let maiorTipoFormado = 0;

// ==========================================
// FRUTAS DO JOGO
// ==========================================

const fruitTypes = [
    { radius: 14, emoji: '🍓', points: 10 },   // Morango
    { radius: 19, emoji: '🍊', points: 20 },   // Laranja
    { radius: 24, emoji: '🥝', points: 35 },   // Kiwi
    { radius: 29, emoji: '🍋', points: 50 },   // Limão
    { radius: 36, emoji: '🍎', points: 80 },   // Maçã
    { radius: 46, emoji: '🍉', points: 150 }   // Melancia
];


// ==========================================
// INICIAR JOGO
// ==========================================

function iniciarMinigameAmericaDoSul() {

    canvas = document.getElementById('suikaCanvas');

    if (!canvas) {
        console.error('Canvas #suikaCanvas não encontrado.');
        return;
    }

    ctx = canvas.getContext('2d');

    suikaFruits = [];
    suikaScore = 0;
    suikaTerminou = false;

    jogadas = 0;
    podeSoltarFruta = true;

    tempoRestante = 45;
    formouMelancia = false;
    maiorTipoFormado = 0;
    clearInterval(timerJogo);

    const metaVal = document.getElementById('meta-val');
    const victoryBox = document.getElementById('victory-box');

    if (metaVal) {
        metaVal.textContent = '🍉';
    }

    if (victoryBox) {
        victoryBox.classList.add('hidden');
    }

    atualizarPontuacaoSuika();
    atualizarTempo();
    sortearProximaFruta();

    if (suikaAnimationId) {
        cancelAnimationFrame(suikaAnimationId);
    }

    canvas.onpointerdown = (e) => {

        e.preventDefault();

        if (
            suikaTerminou ||
            !podeSoltarFruta
        ) {
            return;
        }

        podeSoltarFruta = false;

        const rect = canvas.getBoundingClientRect();
        const escalaX = canvas.width / rect.width;

        const x =
            (e.clientX - rect.left) *
            escalaX;

        soltarFruta(x);

        jogadas++;


        // A CADA 10 JOGADAS CAI UMA PERA
        if (jogadas % 10 === 0) {

            setTimeout(() => {

                if (!suikaTerminou) {
                    soltarFrutaIntrusa();
                }

            }, 250);

        }


        setTimeout(() => {

            podeSoltarFruta = true;

        }, intervaloEntreJogadas);

    };


    timerJogo = setInterval(() => {

        if (suikaTerminou) {
            clearInterval(timerJogo);
            return;
        }

        tempoRestante--;

        atualizarTempo();

        if (tempoRestante <= 0) {

            clearInterval(timerJogo);

            if (!formouMelancia) {

                suikaTerminou = true;

                setTimeout(() => {

                    alert(
                        '⏰ O tempo acabou! Tente novamente.'
                    );

                    iniciarMinigameAmericaDoSul();

                }, 400);

            }

        }

    }, 1000);


    suikaAnimationId =
        requestAnimationFrame(loopSuika);
}


// ==========================================
// PRÓXIMA FRUTA
// ==========================================

function sortearProximaFruta() {

    nextFruitType =
        Math.floor(Math.random() * 2);

    const nextIcon =
        document.getElementById(
            'next-fruit-icon'
        );

    if (nextIcon) {

        nextIcon.textContent =
            fruitTypes[nextFruitType].emoji;

    }

}


// ==========================================
// SOLTAR FRUTA NORMAL
// ==========================================

function soltarFruta(x) {

    if (suikaTerminou) return;

    const tipo =
        nextFruitType;

    const raio =
        fruitTypes[tipo].radius;

    x = Math.max(
        raio,
        Math.min(
            canvas.width - raio,
            x
        )
    );

    suikaFruits.push({

        x: x,
        y: raio + 5,
        vy: 0,

        type: tipo,
        radius: raio,

        merged: false,
        obstaculo: false,

        emoji:
            fruitTypes[tipo].emoji

    });

    sortearProximaFruta();

}


// ==========================================
// FRUTA INTRUSA
// ==========================================

function soltarFrutaIntrusa() {

    if (suikaTerminou) return;

    const raio = 25;

    const x =
        raio +
        Math.random() *
        (canvas.width - raio * 2);

    suikaFruits.push({

        x: x,
        y: raio + 5,
        vy: 0,

        type: null,
        radius: raio,

        merged: false,
        obstaculo: true,

        emoji: '🍐'

    });

}


// ==========================================
// LOOP / FÍSICA
// ==========================================

function loopSuika() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    for (
        let i = 0;
        i < suikaFruits.length;
        i++
    ) {

        const fruta =
            suikaFruits[i];


        fruta.vy += 0.22;
        fruta.y += fruta.vy;


        if (
            fruta.y + fruta.radius >
            canvas.height
        ) {

            fruta.y =
                canvas.height -
                fruta.radius;

            fruta.vy = 0;

        }


        for (
            let j = i + 1;
            j < suikaFruits.length;
            j++
        ) {

            const outra =
                suikaFruits[j];

            const dx =
                outra.x - fruta.x;

            const dy =
                outra.y - fruta.y;

            const distancia =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            const distanciaMinima =
                fruta.radius +
                outra.radius;


            if (
                distancia <
                distanciaMinima
            ) {

                if (
                    !fruta.obstaculo &&
                    !outra.obstaculo &&
                    fruta.type === outra.type &&
                    fruta.type < fruitTypes.length - 1 &&
                    !fruta.merged &&
                    !outra.merged
                ) {

                    fruta.merged = true;
                    outra.merged = true;

                    const novoTipo =
                        fruta.type + 1;
                    if (novoTipo > maiorTipoFormado) {
                        maiorTipoFormado = novoTipo;
                    }

                    atualizarBarraEvolucao();

                    if (
                        novoTipo ===
                        fruitTypes.length - 1
                    ) {

                        formouMelancia = true;

                    }


                    suikaFruits.push({

                        x:
                            (fruta.x + outra.x) / 2,

                        y:
                            (fruta.y + outra.y) / 2,

                        vy: -2.5,

                        type: novoTipo,

                        radius:
                            fruitTypes[novoTipo]
                                .radius,

                        merged: false,

                        obstaculo: false,

                        emoji:
                            fruitTypes[novoTipo]
                                .emoji

                    });


                    suikaScore +=
                        fruitTypes[novoTipo]
                            .points;

                    atualizarPontuacaoSuika();

                    verificarVitoriaSuika();

                }

                else {

                    const angulo =
                        Math.atan2(
                            dy,
                            dx
                        );

                    const sobreposicao =
                        distanciaMinima -
                        distancia;

                    fruta.x -=
                        Math.cos(angulo) *
                        sobreposicao *
                        0.5;

                    fruta.y -=
                        Math.sin(angulo) *
                        sobreposicao *
                        0.5;

                    outra.x +=
                        Math.cos(angulo) *
                        sobreposicao *
                        0.5;

                    outra.y +=
                        Math.sin(angulo) *
                        sobreposicao *
                        0.5;

                }

            }

        }

    }


    // NÃO DEIXA AS FRUTAS SAÍREM PELAS LATERAIS
    suikaFruits.forEach(fruta => {

        fruta.x =
            Math.max(
                fruta.radius,
                Math.min(
                    canvas.width -
                    fruta.radius,
                    fruta.x
                )
            );

    });


    suikaFruits =
        suikaFruits.filter(
            fruta =>
                !fruta.merged
        );


    // DESENHAR
    suikaFruits.forEach(fruta => {

        ctx.beginPath();

        ctx.arc(
            fruta.x,
            fruta.y,
            fruta.radius,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            fruta.obstaculo
                ? '#f0ffd9'
                : '#fff4d6';

        ctx.fill();


        ctx.strokeStyle =
            fruta.obstaculo
                ? '#84c341'
                : '#ff6f61';

        ctx.lineWidth = 2;

        ctx.stroke();


        ctx.font =
            `${fruta.radius * 1.2}px Arial`;

        ctx.textAlign =
            'center';

        ctx.textBaseline =
            'middle';


        ctx.fillText(
            fruta.emoji,
            fruta.x,
            fruta.y
        );

    });


    if (!suikaTerminou) {

        suikaAnimationId =
            requestAnimationFrame(
                loopSuika
            );

    }

}

function atualizarBarraEvolucao() {

    const progressBar =
        document.getElementById(
            'progress-bar-fill'
        );

    if (!progressBar) return;

    const ultimoNivel =
        fruitTypes.length - 1;

    const porcentagem =
        (maiorTipoFormado / ultimoNivel) * 100;

    progressBar.style.width =
        porcentagem + '%';
}
// ==========================================
// PONTUAÇÃO
// ==========================================

function atualizarPontuacaoSuika() {

    const scoreVal =
        document.getElementById(
            'score-val'
        );

    if (scoreVal) {
        scoreVal.textContent =
            suikaScore;
    }

}


// ==========================================
// TIMER
// ==========================================

function atualizarTempo() {

    const tempoElemento =
        document.getElementById(
            'tempo-val'
        );

    if (tempoElemento) {

        tempoElemento.textContent =
            tempoRestante;

    }

}


// ==========================================
// VITÓRIA
// ==========================================

function verificarVitoriaSuika() {

    if (
        formouMelancia &&
        !suikaTerminou
    ) {

        suikaTerminou = true;

        clearInterval(timerJogo);

        setTimeout(() => {

            const victoryBox =
                document.getElementById(
                    'victory-box'
                );

            if (victoryBox) {

                victoryBox
                    .classList
                    .remove('hidden');

            }

            avisarConclusaoAoMapa();

        }, 1000);

    }

}


// ==========================================
// AVISA O MAPA
// ==========================================

function avisarConclusaoAoMapa() {

    const detail = {

        fruta:
            'maracuja',

        continente:
            'america-do-sul'

    };


    window.dispatchEvent(

        new CustomEvent(
            'frutaviva:minigame-concluido',
            { detail }
        )

    );


    if (
        window.parent &&
        window.parent !== window
    ) {

        window.parent.postMessage({

            type:
                'frutaviva:minigame-concluido',

            detail

        }, '*');

    }

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

window.addEventListener(
    'DOMContentLoaded',
    iniciarMinigameAmericaDoSul
);
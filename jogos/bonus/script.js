// ========================================
// FRUTA VIVA — FASE BÔNUS
// Festa das Frutas — Match 3
// ========================================

// 1. CONFIGURAÇÕES
const CONFIG = {
  linhas: 6,
  colunas: 6,
  pontosPorCombo: 10,
  metaPontos: 100,
  tempoAnimacaoMatch: 340,
  tempoRefill: 180
};

const FRUTAS = ["🍎", "🍇", "🍍", "🥭", "🍉", "🥝"];

// 2. ESTADO
let tabuleiro = [];
let selecionada = null;
let pontuacao = 0;
let bloqueado = false;
let estado = "PREPARANDO"; // PREPARANDO | JOGANDO | RESOLVENDO | VITORIA | QUIZ_LIBERADO

// 3. DOM
const DOM = {
  startScreen: document.getElementById("start-screen"),
  gameScreen: document.getElementById("game-screen"),
  victoryScreen: document.getElementById("victory-screen"),
  btnStart: document.getElementById("btn-start"),
  btnReset: document.getElementById("btn-reset"),
  btnQuiz: document.getElementById("btn-quiz"),
  board: document.getElementById("board"),
  scoreText: document.getElementById("score-text"),
  scoreFill: document.getElementById("score-fill"),
  message: document.getElementById("message"),
  announcer: document.getElementById("aria-announcer")
};

// 4. TELAS
function mostrarTela(nome) {
  DOM.startScreen.classList.toggle("hidden", nome !== "inicio");
  DOM.gameScreen.classList.toggle("hidden", nome !== "jogo");
  DOM.victoryScreen.classList.toggle("hidden", nome !== "vitoria");
}

// 5. UTILIDADES
function indice(linha, coluna) {
  return linha * CONFIG.colunas + coluna;
}

function linhaColuna(index) {
  return {
    linha: Math.floor(index / CONFIG.colunas),
    coluna: index % CONFIG.colunas
  };
}

function frutaAleatoria() {
  return FRUTAS[Math.floor(Math.random() * FRUTAS.length)];
}

function saoAdjacentes(a, b) {
  const pa = linhaColuna(a);
  const pb = linhaColuna(b);
  const distancia = Math.abs(pa.linha - pb.linha) + Math.abs(pa.coluna - pb.coluna);
  return distancia === 1;
}

function trocar(a, b) {
  [tabuleiro[a], tabuleiro[b]] = [tabuleiro[b], tabuleiro[a]];
}

// 6. CRIAÇÃO DO TABULEIRO
function criarTabuleiroInicial() {
  tabuleiro = new Array(CONFIG.linhas * CONFIG.colunas).fill(null);

  for (let linha = 0; linha < CONFIG.linhas; linha++) {
    for (let coluna = 0; coluna < CONFIG.colunas; coluna++) {
      const idx = indice(linha, coluna);

      let tentativas = 0;
      let fruta;

      do {
        fruta = frutaAleatoria();
        tentativas++;
      } while (
        criariaMatchImediato(linha, coluna, fruta) &&
        tentativas < 30
      );

      tabuleiro[idx] = fruta;
    }
  }
}

function criariaMatchImediato(linha, coluna, fruta) {
  // Evita 3 iguais já na criação inicial.
  if (coluna >= 2) {
    const a = tabuleiro[indice(linha, coluna - 1)];
    const b = tabuleiro[indice(linha, coluna - 2)];
    if (a === fruta && b === fruta) return true;
  }

  if (linha >= 2) {
    const a = tabuleiro[indice(linha - 1, coluna)];
    const b = tabuleiro[indice(linha - 2, coluna)];
    if (a === fruta && b === fruta) return true;
  }

  return false;
}

// 7. RENDERIZAÇÃO
function renderizarTabuleiro(indicesMatch = new Set()) {
  DOM.board.innerHTML = "";

  tabuleiro.forEach((fruta, idx) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "tile";
    botao.dataset.index = idx;
    botao.setAttribute("aria-label", `Fruta ${fruta || "vazia"}, posição ${idx + 1}`);

    if (selecionada === idx) {
      botao.classList.add("selected");
    }

    if (indicesMatch.has(idx)) {
      botao.classList.add("match");
    }

    botao.textContent = fruta || "";
    DOM.board.appendChild(botao);
  });
}

// 8. MATCHES
function encontrarMatches() {
  const encontrados = new Set();
  let grupos = 0;

  // Horizontais
  for (let linha = 0; linha < CONFIG.linhas; linha++) {
    let inicio = 0;

    while (inicio < CONFIG.colunas) {
      const fruta = tabuleiro[indice(linha, inicio)];

      if (!fruta) {
        inicio++;
        continue;
      }

      let fim = inicio + 1;

      while (
        fim < CONFIG.colunas &&
        tabuleiro[indice(linha, fim)] === fruta
      ) {
        fim++;
      }

      const tamanho = fim - inicio;

      if (tamanho >= 3) {
        grupos++;

        for (let coluna = inicio; coluna < fim; coluna++) {
          encontrados.add(indice(linha, coluna));
        }
      }

      inicio = fim;
    }
  }

  // Verticais
  for (let coluna = 0; coluna < CONFIG.colunas; coluna++) {
    let inicio = 0;

    while (inicio < CONFIG.linhas) {
      const fruta = tabuleiro[indice(inicio, coluna)];

      if (!fruta) {
        inicio++;
        continue;
      }

      let fim = inicio + 1;

      while (
        fim < CONFIG.linhas &&
        tabuleiro[indice(fim, coluna)] === fruta
      ) {
        fim++;
      }

      const tamanho = fim - inicio;

      if (tamanho >= 3) {
        grupos++;

        for (let linha = inicio; linha < fim; linha++) {
          encontrados.add(indice(linha, coluna));
        }
      }

      inicio = fim;
    }
  }

  return {
    indices: encontrados,
    grupos
  };
}

// 9. CLIQUES / TROCAS
function lidarComClique(event) {
  if (bloqueado || estado !== "JOGANDO") return;

  const tile = event.target.closest(".tile");
  if (!tile) return;

  const idx = Number(tile.dataset.index);

  if (selecionada === null) {
    selecionada = idx;
    mensagem("Agora toque em uma fruta ao lado.");
    renderizarTabuleiro();
    return;
  }

  if (selecionada === idx) {
    selecionada = null;
    mensagem("Seleção cancelada.");
    renderizarTabuleiro();
    return;
  }

  if (!saoAdjacentes(selecionada, idx)) {
    selecionada = idx;
    mensagem("Escolha uma fruta que esteja ao lado.");
    renderizarTabuleiro();
    return;
  }

  const primeira = selecionada;
  selecionada = null;
  tentarTroca(primeira, idx);
}

async function tentarTroca(a, b) {
  bloqueado = true;
  trocar(a, b);
  renderizarTabuleiro();

  await esperar(130);

  const resultado = encontrarMatches();

  if (resultado.indices.size === 0) {
    trocar(a, b);
    renderizarTabuleiro();
    marcarTrocaInvalida(a, b);
    mensagem("Essa troca não formou 3 iguais.");
    anunciar("Troca inválida. Tente formar três frutas iguais.");

    await esperar(300);
    renderizarTabuleiro();

    bloqueado = false;
    return;
  }

  await resolverCombos();
  bloqueado = false;
}

// 10. RESOLUÇÃO DOS COMBOS
async function resolverCombos() {
  estado = "RESOLVENDO";

  while (true) {
    const resultado = encontrarMatches();

    if (resultado.indices.size === 0) {
      break;
    }

    const pontosGanhos = resultado.grupos * CONFIG.pontosPorCombo;
    pontuacao += pontosGanhos;

    mensagem(
      resultado.grupos > 1
        ? `Combo! +${pontosGanhos} pontos ⭐`
        : `Boa! +${pontosGanhos} pontos ⭐`
    );

    anunciar(`Você ganhou ${pontosGanhos} pontos.`);

    atualizarPontuacao();
    renderizarTabuleiro(resultado.indices);

    await esperar(CONFIG.tempoAnimacaoMatch);

    resultado.indices.forEach(idx => {
      tabuleiro[idx] = null;
    });

    aplicarGravidade();
    preencherVazios();
    renderizarTabuleiro();

    await esperar(CONFIG.tempoRefill);

    if (pontuacao >= CONFIG.metaPontos) {
      vencer();
      return;
    }
  }

  estado = "JOGANDO";
  mensagem("Continue! Forme mais 3 frutas iguais.");
}

// 11. GRAVIDADE E REPOSIÇÃO
function aplicarGravidade() {
  for (let coluna = 0; coluna < CONFIG.colunas; coluna++) {
    const frutasDaColuna = [];

    for (let linha = CONFIG.linhas - 1; linha >= 0; linha--) {
      const valor = tabuleiro[indice(linha, coluna)];
      if (valor !== null) {
        frutasDaColuna.push(valor);
      }
    }

    let cursor = 0;

    for (let linha = CONFIG.linhas - 1; linha >= 0; linha--) {
      const idx = indice(linha, coluna);
      tabuleiro[idx] = cursor < frutasDaColuna.length
        ? frutasDaColuna[cursor++]
        : null;
    }
  }
}

function preencherVazios() {
  for (let i = 0; i < tabuleiro.length; i++) {
    if (tabuleiro[i] === null) {
      tabuleiro[i] = frutaAleatoria();
    }
  }
}

// 12. FEEDBACK VISUAL
function marcarTrocaInvalida(a, b) {
  const tiles = DOM.board.querySelectorAll(".tile");
  tiles[a]?.classList.add("invalid");
  tiles[b]?.classList.add("invalid");
}

function atualizarPontuacao() {
  const exibida = Math.min(pontuacao, CONFIG.metaPontos);
  DOM.scoreText.textContent = `${exibida} / ${CONFIG.metaPontos} ⭐`;
  DOM.scoreFill.style.width = `${(exibida / CONFIG.metaPontos) * 100}%`;
}

function mensagem(texto) {
  DOM.message.textContent = texto;
}

function anunciar(texto) {
  DOM.announcer.textContent = "";
  setTimeout(() => {
    DOM.announcer.textContent = texto;
  }, 30);
}

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 13. INÍCIO / REINÍCIO
function iniciarJogo() {
  selecionada = null;
  pontuacao = 0;
  bloqueado = false;
  estado = "JOGANDO";

  criarTabuleiroInicial();
  atualizarPontuacao();
  renderizarTabuleiro();
  mensagem("Toque em uma fruta e depois em outra ao lado.");
  mostrarTela("jogo");
}

// 14. VITÓRIA
function vencer() {
  if (estado === "VITORIA" || estado === "QUIZ_LIBERADO") return;

  estado = "VITORIA";
  bloqueado = true;
  pontuacao = CONFIG.metaPontos;
  atualizarPontuacao();

  setTimeout(() => {
    mostrarTela("vitoria");
    anunciar("Parabéns! Você fez 100 pontos e concluiu a fase bônus.");
  }, 400);
}

// 15. INTEGRAÇÃO FUTURA
function onMinigameConcluido(idFruta) {
  window.dispatchEvent(new CustomEvent("frutaviva:minigame-concluido", {
    detail: {
      fruta: idFruta,
      continente: "bonus",
      pontuacao: CONFIG.metaPontos
    }
  }));

  if (window.parent && window.parent !== window) {
    window.parent.postMessage({
      type: "frutaviva:minigame-concluido",
      detail: {
        fruta: idFruta,
        continente: "bonus",
        pontuacao: CONFIG.metaPontos
      }
    }, "*");
  }

  console.log("[Fruta Viva] Fase bônus concluída.");
}

function liberarQuiz() {
  if (estado === "QUIZ_LIBERADO") return;

  estado = "QUIZ_LIBERADO";

  // Mantemos "abacaxi" porque hoje o destino bônus do JS principal
  // está cadastrado com esse id.
  onMinigameConcluido("abacaxi");
}

// 16. EVENTOS
DOM.btnStart.addEventListener("click", iniciarJogo);
DOM.btnReset.addEventListener("click", iniciarJogo);
DOM.board.addEventListener("click", lidarComClique);

DOM.btnQuiz.addEventListener("click", () => {
  liberarQuiz();
  DOM.btnQuiz.textContent = "Quiz liberado! ✓";
  DOM.btnQuiz.disabled = true;
});

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================
  // CONFIGURAÇÕES
  // =========================================================

  const ESTRELAS_POR_DESBLOQUEIO = 5;

  // 4 avatares gratuitos desde o início
  const AVATARES_LIVRES = new Set([
    'fem-01.png',
    'fem-07.png',
    'masc-01.png',
    'masc-09.png'
  ]);

  // Mesmas chaves já usadas no Fruta Viva
  const CHAVE_ESTRELAS = 'fv_estrelas';
  const CHAVE_PERFIL = 'frutaVivaPerfil';

  // Nova chave: guarda quais avatares o jogador escolheu liberar
  const CHAVE_AVATARES_DESBLOQUEADOS = 'fv_avatares_desbloqueados';

  // =========================================================
  // ORDEM DOS AVATARES
  // Os gratuitos aparecem primeiro
  // =========================================================

  const avataresFemininos = [
    'fem-01.png',
    'fem-07.png',
    'fem-02.png',
    'fem-03.png',
    'fem-04.png',
    'fem-05.png',
    'fem-06.png',
    'fem-08.png',
    'fem-09.png'
  ];

  const avataresMasculinos = [
    'masc-01.png',
    'masc-09.png',
    'masc-02.png',
    'masc-03.png',
    'masc-04.png',
    'masc-05.png',
    'masc-06.png',
    'masc-07.png',
    'masc-08.png'
  ];

  const todosAvatares = [
    ...avataresFemininos,
    ...avataresMasculinos
  ];

  // =========================================================
  // ELEMENTOS DA TELA
  // =========================================================

  const gridFeminino = document.getElementById('grid-feminino');
  const gridMasculino = document.getElementById('grid-masculino');

  const imgPreview = document.getElementById('avatar-preview');
  const legendaPreview = document.getElementById('nome-selecionado-label');

  const inputNome = document.getElementById('nome-usuario');

  const spanEstrelas = document.getElementById('total-estrelas');
  const proximoDesbloqueio = document.getElementById('proximo-desbloqueio');

  const mensagemAvatar = document.getElementById('mensagem-avatar');

  const btnSalvar = document.getElementById('btn-salvar');
  const btnContinuar = document.getElementById('btn-continuar');

  // =========================================================
  // ESTADO
  // =========================================================

  let totalEstrelas = lerTotalEstrelas();

  let avataresDesbloqueados = lerAvataresDesbloqueados();

  let avatarSelecionado = 'fem-01.png';

  // =========================================================
  // LEITURA DO LOCALSTORAGE
  // =========================================================

  function lerTotalEstrelas() {
    try {
      const total = Number(localStorage.getItem(CHAVE_ESTRELAS));

      return Number.isSafeInteger(total) && total >= 0
        ? total
        : 0;

    } catch (erro) {
      console.warn('Não foi possível ler as estrelas.', erro);
      return 0;
    }
  }

  function lerPerfilSalvo() {
    try {
      const perfil = JSON.parse(
        localStorage.getItem(CHAVE_PERFIL) || '{}'
      );

      return perfil &&
        typeof perfil === 'object' &&
        !Array.isArray(perfil)
        ? perfil
        : {};

    } catch (erro) {
      console.warn('Não foi possível ler o perfil.', erro);
      return {};
    }
  }

  function lerAvataresDesbloqueados() {
    try {
      const salvos = JSON.parse(
        localStorage.getItem(CHAVE_AVATARES_DESBLOQUEADOS) || '[]'
      );

      if (!Array.isArray(salvos)) {
        return new Set();
      }

      const validos = salvos.filter(arquivo =>
        todosAvatares.includes(arquivo) &&
        !AVATARES_LIVRES.has(arquivo)
      );

      return new Set(validos);

    } catch (erro) {
      console.warn(
        'Não foi possível ler os avatares desbloqueados.',
        erro
      );

      return new Set();
    }
  }

  function salvarAvataresDesbloqueados() {
    try {
      localStorage.setItem(
        CHAVE_AVATARES_DESBLOQUEADOS,
        JSON.stringify([...avataresDesbloqueados])
      );

      return true;

    } catch (erro) {
      console.error(
        'Não foi possível salvar os desbloqueios.',
        erro
      );

      mostrarMensagem(
        'Não foi possível salvar o desbloqueio.',
        'erro'
      );

      return false;
    }
  }

  // =========================================================
  // SISTEMA DE DESBLOQUEIO
  // =========================================================

  function totalDesbloqueiosConquistados() {
    return Math.floor(
      totalEstrelas / ESTRELAS_POR_DESBLOQUEIO
    );
  }

  function desbloqueiosUsados() {
    return avataresDesbloqueados.size;
  }

  function desbloqueiosDisponiveis() {
    return Math.max(
      0,
      totalDesbloqueiosConquistados() - desbloqueiosUsados()
    );
  }

  function estaLiberado(arquivo) {
    return (
      AVATARES_LIVRES.has(arquivo) ||
      avataresDesbloqueados.has(arquivo)
    );
  }

  function estrelasParaProximoDesbloqueio() {
    const resto = totalEstrelas % ESTRELAS_POR_DESBLOQUEIO;

    if (resto === 0) {
      return ESTRELAS_POR_DESBLOQUEIO;
    }

    return ESTRELAS_POR_DESBLOQUEIO - resto;
  }

  function todosBloqueadosForamLiberados() {
    return todosAvatares.every(arquivo =>
      estaLiberado(arquivo)
    );
  }

  // =========================================================
  // NOMES DOS AVATARES
  // =========================================================

  function nomeDoAvatar(arquivo) {
    const feminino = arquivo.startsWith('fem-');

    const numeroEncontrado = arquivo.match(/\d+/);

    const numero = numeroEncontrado
      ? Number(numeroEncontrado[0])
      : '';

    return `Avatar ${
      feminino ? 'feminino' : 'masculino'
    } ${numero}`;
  }

  // =========================================================
  // MENSAGENS
  // =========================================================

  function mostrarMensagem(texto, tipo = 'info') {
    mensagemAvatar.textContent = texto;
    mensagemAvatar.dataset.tipo = tipo;
  }

  // =========================================================
  // PAINEL DE ESTRELAS
  // =========================================================

  function atualizarPainelEstrelas() {
    spanEstrelas.textContent = String(totalEstrelas);

    if (todosBloqueadosForamLiberados()) {
      proximoDesbloqueio.textContent =
        '🎉 Você já liberou todos os avatares!';
      return;
    }

    const disponiveis = desbloqueiosDisponiveis();

    if (disponiveis > 0) {
      proximoDesbloqueio.textContent =
        disponiveis === 1
          ? '🎁 Você tem 1 desbloqueio disponível! Escolha um avatar.'
          : `🎁 Você tem ${disponiveis} desbloqueios disponíveis! Escolha seus avatares.`;

      return;
    }

    const faltam = estrelasParaProximoDesbloqueio();

    proximoDesbloqueio.textContent =
      faltam === 1
        ? 'Falta 1 estrela para ganhar uma nova escolha de avatar!'
        : `Faltam ${faltam} estrelas para ganhar uma nova escolha de avatar!`;
  }

  // =========================================================
  // SELEÇÃO VISUAL
  // =========================================================

  function atualizarSelecaoVisual() {
    document.querySelectorAll('.avatar-item').forEach(item => {

      const selecionado =
        item.dataset.avatar === avatarSelecionado;

      item.classList.toggle(
        'selecionado',
        selecionado
      );

      item.setAttribute(
        'aria-pressed',
        String(selecionado)
      );
    });

    imgPreview.src = `images/${avatarSelecionado}`;
    imgPreview.alt = nomeDoAvatar(avatarSelecionado);

    legendaPreview.textContent =
      `${nomeDoAvatar(avatarSelecionado)} selecionado`;
  }

  // =========================================================
  // CRIAÇÃO DOS CARDS
  // =========================================================

  function renderizarGrid(lista, container) {
    container.replaceChildren();

    lista.forEach(arquivo => {

      const liberado = estaLiberado(arquivo);

      const item = document.createElement('button');

      item.type = 'button';
      item.className = 'avatar-item';

      item.classList.toggle(
        'bloqueado',
        !liberado
      );

      item.dataset.avatar = arquivo;

      const img = document.createElement('img');

      img.src = `images/${arquivo}`;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';

      const selo = document.createElement('span');

      selo.className = 'avatar-selo';
      selo.setAttribute('aria-hidden', 'true');

      if (liberado) {

        selo.textContent = AVATARES_LIVRES.has(arquivo)
          ? '✓ Grátis'
          : '✓ Liberado';

        item.setAttribute(
          'aria-label',
          `${nomeDoAvatar(arquivo)}. Liberado.`
        );

        item.title =
          `Selecionar ${nomeDoAvatar(arquivo).toLowerCase()}`;

      } else {

        if (desbloqueiosDisponiveis() > 0) {

          selo.textContent = '🎁 Liberar';

          item.title =
            `Usar um desbloqueio neste avatar`;

          item.setAttribute(
            'aria-label',
            `${nomeDoAvatar(arquivo)}. Pode ser desbloqueado agora.`
          );

        } else {

          selo.textContent = '🔒 5 ⭐';

          item.title =
            'Conquiste mais estrelas para liberar';

          item.setAttribute(
            'aria-label',
            `${nomeDoAvatar(arquivo)}. Bloqueado.`
          );
        }
      }

      item.append(img, selo);

      item.addEventListener('click', () => {
        clicarAvatar(arquivo);
      });

      container.appendChild(item);
    });
  }

  // =========================================================
  // CLIQUE NO AVATAR
  // =========================================================

  function clicarAvatar(arquivo) {

    sincronizarEstrelas();

    if (estaLiberado(arquivo)) {
      avatarSelecionado = arquivo;

      atualizarSelecaoVisual();

      mostrarMensagem('');

      return;
    }

    if (desbloqueiosDisponiveis() <= 0) {

      const faltam = estrelasParaProximoDesbloqueio();

      mostrarMensagem(
        faltam === 1
          ? '🔒 Falta 1 estrela para ganhar seu próximo desbloqueio.'
          : `🔒 Faltam ${faltam} estrelas para ganhar seu próximo desbloqueio.`
      );

      return;
    }

    const confirmar = window.confirm(
      `🎁 Você quer liberar ${nomeDoAvatar(arquivo)}?\n\n` +
      `Suas estrelas NÃO serão gastas.`
    );

    if (!confirmar) {
      return;
    }

    avataresDesbloqueados.add(arquivo);

    if (!salvarAvataresDesbloqueados()) {
      avataresDesbloqueados.delete(arquivo);
      return;
    }

    avatarSelecionado = arquivo;

    atualizarTela();

    mostrarMensagem(
      `🎉 ${nomeDoAvatar(arquivo)} liberado para sempre!`,
      'sucesso'
    );
  }

  // =========================================================
  // ATUALIZA TELA
  // =========================================================

  function atualizarTela() {
    atualizarPainelEstrelas();

    renderizarGrid(
      avataresFemininos,
      gridFeminino
    );

    renderizarGrid(
      avataresMasculinos,
      gridMasculino
    );

    atualizarSelecaoVisual();
  }

  // =========================================================
  // SINCRONIZA ESTRELAS
  // =========================================================

  function sincronizarEstrelas() {
    const estrelasSalvas = lerTotalEstrelas();

    if (estrelasSalvas !== totalEstrelas) {
      totalEstrelas = estrelasSalvas;
      atualizarTela();
    }
  }

  // =========================================================
  // SALVAR PERFIL
  // =========================================================

  function salvarDados() {

    sincronizarEstrelas();

    if (!estaLiberado(avatarSelecionado)) {

      avatarSelecionado = 'fem-01.png';

      atualizarTela();

      mostrarMensagem(
        'Esse avatar ainda está bloqueado. Escolha um avatar liberado.',
        'erro'
      );

      return false;
    }

    const perfil = {
      ...lerPerfilSalvo(),

      nome:
        inputNome.value.trim() ||
        'Amiguinho',

      avatar:
        avatarSelecionado
    };

    try {

      localStorage.setItem(
        CHAVE_PERFIL,
        JSON.stringify(perfil)
      );

    } catch (erro) {

      console.error(
        'Não foi possível salvar o personagem.',
        erro
      );

      mostrarMensagem(
        'Não foi possível salvar o personagem.',
        'erro'
      );

      return false;
    }

    atualizarTela();

    mostrarMensagem(
      'Personagem salvo! Suas estrelas continuam com você. ⭐',
      'sucesso'
    );

    return true;
  }

  // =========================================================
  // CARREGA PERFIL EXISTENTE
  // =========================================================

  const perfilSalvo = lerPerfilSalvo();

  if (typeof perfilSalvo.nome === 'string') {
    inputNome.value = perfilSalvo.nome;
  }

  if (
    perfilSalvo.avatar &&
    estaLiberado(perfilSalvo.avatar)
  ) {
    avatarSelecionado = perfilSalvo.avatar;
  }

  // =========================================================
  // PRIMEIRA RENDERIZAÇÃO
  // =========================================================

  atualizarTela();

  // =========================================================
  // BOTÕES
  // =========================================================

  btnSalvar.addEventListener(
    'click',
    salvarDados
  );

  btnContinuar.addEventListener(
    'click',
    () => {

      if (salvarDados()) {
        window.location.href =
          '../tela-principal/principal.html';
      }
    }
  );

  // =========================================================
  // ATUALIZAÇÃO AUTOMÁTICA
  // =========================================================

  window.addEventListener(
    'pageshow',
    sincronizarEstrelas
  );

  window.addEventListener(
    'focus',
    sincronizarEstrelas
  );

  window.addEventListener(
    'storage',
    evento => {

      if (
        evento.key === CHAVE_ESTRELAS ||
        evento.key === CHAVE_AVATARES_DESBLOQUEADOS ||
        evento.key === null
      ) {

        totalEstrelas = lerTotalEstrelas();

        avataresDesbloqueados =
          lerAvataresDesbloqueados();

        atualizarTela();
      }
    }
  );
});
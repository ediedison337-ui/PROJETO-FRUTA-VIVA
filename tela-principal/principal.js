document.addEventListener("DOMContentLoaded", () => {



  /* ==========================================
     FRUTA VIVA - TELA PRINCIPAL
  ========================================== */


  /* ==========================================
     MARACULÍVIA - GUIA DA TELA PRINCIPAL
  ========================================== */

  const falaMaraculivia =
    document.getElementById("fala-maraculivia");

  const CHAVE_APRESENTACAO =
    "fv_apresentacao_maraculivia";

  const CHAVE_ORIGEM =
    "fv_origem_navegacao";


  function atualizarFalaMaraculivia() {

    if (!falaMaraculivia) {
      return;
    }

    const jaConhece =
      localStorage.getItem(CHAVE_APRESENTACAO);

    const origem =
      sessionStorage.getItem(CHAVE_ORIGEM);


    // PRIMEIRA VEZ NO FRUTA VIVA
    if (!jaConhece) {

      falaMaraculivia.textContent =
        "Oi! Eu sou a MaracuLívia! 🍎 Bem-vindo ao Fruta Viva! Aqui você pode conhecer frutas, descobrir receitas e viajar pelo mundo. O que vamos descobrir hoje?";

      localStorage.setItem(
        CHAVE_APRESENTACAO,
        "true"
      );

      sessionStorage.removeItem(CHAVE_ORIGEM);

      return;
    }


    // VOLTOU DE CONHECER FRUTAS
    if (origem === "frutas") {

      falaMaraculivia.textContent =
        "E aí, o que achou das frutas? 🍓 Escolha uma delas para descobrir ainda mais!";

    }

    // VOLTOU DAS RECEITAS
    else if (origem === "receitas") {

      falaMaraculivia.textContent =
        "Deu fome? 😋 Agora escolha uma fruta e descubra mais sobre ela!";

    }

    // VOLTOU DAS AVENTURAS
    else if (origem === "aventuras") {

      falaMaraculivia.textContent =
        "Que aventura! 🌎 Continue viajando para conquistar estrelas e liberar novos avatares!";

    }

    // VOLTOU DO AVATAR
    else if (origem === "avatar") {

      falaMaraculivia.textContent =
        "Gostei do seu personagem! 😄 Agora escolha o que vamos descobrir.";

    }

    // ENTRADA NORMAL
    else {

      falaMaraculivia.textContent =
        "O que vamos descobrir hoje? 🍊";

    }


    // Apaga a origem depois de usar
    sessionStorage.removeItem(CHAVE_ORIGEM);
  }


  atualizarFalaMaraculivia();


  // CONHECER FRUTAS
  document
    .querySelectorAll(
      'a[href="../tela-conhecer-frutas/conhecer-frutas.html"]'
    )
    .forEach(link => {

      link.addEventListener("click", () => {

        sessionStorage.setItem(
          CHAVE_ORIGEM,
          "frutas"
        );

      });

    });


  // RECEITAS
  document
    .querySelectorAll(
      'a[href="../tela-receitas/index-receitas.html"]'
    )
    .forEach(link => {

      link.addEventListener("click", () => {

        sessionStorage.setItem(
          CHAVE_ORIGEM,
          "receitas"
        );

      });

    });


  // AVENTURAS PELO MUNDO
  document
    .querySelectorAll(
      'a[href="../aventuras-pelo-mundo/index.html"]'
    )
    .forEach(link => {

      link.addEventListener("click", () => {

        sessionStorage.setItem(
          CHAVE_ORIGEM,
          "aventuras"
        );

      });

    });


  // MEU AVATAR
  document
    .querySelectorAll(
      'a[href="../tela-avatar/tela-2-avatar.html"]'
    )
    .forEach(link => {

      link.addEventListener("click", () => {

        sessionStorage.setItem(
          CHAVE_ORIGEM,
          "avatar"
        );

      });

    });

    
  /* ==========================================
     1. PERFIL DA CRIANÇA
  ========================================== */

  const storageKey = "frutaVivaPerfil";

  const perfilPadrao = {
    nome: "Amiguinho",
    avatar: "fem-07.png"
  };

  let perfilAtivo = perfilPadrao;


  try {

    const dadosSalvos =
      localStorage.getItem(storageKey);


    if (dadosSalvos) {

      const perfilParseado =
        JSON.parse(dadosSalvos);


      perfilAtivo = {

        nome:
          perfilParseado.nome ||
          perfilPadrao.nome,

        avatar:
          perfilParseado.avatar ||
          perfilPadrao.avatar

      };

    }

  } catch (erro) {

    console.error(
      "Erro ao carregar perfil:",
      erro
    );

  }



  /* ==========================================
     MOSTRA NOME E AVATAR
  ========================================== */

  const saudacaoNome =
    document.getElementById("saudacaoNome");

  const avatarMini =
    document.getElementById("avatarMini");


  if (saudacaoNome) {

    saudacaoNome.textContent =
      `Oi, ${perfilAtivo.nome}! 👋`;

  }


  if (avatarMini) {

    avatarMini.src =
      `../tela-avatar/images/${perfilAtivo.avatar}`;

    avatarMini.alt =
      `Avatar de ${perfilAtivo.nome}`;


    avatarMini.onerror = () => {

      avatarMini.src =
        `../tela-avatar/images/${perfilPadrao.avatar}`;

    };

  }



  /* ==========================================
     2. MENU LATERAL
  ========================================== */

  const botaoMenu =
    document.querySelector(".botao_menu");

  const barraLateral =
    document.querySelector(".barra_lateral");

  const fecharMenu =
    document.querySelector(".fechar_menu");


  if (botaoMenu && barraLateral) {

    botaoMenu.addEventListener(
      "click",
      () => {

        barraLateral.style.display =
          "block";

      }
    );

  }


  if (fecharMenu && barraLateral) {

    fecharMenu.addEventListener(
      "click",
      () => {

        barraLateral.style.display =
          "none";

      }
    );

  }



  /* Fecha o menu clicando na parte escura */

  if (barraLateral) {

    barraLateral.addEventListener(
      "click",
      (evento) => {

        if (evento.target === barraLateral) {

          barraLateral.style.display =
            "none";

        }

      }
    );

  }



  /* Fecha menu ao clicar em um link */

  const linksMenu =
    document.querySelectorAll(
      ".menu_lateral a"
    );


  linksMenu.forEach(link => {

    link.addEventListener(
      "click",
      () => {

        if (barraLateral) {

          barraLateral.style.display =
            "none";

        }

      }
    );

  });



  /* ==========================================
     3. DADOS DAS FRUTAS
  ========================================== */

  const frutas = {

  abacaxi: {
    nome: "Abacaxi",

    fundo:
      "../assets/frutas/abacaxi/fundo-abacaxi.png",

    origem:
      "O abacaxi é originário da América do Sul e já era cultivado pelos povos indígenas há muito tempo.",

    curiosidade:
      "Já reparou na casca do abacaxi? Ela é cheia de formas que parecem pequenos desenhos geométricos! 🍍",

    beneficios:
      "O abacaxi tem vitamina C, fibras e bromelina, uma enzima que ajuda na digestão.",

    receitas:
      "O abacaxi pode ser usado em sucos, sobremesas e várias receitas refrescantes."
  },


  kiwi: {
    nome: "Kiwi",

    fundo:
      "../assets/frutas/kiwi/fundo-kiwi.png",

    origem:
      "Mesmo sendo muito famoso na Nova Zelândia, o kiwi nasceu na China e depois passou a ser cultivado em vários países.",

    curiosidade:
      "Por fora ele é marrom e peludinho, mas por dentro é verde, cheio de sementinhas pretas! 🥝",

    beneficios:
      "O kiwi é rico em vitamina C, fibras e outros nutrientes importantes para o organismo.",

    receitas:
      "Em breve vamos descobrir receitas deliciosas feitas com kiwi! 🥝"
  },


  maca: {
    nome: "Maçã",

    fundo:
      "../assets/frutas/maca/fundo-maca.png",

    origem:
      "A maçã é cultivada há milhares de anos e hoje pode ser encontrada em várias partes do mundo.",

    curiosidade:
      "Existem maçãs vermelhas, verdes e amarelas, e cada variedade pode ter um sabor diferente! 🍎",

    beneficios:
      "A maçã possui fibras, vitaminas e antioxidantes que fazem parte de uma alimentação equilibrada.",

    receitas:
      "A maçã pode ser comida fresca e também usada em sucos, tortas e geleias."
  },


  manga: {
    nome: "Manga",

    fundo:
      "../assets/frutas/manga/fundo-manga.png",

    origem:
      "A manga nasceu na Ásia e é cultivada há milhares de anos. Hoje ela é muito comum em países quentes, como o Brasil.",

    curiosidade:
      "Existem mangas de vários tamanhos, cores e tipos, mas quase todas têm aquele cheirinho doce bem marcante! 🥭",

    beneficios:
      "A manga possui vitaminas, fibras e antioxidantes importantes para uma alimentação equilibrada.",

    receitas:
      "A manga pode virar sucos, vitaminas, sobremesas e muitas outras receitas."
  },


  maracuja: {
    nome: "Maracujá",

    fundo:
      "../assets/frutas/maracuja/fundo-maracuja.png",

    origem:
      "O maracujá é originário da América do Sul e já era cultivado pelos povos indígenas há muito tempo.",

    curiosidade:
      "Quando abrimos o maracujá encontramos uma polpa dourada cheia de pequenas sementes! 🍈",

    beneficios:
      "O maracujá possui vitamina C, fibras e antioxidantes importantes para uma alimentação equilibrada.",

    receitas:
      "Ele pode ser usado em sucos, mousses, sorvetes e várias outras receitas."
  },


  melancia: {
    nome: "Melancia",

    fundo:
      "../assets/frutas/melancia/fundo-melancia.png",

    origem:
      "A melancia nasceu na África e é cultivada há milhares de anos.",

    curiosidade:
      "A melancia é cheia de água e pode ficar enorme! Algumas também possuem várias sementinhas pretas. 🍉",

    beneficios:
      "Ela possui muita água, vitaminas e minerais, ajudando a manter o corpo hidratado.",

    receitas:
      "A melancia pode ser comida em fatias e também usada em sucos e saladas de frutas."
  },


  uva: {
    nome: "Uva",

    fundo:
      "../assets/frutas/uva/fundo-uva.png",

    origem:
      "A uva é cultivada há milhares de anos e faz parte da história e da cultura de muitos povos.",

    curiosidade:
      "As uvas crescem juntinhas em cachos e podem ser verdes, vermelhas, roxas ou quase pretas! 🍇",

    beneficios:
      "A uva possui vitaminas, fibras e antioxidantes que fazem parte de uma alimentação equilibrada.",

    receitas:
      "A uva pode ser consumida fresca e também usada em sucos, geleias e doces."
  }

};
/* ==========================================
   FRUTA EM DESTAQUE
========================================== */

const frutasEmDestaque = [

  {
    id: "abacaxi",
    nome: "Abacaxi 🍍",
    texto:
      "Você sabia que o abacaxi cresce perto do chão, no centro de uma planta de folhas compridas?"
  },

  {
    id: "kiwi",
    nome: "Kiwi 🥝",
    texto:
      "Você sabia que o kiwi recebeu esse nome em homenagem a uma ave muito conhecida da Nova Zelândia?"
  },

  {
    id: "maca",
    nome: "Maçã 🍎",
    texto:
      "Você sabia que a maçã consegue flutuar na água porque existe ar em seu interior?"
  },

  {
    id: "manga",
    nome: "Manga 🥭",
    texto:
      "Você sabia que uma mangueira pode crescer bastante e viver por muitos anos?"
  },

  {
    id: "maracuja",
    nome: "Maracujá 💛",
    texto:
      "Você sabia que existem variedades de maracujá com casca amarela, roxa e alaranjada?"
  },

  {
    id: "melancia",
    nome: "Melancia 🍉",
    texto:
      "Você sabia que a melancia cresce em ramas que se espalham pelo chão?"
  },

  {
    id: "uva",
    nome: "Uva 🍇",
    texto:
      "Você sabia que existem variedades de uva com sementes e outras cultivadas sem sementes?"
  }

];


function sortearFrutaEmDestaque() {

  const elementoNome =
    document.getElementById(
      "fruta-destaque-nome"
    );

  const elementoTexto =
    document.getElementById(
      "fruta-destaque-texto"
    );


  if (!elementoNome || !elementoTexto) {
    return;
  }


  /* Evita repetir imediatamente
     a mesma fruta ao dar F5 */

  const ultimaFruta =
    sessionStorage.getItem(
      "fv_ultima_fruta_destaque"
    );


  const frutasDisponiveis =
    frutasEmDestaque.filter(
      fruta => fruta.id !== ultimaFruta
    );


  const indiceSorteado =
    Math.floor(
      Math.random() *
      frutasDisponiveis.length
    );


  const frutaEscolhida =
    frutasDisponiveis[indiceSorteado];


  elementoNome.textContent =
    frutaEscolhida.nome;


  elementoTexto.textContent =
    `“${frutaEscolhida.texto}”`;


  sessionStorage.setItem(
    "fv_ultima_fruta_destaque",
    frutaEscolhida.id
  );

}


sortearFrutaEmDestaque();

  /* ==========================================
     4. FUNÇÃO QUE SELECIONA A FRUTA
  ========================================== */

  function selecionarFruta(nomeFruta) {

    const fruta =
      frutas[nomeFruta];


    if (!fruta) {

      console.log(
        "Fruta não encontrada:",
        nomeFruta
      );

      return;

    }
  const textoOrigem =
    document.getElementById("texto_origem");

  const textoCuriosidade =
    document.getElementById("texto_curiosidade");

  const textoBeneficios =
    document.getElementById("texto_beneficios");

  const textoReceitas =
    document.getElementById("texto_receitas");


  textoOrigem.textContent =
    fruta.origem;

  textoCuriosidade.textContent =
    fruta.curiosidade;

  textoBeneficios.textContent =
    fruta.beneficios;

  textoReceitas.textContent =
    fruta.receitas;


    /* Troca o fundo */
document.body.style.backgroundImage = `

  linear-gradient(
    rgba(249, 248, 243, 0.12),
    rgba(249, 248, 243, 0.12)
  ),

  url("${fruta.fundo}")

`;



    /* Remove seleção antiga */

    const botoesFrutas =
      document.querySelectorAll(
        ".botao_fruta"
      );


    botoesFrutas.forEach(botao => {

      botao.style.outline =
        "none";

      botao.style.transform =
        "scale(1)";

    });



    /* Destaca a fruta escolhida */

    const botaoSelecionado =
      document.querySelector(
        `.botao_fruta[data-fruta="${nomeFruta}"]`
      );


    if (botaoSelecionado) {

      botaoSelecionado.style.outline =
        "3px solid #00CECB";

      botaoSelecionado.style.transform =
        "scale(1.08)";

    }



    console.log(
      `Fruta selecionada: ${fruta.nome}`
    );

  }



  /* ==========================================
     5. CLIQUE NOS BOTÕES DAS FRUTAS
  ========================================== */

  const botoesFrutas =
    document.querySelectorAll(
      ".botao_fruta"
    );


  botoesFrutas.forEach(botao => {

    botao.addEventListener(
      "click",
      () => {

        const frutaSelecionada =
          botao.dataset.fruta;


        selecionarFruta(
          frutaSelecionada
        );

      }
    );

  });



  /* ==========================================
     6. PESQUISA DE FRUTAS
  ========================================== */

  const campoPesquisa =
    document.getElementById(
      "pesquisa_fruta"
    );


  function normalizarTexto(texto) {

    return texto

      .trim()

      .toLowerCase()

      .normalize("NFD")

      .replace(
        /[\u0300-\u036f]/g,
        ""
      );

  }



  if (campoPesquisa) {

    campoPesquisa.addEventListener(
      "keydown",
      (evento) => {

        if (evento.key !== "Enter") {

          return;

        }


        const pesquisa =
          normalizarTexto(
            campoPesquisa.value
          );


        if (frutas[pesquisa]) {

          selecionarFruta(
            pesquisa
          );


          const secaoFrutas =
            document.getElementById(
              "secao-frutas"
            );


          if (secaoFrutas) {

            secaoFrutas.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });

          }


          campoPesquisa.value =
            "";

        } else {

          alert(
            "Essa fruta ainda não está no Fruta Viva! 🍎"
          );

        }

      }
    );

  }



  /* ==========================================
     7. MARACUJÁ COMO FRUTA INICIAL
  ========================================== */

  selecionarFruta(
    "maracuja"
  );



  /* ==========================================
     8. CONTEÚDO DAS FRUTAS
  ==========================================

     A próxima etapa será colocar aqui:

     - origem
     - curiosidade
     - benefícios
     - receitas

     usando os textos reais dos arquivos
     da pasta:

     conteudo/frutas/

     Não coloquei textos inventados aqui.

  ========================================== */


});
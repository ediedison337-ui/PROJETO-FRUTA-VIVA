// ============================================
// FRUTA VIVA - RECEITAS
// ============================================


// ============================================
// LISTA DAS FRUTAS
// ============================================

const frutas = [

    {
        id: "abacaxi",
        nome: "Abacaxi",
        emoji: "🍍",
        arquivo: "receitas/receitas-abacaxi.md"
    },

    {
        id: "kiwi",
        nome: "Kiwi",
        emoji: "🥝",
        arquivo: "receitas/receitas-kiwi.md"
    },

    {
        id: "maca",
        nome: "Maçã",
        emoji: "🍎",
        arquivo: "receitas/receitas-maca.md"
    },

    {
        id: "manga",
        nome: "Manga",
        emoji: "🥭",
        arquivo: "receitas/receitas-manga.md"
    },

    {
        id: "maracuja",
        nome: "Maracujá",
        emoji: "🟠",
        arquivo: "receitas/receitas-maracuja.md"
    },

    {
        id: "melancia",
        nome: "Melancia",
        emoji: "🍉",
        arquivo: "receitas/receitas-melancia.md"
    },

    {
        id: "uva",
        nome: "Uva",
        emoji: "🍇",
        arquivo: "receitas/receitas-uva.md"
    }

];


// ============================================
// ELEMENTOS DA TELA
// ============================================

const gradeFrutas =
    document.getElementById("grade-frutas");

const pesquisa =
    document.getElementById("pesquisa-receitas");

const nenhumaReceita =
    document.getElementById("nenhuma-receita");


// MODAL

const modal =
    document.getElementById("modal-receita");

const fecharModal =
    document.getElementById("fechar-modal");

const modalImagem =
    document.getElementById("modal-imagem");

const modalTipo =
    document.getElementById("modal-tipo");

const modalTitulo =
    document.getElementById("modal-titulo");

const modalIngredientes =
    document.getElementById("modal-ingredientes");

const modalPreparo =
    document.getElementById("modal-preparo");


// ============================================
// ARRAY QUE GUARDA TODAS AS RECEITAS
// ============================================

let todasReceitas = [];


// ============================================
// INICIAR
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    iniciarPagina
);


async function iniciarPagina() {

    carregarAvatar();

    await carregarTodasReceitas();

}


// ============================================
// CARREGAR TODOS OS ARQUIVOS MD
// ============================================

async function carregarTodasReceitas() {

    gradeFrutas.innerHTML = "";

    todasReceitas = [];


    try {

        for (const fruta of frutas) {

            await carregarFruta(fruta);

        }

    }

    catch (erro) {

        console.error(
            "Erro ao carregar receitas:",
            erro
        );


        gradeFrutas.innerHTML = `

            <div
                style="
                    grid-column: 1 / -1;
                    padding: 40px;
                    background: white;
                    border-radius: 20px;
                    text-align: center;
                "
            >

                <h2>
                    Não consegui carregar as receitas 😕
                </h2>

                <p
                    style="
                        margin-top: 10px;
                        line-height: 1.5;
                    "
                >
                    Abra o projeto usando o
                    <strong>Live Server</strong>
                    do VS Code.
                </p>

            </div>

        `;

    }

}


// ============================================
// CARREGAR UMA FRUTA
// ============================================

async function carregarFruta(fruta) {

    const resposta =
        await fetch(fruta.arquivo);


    if (!resposta.ok) {

        throw new Error(
            `Arquivo não encontrado: ${fruta.arquivo}`
        );

    }


    const texto =
        await resposta.text();


    const receitas =
        extrairReceitasDoMarkdown(
            texto,
            fruta
        );


    todasReceitas.push(
        ...receitas
    );


    criarBlocoFruta(
        fruta,
        receitas
    );

}


// ============================================
// LER O CONTEÚDO DO MD
// ============================================

function extrairReceitasDoMarkdown(
    texto,
    fruta
) {

    const linhas =
        texto
            .split(/\r?\n/)
            .map(
                linha => linha.trim()
            )
            .filter(Boolean);


    const receitas = [];


    let categoria = "";

    let receitaAtual = null;

    let contadorDoce = 0;

    let contadorSuco = 0;


    for (let linha of linhas) {


        // ------------------------------------
        // IDENTIFICAÇÃO DAS CATEGORIAS
        // ------------------------------------

        if (
            linha.includes(
                "Receitas de Doces"
            )
        ) {

            categoria = "doce";

            continue;

        }


        if (
            linha.includes(
                "Opções de Suco"
            )
        ) {

            categoria = "suco";

            continue;

        }


        if (
            linha.includes(
                "Receita Salgada"
            )
        ) {

            categoria = "salgada";

            continue;

        }


        // ignora linha com nome da fruta

        if (
            linha === "🍍 ABACAXI" ||
            linha === "🥝 KIWI" ||
            linha === "🍎 MAÇÃ" ||
            linha === "🥭 MANGA" ||
            linha === "🟠 MARACUJÁ" ||
            linha === "🍉 MELANCIA" ||
            linha.includes("🍇 UVA")
        ) {

            continue;

        }


        // ------------------------------------
        // INGREDIENTES
        // ------------------------------------

        if (
            linha.startsWith(
                "Ingredientes:"
            )
        ) {

            if (receitaAtual) {

                receitaAtual.ingredientes =
                    linha
                        .replace(
                            "Ingredientes:",
                            ""
                        )
                        .trim();

            }

            continue;

        }


        // ------------------------------------
        // MODO DE PREPARO
        // ------------------------------------

        if (
            linha.startsWith(
                "Modo de preparo:"
            )
        ) {

            if (receitaAtual) {

                receitaAtual.preparo =
                    linha
                        .replace(
                            "Modo de preparo:",
                            ""
                        )
                        .trim();

            }

            continue;

        }


        // ------------------------------------
        // TÍTULO DOCE OU SUCO
        // Ex:
        // 1. Mousse...
        // ------------------------------------

        const tituloNumerado =
            linha.match(
                /^\d+\.\s*(.+)$/
            );


        if (
            tituloNumerado &&
            (
                categoria === "doce" ||
                categoria === "suco"
            )
        ) {

            let imagem = "";

            let tipoTexto = "";


            if (
                categoria === "doce"
            ) {

                contadorDoce++;

                imagem =
                    `imagens-receitas/receita-${fruta.id}-${contadorDoce}.png`;

                tipoTexto =
                    "Doce / Sobremesa";

            }


            if (
                categoria === "suco"
            ) {

                contadorSuco++;

                imagem =
                    `imagens-receitas/suco-${fruta.id}-${contadorSuco}.png`;

                tipoTexto =
                    "Suco";

            }


            receitaAtual = {

                fruta:
                    fruta.id,

                frutaNome:
                    fruta.nome,

                categoria:
                    categoria,

                tipo:
                    tipoTexto,

                titulo:
                    tituloNumerado[1],

                ingredientes:
                    "",

                preparo:
                    "",

                imagem:
                    imagem

            };


            receitas.push(
                receitaAtual
            );


            continue;

        }


        // ------------------------------------
        // RECEITA SALGADA
        // Ela não está numerada no MD
        // ------------------------------------

        if (
            categoria === "salgada" &&
            !linha.startsWith(
                "Ingredientes:"
            ) &&
            !linha.startsWith(
                "Modo de preparo:"
            )
        ) {

            receitaAtual = {

                fruta:
                    fruta.id,

                frutaNome:
                    fruta.nome,

                categoria:
                    "salgada",

                tipo:
                    "Receita Salgada",

                titulo:
                    linha,

                ingredientes:
                    "",

                preparo:
                    "",

                imagem:
                    `imagens-receitas/salgada-${fruta.id}.png`

            };


            receitas.push(
                receitaAtual
            );

        }

    }


    return receitas;

}


// ============================================
// CRIAR O BLOCO DE UMA FRUTA
// ============================================

function criarBlocoFruta(
    fruta,
    receitas
) {

    const bloco =
        document.createElement(
            "article"
        );


    bloco.className =
        "bloco-fruta";


    bloco.dataset.fruta =
        fruta.id;


    // CABEÇALHO

    const cabecalho =
        document.createElement(
            "div"
        );


    cabecalho.className =
        "cabecalho-fruta";


    const titulo =
        document.createElement(
            "h2"
        );


    titulo.textContent =
        `${fruta.emoji} ${fruta.nome}`;


    const quantidade =
        document.createElement(
            "span"
        );


    quantidade.className =
        "quantidade-receitas";


    quantidade.textContent =
        `${receitas.length} receitas`;


    cabecalho.appendChild(
        titulo
    );


    cabecalho.appendChild(
        quantidade
    );


    // MOSAICO

    const mosaico =
        document.createElement(
            "div"
        );


    mosaico.className =
        "mosaico-receitas";


    receitas.forEach(
        receita => {

            const card =
                criarCardReceita(
                    receita
                );


            mosaico.appendChild(
                card
            );

        }
    );


    bloco.appendChild(
        cabecalho
    );


    bloco.appendChild(
        mosaico
    );


    gradeFrutas.appendChild(
        bloco
    );

}


// ============================================
// CRIAR CARD
// ============================================

function criarCardReceita(
    receita
) {

    const card =
        document.createElement(
            "button"
        );


    card.type =
        "button";


    card.className =
        "card-receita";


    card.dataset.nome =
        normalizarTexto(
            receita.titulo
        );


    card.dataset.fruta =
        normalizarTexto(
            receita.frutaNome
        );


    card.dataset.tipo =
        normalizarTexto(
            receita.tipo
        );


    // IMAGEM

    const imagem =
        document.createElement(
            "img"
        );


    imagem.src =
        receita.imagem;


    imagem.alt =
        receita.titulo;


    imagem.loading =
        "lazy";


    // caso alguma imagem esteja faltando

    imagem.addEventListener(
        "error",
        () => {

            imagem.style.display =
                "none";

            card.style.background =
                "#dddddd";

        }
    );


    // INFO

    const info =
        document.createElement(
            "div"
        );


    info.className =
        "info-card";


    const tipo =
        document.createElement(
            "span"
        );


    tipo.className =
        "tipo-card";


    tipo.textContent =
        receita.tipo;


    const nome =
        document.createElement(
            "span"
        );


    nome.className =
        "nome-receita";


    nome.textContent =
        receita.titulo;


    info.appendChild(
        tipo
    );


    info.appendChild(
        nome
    );


    card.appendChild(
        imagem
    );


    card.appendChild(
        info
    );


    // CLIQUE

    card.addEventListener(
        "click",
        () => {

            abrirModal(
                receita
            );

        }
    );


    return card;

}


// ============================================
// ABRIR MODAL
// ============================================

function abrirModal(
    receita
) {

    modalImagem.src =
        receita.imagem;


    modalImagem.alt =
        receita.titulo;


    modalTipo.textContent =
        `${receita.frutaNome} • ${receita.tipo}`;


    modalTitulo.textContent =
        receita.titulo;


    modalIngredientes.textContent =
        receita.ingredientes;


    modalPreparo.textContent =
        receita.preparo;


    modal.classList.add(
        "aberto"
    );


    document.body.style.overflow =
        "hidden";

}


// ============================================
// FECHAR MODAL
// ============================================

function fecharModalReceita() {

    modal.classList.remove(
        "aberto"
    );


    document.body.style.overflow =
        "";

}


// botão X

fecharModal.addEventListener(
    "click",
    fecharModalReceita
);


// clicar fora

modal.addEventListener(
    "click",
    evento => {

        if (
            evento.target === modal
        ) {

            fecharModalReceita();

        }

    }
);


// tecla ESC

document.addEventListener(
    "keydown",
    evento => {

        if (
            evento.key === "Escape"
        ) {

            fecharModalReceita();

        }

    }
);


// ============================================
// PESQUISA
// ============================================

pesquisa.addEventListener(
    "input",
    pesquisarReceitas
);


function pesquisarReceitas() {

    const termo =
        normalizarTexto(
            pesquisa.value
        );


    const blocos =
        document.querySelectorAll(
            ".bloco-fruta"
        );


    let encontrouAlguma =
        false;


    blocos.forEach(
        bloco => {

            const cards =
                bloco.querySelectorAll(
                    ".card-receita"
                );


            let encontrouNoBloco =
                false;


            cards.forEach(
                card => {

                    const texto =
                        `
                        ${card.dataset.nome}
                        ${card.dataset.fruta}
                        ${card.dataset.tipo}
                        `;


                    const encontrou =
                        texto.includes(
                            termo
                        );


                    card.style.display =
                        encontrou
                            ? ""
                            : "none";


                    if (encontrou) {

                        encontrouAlguma =
                            true;

                        encontrouNoBloco =
                            true;

                    }

                }
            );


            bloco.style.display =
                encontrouNoBloco
                    ? ""
                    : "none";

        }
    );


    if (encontrouAlguma) {

        nenhumaReceita.classList.add(
            "escondido"
        );

    }

    else {

        nenhumaReceita.classList.remove(
            "escondido"
        );

    }

}


// ============================================
// NORMALIZAR TEXTO
//
// "Maçã" vira "maca"
// "Maracujá" vira "maracuja"
// ============================================

function normalizarTexto(
    texto
) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}


// ============================================
// AVATAR
// ============================================

// ============================================
// AVATAR DO USUÁRIO
// ============================================

function carregarAvatar() {

    const avatar =
        document.getElementById("avatar-receitas");

    const dadosSalvos =
        localStorage.getItem("frutaVivaPerfil");

    // Avatar padrão caso não exista perfil salvo
    let avatarEscolhido = "fem-07.png";


    if (dadosSalvos) {

        try {

            const perfil =
                JSON.parse(dadosSalvos);

            if (perfil.avatar) {

                avatarEscolhido =
                    perfil.avatar;

            }

        } catch (erro) {

            console.error(
                "Erro ao carregar avatar:",
                erro
            );

        }

    }


    avatar.src =
        `../tela-avatar/images/${avatarEscolhido}`;

    avatar.style.display =
        "block";


    // Se der erro na imagem, usa o avatar padrão
    avatar.onerror = () => {

        avatar.src =
            "../tela-avatar/images/fem-07.png";

    };

}
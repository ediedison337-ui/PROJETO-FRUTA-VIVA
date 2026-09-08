const frutas = [

    {
        nome: "Maçã",
        arquivo: "maca.png",
        emoji: "🍎",
        cor: "#ef5350",
        categorias: ["vermelha"],
        categoriaTexto: "Fruta popular",
        descricao: "Crocante, doce e fácil de levar para qualquer lugar.",
        beneficios: "Ajuda a complementar uma alimentação equilibrada e é uma boa fonte de fibras.",
        nutrientes: "Fibras, vitamina C e compostos antioxidantes.",
        origem: "Ásia Central.",
        epoca: "Principalmente entre janeiro e abril no Brasil.",
        curiosidade: "Existem milhares de variedades de maçãs cultivadas pelo mundo.",
        dica: "Experimente comer com casca bem higienizada, pois nela também há fibras."
    },

    {
        nome: "Banana",
        arquivo: "banana.png",
        emoji: "🍌",
        cor: "#f6c945",
        categorias: ["tropical"],
        categoriaTexto: "Tropical",
        descricao: "Macia, docinha e uma das frutas mais consumidas no Brasil.",
        beneficios: "É prática para lanches e fornece energia para as atividades do dia.",
        nutrientes: "Potássio, vitamina B6, fibras e carboidratos.",
        origem: "Sudeste da Ásia.",
        epoca: "Pode ser encontrada durante praticamente todo o ano.",
        curiosidade: "A bananeira parece uma árvore, mas botanicamente é considerada uma grande planta herbácea.",
        dica: "Fica ótima com aveia, iogurte ou amassada em receitas."
    },

    {
        nome: "Laranja",
        arquivo: "laranja.png",
        emoji: "🍊",
        cor: "#ff9800",
        categorias: ["citrica"],
        categoriaTexto: "Cítrica",
        descricao: "Suculenta e refrescante, é uma das frutas mais conhecidas do país.",
        beneficios: "Ajuda a fornecer vitamina C e líquidos para a alimentação.",
        nutrientes: "Vitamina C, fibras, folato e antioxidantes.",
        origem: "Ásia.",
        epoca: "Há variedades disponíveis durante boa parte do ano.",
        curiosidade: "O Brasil está entre os grandes produtores mundiais de laranja.",
        dica: "Prefira consumir a fruta inteira quando possível para aproveitar melhor suas fibras."
    },

    {
        nome: "Maracujá",
        arquivo: "maracuja.png",
        emoji: "🟡",
        cor: "#f4c430",
        categorias: ["tropical", "brasileira"],
        categoriaTexto: "Tropical",
        descricao: "Tem aroma marcante, sabor azedinho e uma polpa cheia de sementes.",
        beneficios: "Contribui com fibras, vitaminas e outros nutrientes para uma alimentação variada.",
        nutrientes: "Vitamina C, vitamina A, fibras e minerais.",
        origem: "América Tropical.",
        epoca: "Pode ser encontrado durante boa parte do ano, com períodos de maior oferta.",
        curiosidade: "A flor do maracujá é conhecida como flor-da-paixão e possui um formato muito diferente.",
        dica: "A polpa pode virar sucos, molhos, sobremesas e até acompanhar pratos salgados."
    },

    {
        nome: "Melancia",
        arquivo: "melancia.png",
        emoji: "🍉",
        cor: "#ef5350",
        categorias: ["tropical", "vermelha"],
        categoriaTexto: "Refrescante",
        descricao: "Grande, doce e cheia de água.",
        beneficios: "É uma fruta refrescante e contribui para o consumo de líquidos.",
        nutrientes: "Água, vitamina C, vitamina A e licopeno.",
        origem: "África.",
        epoca: "Tem grande oferta nos meses mais quentes.",
        curiosidade: "A maior parte da melancia é formada por água.",
        dica: "Sirva gelada em cubinhos nos dias quentes."
    },

    {
        nome: "Uva",
        arquivo: "uva.png",
        emoji: "🍇",
        cor: "#8e44ad",
        categorias: ["vermelha"],
        categoriaTexto: "Fruta de cachos",
        descricao: "Pequena, doce e encontrada em muitas variedades e cores.",
        beneficios: "Fornece vitaminas, minerais e compostos antioxidantes.",
        nutrientes: "Vitamina C, vitamina K, potássio e antioxidantes.",
        origem: "Regiões da Europa e Ásia.",
        epoca: "No Brasil, a oferta costuma aumentar no verão.",
        curiosidade: "Existem uvas verdes, roxas, vermelhas e até variedades sem sementes.",
        dica: "Lave bem e experimente congelar algumas para um lanche refrescante."
    },

    {
        nome: "Manga",
        arquivo: "manga.png",
        emoji: "🥭",
        cor: "#ffb300",
        categorias: ["tropical"],
        categoriaTexto: "Tropical",
        descricao: "Doce, perfumada e muito suculenta.",
        beneficios: "Ajuda a aumentar a variedade de vitaminas e fibras da alimentação.",
        nutrientes: "Vitaminas A e C, fibras e antioxidantes.",
        origem: "Sul da Ásia.",
        epoca: "Maior oferta geralmente entre primavera e verão.",
        curiosidade: "Existem muitas variedades, como Palmer, Tommy, Espada e Haden.",
        dica: "Fica deliciosa pura, em saladas, vitaminas e sobremesas."
    },

    {
        nome: "Abacaxi",
        arquivo: "abacaxi.png",
        emoji: "🍍",
        cor: "#e0a900",
        categorias: ["tropical", "brasileira"],
        categoriaTexto: "Tropical",
        descricao: "Tem sabor doce e ácido e uma coroa que faz parecer que é o rei das frutas.",
        beneficios: "É refrescante e fornece vitamina C e outros nutrientes.",
        nutrientes: "Vitamina C, manganês, fibras e bromelina.",
        origem: "América do Sul.",
        epoca: "Pode ser encontrado durante o ano, com boa oferta no período quente.",
        curiosidade: "O abacaxi é formado pela união de várias pequenas flores da planta.",
        dica: "Experimente em cubos, sucos ou grelhado."
    },

    {
        nome: "Morango",
        arquivo: "morango.png",
        emoji: "🍓",
        cor: "#e53935",
        categorias: ["vermelha"],
        categoriaTexto: "Vermelha",
        descricao: "Pequeno, perfumado e famoso nas sobremesas.",
        beneficios: "É uma opção de fruta com vitamina C e fibras.",
        nutrientes: "Vitamina C, manganês, fibras e antioxidantes.",
        origem: "As variedades modernas surgiram a partir do cruzamento de espécies das Américas.",
        epoca: "No Brasil, costuma ter maior oferta nos meses mais frios.",
        curiosidade: "Os pequenos pontinhos do lado de fora são estruturas que carregam as sementes.",
        dica: "Lave somente antes de consumir para ajudar a conservar melhor."
    },

    {
        nome: "Pera",
        arquivo: "pera.png",
        emoji: "🍐",
        cor: "#9ccc65",
        categorias: [],
        categoriaTexto: "Doce e delicada",
        descricao: "Suave, doce e muito suculenta quando madura.",
        beneficios: "É uma boa maneira de incluir fibras e frutas na rotina.",
        nutrientes: "Fibras, vitamina C, cobre e potássio.",
        origem: "Europa e Ásia.",
        epoca: "A disponibilidade varia conforme a variedade e a região.",
        curiosidade: "Existem milhares de variedades de peras no mundo.",
        dica: "Pode ser comida pura, assada ou adicionada a saladas."
    },

    {
        nome: "Mamão",
        arquivo: "mamao.png",
        emoji: "🧡",
        cor: "#ff8a3d",
        categorias: ["tropical"],
        categoriaTexto: "Tropical",
        descricao: "Macio, aromático e muito comum no café da manhã.",
        beneficios: "Fornece fibras e nutrientes importantes para uma alimentação equilibrada.",
        nutrientes: "Vitaminas A e C, folato, fibras e potássio.",
        origem: "América Tropical.",
        epoca: "Encontrado durante praticamente todo o ano.",
        curiosidade: "Existem tipos menores, como o papaia, e maiores, como o formosa.",
        dica: "Experimente com algumas gotas de limão."
    },

    {
        nome: "Kiwi",
        arquivo: "kiwi.png",
        emoji: "🥝",
        cor: "#7cb342",
        categorias: [],
        categoriaTexto: "Exótica",
        descricao: "Por fora é peludinho; por dentro, verde e cheio de pequenas sementes.",
        beneficios: "É rico em vitamina C e adiciona variedade à alimentação.",
        nutrientes: "Vitamina C, vitamina K, fibras e potássio.",
        origem: "China.",
        epoca: "A oferta costuma ser maior no outono e inverno.",
        curiosidade: "Apesar de ser associado à Nova Zelândia, o kiwi tem origem chinesa.",
        dica: "Corte ao meio e coma a polpa com uma colher."
    },

    {
        nome: "Limão",
        arquivo: "limao.png",
        emoji: "🍋",
        cor: "#c0ca33",
        categorias: ["citrica"],
        categoriaTexto: "Cítrica",
        descricao: "Azedinho, aromático e muito utilizado em bebidas e receitas.",
        beneficios: "Ajuda a fornecer vitamina C e sabor aos alimentos.",
        nutrientes: "Vitamina C, flavonoides e pequenas quantidades de minerais.",
        origem: "Ásia.",
        epoca: "Diferentes variedades permitem boa disponibilidade ao longo do ano.",
        curiosidade: "No Brasil, o limão-taiti é um dos tipos mais consumidos.",
        dica: "Use algumas gotas para temperar frutas, saladas e pratos."
    },

    {
        nome: "Coco",
        arquivo: "coco.png",
        emoji: "🥥",
        cor: "#8d6e63",
        categorias: ["tropical"],
        categoriaTexto: "Tropical",
        descricao: "Uma fruta resistente por fora e cheia de possibilidades por dentro.",
        beneficios: "A polpa e a água possuem composições diferentes e podem fazer parte de uma alimentação variada.",
        nutrientes: "Minerais, fibras e gorduras presentes principalmente na polpa.",
        origem: "Regiões tropicais da Ásia e do Pacífico.",
        epoca: "Disponível durante boa parte do ano.",
        curiosidade: "O coco consegue boiar e viajar pelo mar antes de germinar em outro lugar.",
        dica: "Água de coco gelada e pedaços da polpa são formas simples de consumir."
    },

    {
        nome: "Goiaba",
        arquivo: "goiaba.png",
        emoji: "🟢",
        cor: "#e57373",
        categorias: ["tropical", "brasileira", "vermelha"],
        categoriaTexto: "Tropical",
        descricao: "Muito perfumada e com polpa que pode ser branca, rosada ou vermelha.",
        beneficios: "É uma excelente fonte de vitamina C e também fornece fibras.",
        nutrientes: "Vitamina C, fibras, vitamina A, potássio e antioxidantes.",
        origem: "América Tropical.",
        epoca: "Pode ter boas safras principalmente nos períodos mais quentes.",
        curiosidade: "A goiaba pode ter mais vitamina C por porção do que várias frutas cítricas.",
        dica: "Pode ser consumida com casca e sementes quando bem higienizada."
    },

    {
        nome: "Acerola",
        arquivo: "acerola.png",
        emoji: "🔴",
        cor: "#d32f2f",
        categorias: ["tropical", "brasileira", "vermelha"],
        categoriaTexto: "Tropical",
        descricao: "Pequena, vermelha e conhecida pelo sabor azedinho.",
        beneficios: "É famosa por fornecer grande quantidade de vitamina C.",
        nutrientes: "Vitamina C, vitamina A e compostos antioxidantes.",
        origem: "Américas tropicais.",
        epoca: "Pode produzir várias vezes ao ano em regiões quentes.",
        curiosidade: "Uma aceroleira pode produzir muitas pequenas frutas em uma única safra.",
        dica: "Pode ser usada fresca, em sucos ou em polpas congeladas."
    },

    {
        nome: "Caju",
        arquivo: "caju.png",
        emoji: "🟠",
        cor: "#ff7043",
        categorias: ["tropical", "brasileira"],
        categoriaTexto: "Brasileira",
        descricao: "Colorido, aromático e muito ligado à cultura brasileira.",
        beneficios: "Fornece vitamina C, fibras e outros nutrientes.",
        nutrientes: "Vitamina C, fibras, carotenoides e minerais.",
        origem: "Brasil.",
        epoca: "Mais comum durante a primavera e o verão em diversas regiões.",
        curiosidade: "A parte carnosa que comemos é o pedúnculo; a castanha é o verdadeiro fruto do cajueiro.",
        dica: "Pode ser consumido fresco ou utilizado em sucos."
    },

    {
        nome: "Pitaya",
        arquivo: "pitaya.png",
        emoji: "🐉",
        cor: "#ec407a",
        categorias: ["tropical", "vermelha"],
        categoriaTexto: "Fruta do dragão",
        descricao: "Por fora parece saída de um desenho; por dentro possui pequenas sementes pretas.",
        beneficios: "Fornece fibras, água, vitaminas e minerais.",
        nutrientes: "Fibras, vitamina C, magnésio e antioxidantes.",
        origem: "América Central e México.",
        epoca: "Maior oferta geralmente nos meses mais quentes.",
        curiosidade: "A pitaya também é chamada de fruta-do-dragão por causa de sua aparência.",
        dica: "Corte ao meio e retire a polpa com uma colher."
    },

    {
        nome: "Pêssego",
        arquivo: "pessego.png",
        emoji: "🍑",
        cor: "#ffab91",
        categorias: [],
        categoriaTexto: "Doce e aromático",
        descricao: "Tem casca delicada, perfume suave e polpa suculenta.",
        beneficios: "Ajuda a fornecer fibras, vitaminas e água.",
        nutrientes: "Vitaminas A e C, fibras e potássio.",
        origem: "China.",
        epoca: "No Brasil, aparece principalmente entre primavera e verão.",
        curiosidade: "O pêssego pertence à mesma família de frutas como ameixa e cereja.",
        dica: "Quando maduro, fica delicioso puro ou picado com outras frutas."
    },

    {
        nome: "Ameixa",
        arquivo: "ameixa.png",
        emoji: "🟣",
        cor: "#7e57c2",
        categorias: ["vermelha"],
        categoriaTexto: "Pequena e suculenta",
        descricao: "Pode ser vermelha, roxa, amarela ou quase preta.",
        beneficios: "Fornece fibras, vitaminas e compostos antioxidantes.",
        nutrientes: "Fibras, vitamina C, vitamina K e potássio.",
        origem: "Europa e Ásia.",
        epoca: "A fruta fresca tem maior oferta no verão.",
        curiosidade: "A ameixa também pode ser consumida seca, mudando bastante sua textura.",
        dica: "Experimente gelada e bem madura."
    },

    {
        nome: "Tangerina",
        arquivo: "tangerina.png",
        emoji: "🍊",
        cor: "#fb8c00",
        categorias: ["citrica"],
        categoriaTexto: "Cítrica",
        descricao: "Perfuma as mãos quando é descascada e se divide facilmente em gomos.",
        beneficios: "Fornece vitamina C, água e fibras.",
        nutrientes: "Vitamina C, vitamina A, fibras e potássio.",
        origem: "Ásia.",
        epoca: "Costuma ter maior oferta durante outono e inverno.",
        curiosidade: "Dependendo da região do Brasil, também pode ser chamada de mexerica ou bergamota.",
        dica: "É prática para levar em passeios e lanches."
    },

    {
        nome: "Abacate",
        arquivo: "abacate.png",
        emoji: "🥑",
        cor: "#689f38",
        categorias: ["tropical"],
        categoriaTexto: "Cremosa",
        descricao: "Uma fruta diferente, com textura cremosa e sabor suave.",
        beneficios: "Fornece fibras e gorduras insaturadas que podem fazer parte de uma alimentação equilibrada.",
        nutrientes: "Fibras, folato, potássio, vitamina E e gorduras insaturadas.",
        origem: "México e América Central.",
        epoca: "Varia conforme a variedade, com oferta em diferentes meses do ano.",
        curiosidade: "Em alguns países ele é usado principalmente em receitas salgadas.",
        dica: "Experimente puro, em vitaminas ou em preparações salgadas."
    },

    {
        nome: "Jabuticaba",
        arquivo: "jabuticaba.png",
        emoji: "🟣",
        cor: "#5e356b",
        categorias: ["brasileira", "vermelha"],
        categoriaTexto: "Brasileira",
        descricao: "Uma pequena fruta escura que cresce diretamente no tronco da árvore.",
        beneficios: "Fornece fibras e compostos presentes principalmente em sua casca.",
        nutrientes: "Fibras, vitamina C e antocianinas.",
        origem: "Brasil.",
        epoca: "A época varia conforme região e variedade, com safras geralmente concentradas.",
        curiosidade: "É comum ver o tronco da jabuticabeira completamente coberto de frutos.",
        dica: "Coma fresca e experimente também utilizar a casca em preparações."
    },

    {
        nome: "Melão",
        arquivo: "melao.png",
        emoji: "🍈",
        cor: "#aed581",
        categorias: ["tropical"],
        categoriaTexto: "Refrescante",
        descricao: "Doce, suave e com bastante água.",
        beneficios: "É refrescante e ajuda a variar o consumo de frutas.",
        nutrientes: "Água, vitamina C, potássio e carotenoides, dependendo da variedade.",
        origem: "África e sudoeste da Ásia.",
        epoca: "Encontrado durante boa parte do ano no Brasil.",
        curiosidade: "Existem melões de polpa branca, verde, amarela e alaranjada.",
        dica: "Fica ótimo gelado em cubinhos ou em saladas de frutas."
    },

    // ============================================
    // NOVAS FRUTAS
    // ============================================

    {
        nome: "Carambola",
        arquivo: "carambola.png",
        emoji: "⭐",
        cor: "#f4d03f",
        categorias: ["tropical"],
        categoriaTexto: "Tropical",
        descricao: "Amarela, suculenta e famosa pelo formato de estrela quando é cortada.",
        beneficios: "Ajuda a variar o consumo de frutas e fornece água, fibras e vitamina C.",
        nutrientes: "Vitamina C, fibras, potássio e compostos antioxidantes.",
        origem: "Sul e Sudeste da Ásia.",
        epoca: "No Brasil, pode produzir em diferentes épocas do ano, principalmente em regiões quentes.",
        curiosidade: "Quando cortada de lado, suas fatias parecem pequenas estrelas.",
        dica: "Experimente bem madura, pura ou em saladas de frutas."
    },

    {
        nome: "Lichia",
        arquivo: "lichia.png",
        emoji: "🔴",
        cor: "#e85d75",
        categorias: ["tropical", "vermelha"],
        categoriaTexto: "Exótica",
        descricao: "Pequena por fora, clara por dentro e com sabor doce e perfumado.",
        beneficios: "Fornece vitamina C, água e compostos antioxidantes.",
        nutrientes: "Vitamina C, cobre, potássio e antioxidantes.",
        origem: "Sul da China e Sudeste da Ásia.",
        epoca: "No Brasil, costuma aparecer principalmente entre novembro e janeiro.",
        curiosidade: "A parte branca e suculenta fica escondida dentro de uma casca vermelha e áspera.",
        dica: "Retire a casca e o caroço antes de comer."
    },

    {
        nome: "Mangostão",
        arquivo: "mangostao.png",
        emoji: "🟣",
        cor: "#6c3483",
        categorias: ["tropical"],
        categoriaTexto: "Exótica",
        descricao: "Tem casca roxa grossa e uma polpa branca dividida em gomos.",
        beneficios: "Ajuda a diversificar a alimentação e fornece fibras e vitamina C.",
        nutrientes: "Fibras, vitamina C, manganês e compostos antioxidantes.",
        origem: "Sudeste da Ásia.",
        epoca: "A época de produção varia conforme o clima e a região de cultivo.",
        curiosidade: "É conhecido em alguns lugares como a rainha das frutas tropicais.",
        dica: "Abra a casca com cuidado e consuma apenas a polpa branca."
    },

    {
        nome: "Physalis",
        arquivo: "physalis.png",
        emoji: "🟠",
        cor: "#f5b041",
        categorias: ["tropical"],
        categoriaTexto: "Exótica",
        descricao: "Pequena, dourada e envolvida por uma delicada capa parecida com papel.",
        beneficios: "Fornece fibras, vitaminas e compostos antioxidantes.",
        nutrientes: "Vitamina C, vitamina A, fibras e carotenoides.",
        origem: "América do Sul.",
        epoca: "Pode ser encontrada em diferentes períodos conforme a região de cultivo.",
        curiosidade: "A fruta cresce protegida dentro de um cálice que parece uma pequena lanterna.",
        dica: "Retire a capa seca, lave bem e experimente a fruta inteira."
    },

    {
        nome: "Rambutan",
        arquivo: "rambutan.png",
        emoji: "🔴",
        cor: "#d63031",
        categorias: ["tropical", "vermelha"],
        categoriaTexto: "Exótica",
        descricao: "Tem uma casca cheia de pontinhas macias e uma polpa clara e suculenta.",
        beneficios: "Fornece água, vitamina C e outros nutrientes.",
        nutrientes: "Vitamina C, cobre, manganês e fibras.",
        origem: "Sudeste da Ásia.",
        epoca: "A produção é mais comum em períodos quentes e úmidos.",
        curiosidade: "Seu nome vem de uma palavra malaia relacionada a cabelo, por causa da aparência da casca.",
        dica: "Abra a casca, retire a polpa e tenha cuidado com a semente."
    },

    {
        nome: "Cacau",
        arquivo: "cacau.png",
        emoji: "🍫",
        cor: "#8d4f2b",
        categorias: ["tropical", "brasileira"],
        categoriaTexto: "Tropical",
        descricao: "Um fruto grande e colorido, com sementes envolvidas por uma polpa branca e adocicada.",
        beneficios: "A polpa fornece água e nutrientes, enquanto as sementes são a matéria-prima do chocolate.",
        nutrientes: "Fibras, minerais e compostos antioxidantes presentes principalmente nas sementes.",
        origem: "América Tropical.",
        epoca: "A colheita varia conforme a região e as condições de cultivo.",
        curiosidade: "O chocolate começa dentro desse fruto: suas sementes passam por várias etapas antes de virar cacau.",
        dica: "Se encontrar o fruto fresco, experimente a polpa branca que envolve as sementes."
    },

    {
        nome: "Açaí",
        arquivo: "acai.png",
        emoji: "🫐",
        cor: "#54245f",
        categorias: ["tropical", "brasileira"],
        categoriaTexto: "Brasileira",
        descricao: "Pequeno, roxo e muito ligado à cultura alimentar da região amazônica.",
        beneficios: "Fornece gorduras, fibras e compostos antioxidantes.",
        nutrientes: "Fibras, gorduras insaturadas, minerais e antocianinas.",
        origem: "Amazônia.",
        epoca: "A safra varia conforme a região, com períodos de maior produção ao longo do ano.",
        curiosidade: "O açaí nasce em grandes cachos no alto da palmeira conhecida como açaizeiro.",
        dica: "Experimente a polpa sem excesso de açúcar e combine com frutas."
    },

    {
        nome: "Cupuaçu",
        arquivo: "cupuacu.png",
        emoji: "🤎",
        cor: "#9b7653",
        categorias: ["tropical", "brasileira"],
        categoriaTexto: "Brasileira",
        descricao: "Fruto amazônico de aroma forte, polpa clara e sabor doce e azedinho.",
        beneficios: "Fornece fibras, vitaminas e minerais para uma alimentação variada.",
        nutrientes: "Fibras, vitamina C, minerais e compostos antioxidantes.",
        origem: "Amazônia.",
        epoca: "A produção costuma se concentrar no período chuvoso em áreas amazônicas.",
        curiosidade: "O cupuaçu é parente do cacau e suas sementes também podem ser usadas em preparações semelhantes ao chocolate.",
        dica: "A polpa fica ótima em sucos, cremes, sorvetes e sobremesas."
    },

    {
        nome: "Pitanga",
        arquivo: "pitanga.png",
        emoji: "🔴",
        cor: "#e53935",
        categorias: ["tropical", "brasileira", "vermelha"],
        categoriaTexto: "Brasileira",
        descricao: "Pequena, brilhante e cheia de gominhos, com sabor doce e levemente azedinho.",
        beneficios: "Ajuda a variar o consumo de frutas e fornece vitamina C e compostos antioxidantes.",
        nutrientes: "Vitamina C, vitamina A, fibras e carotenoides.",
        origem: "Brasil e outras regiões da América do Sul.",
        epoca: "A produção costuma ser maior entre primavera e verão.",
        curiosidade: "A pitanga muda de cor enquanto amadurece, passando por tons de verde, laranja e vermelho.",
        dica: "Experimente fresca, bem madura, ou em sucos e geleias."
    },

    {
        nome: "Graviola",
        arquivo: "graviola.png",
        emoji: "🟢",
        cor: "#7cb342",
        categorias: ["tropical", "brasileira"],
        categoriaTexto: "Tropical",
        descricao: "Grande, verde por fora e com polpa branca, macia e aromática.",
        beneficios: "Fornece fibras, vitamina C e outros nutrientes para uma alimentação variada.",
        nutrientes: "Vitamina C, fibras, potássio e magnésio.",
        origem: "América Tropical.",
        epoca: "Pode produzir em diferentes épocas do ano em regiões quentes.",
        curiosidade: "Apesar da casca cheia de pontas, sua polpa é macia e cremosa.",
        dica: "Retire as sementes antes de usar a polpa em sucos, vitaminas ou sobremesas."
    },

    {
        nome: "Jaca",
        arquivo: "jaca.png",
        emoji: "🟡",
        cor: "#d4a017",
        categorias: ["tropical", "brasileira"],
        categoriaTexto: "Tropical",
        descricao: "Uma fruta enorme, com casca grossa e vários gomos amarelos e aromáticos por dentro.",
        beneficios: "Fornece fibras, carboidratos, vitaminas e minerais.",
        nutrientes: "Fibras, vitamina C, potássio, magnésio e carotenoides.",
        origem: "Sul e Sudeste da Ásia.",
        epoca: "No Brasil, costuma ter maior oferta nos meses mais quentes.",
        curiosidade: "A jaca está entre os maiores frutos que crescem diretamente em árvores.",
        dica: "Consuma os gomos maduros ao natural ou use em doces e outras receitas."
    }
];


// ============================================
// ELEMENTOS
// ============================================

const gradeFrutas =
    document.getElementById("grade-frutas");

const campoPesquisa =
    document.getElementById("pesquisa-fruta");

const botoesFiltro =
    document.querySelectorAll(".filtro");

const nenhumResultado =
    document.getElementById("nenhum-resultado");

const contadorFrutas =
    document.getElementById("contador-frutas");

const modal =
    document.getElementById("modal-fruta");

const modalFundo =
    document.getElementById("modal-fundo");

const fecharModalBtn =
    document.getElementById("fechar-modal");

const btnFecharFinal =
    document.getElementById("btn-fechar-final");




let categoriaAtual = "todas";


// ============================================
// NORMALIZAR TEXTO
// ============================================

function normalizarTexto(texto) {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}


// ============================================
// CRIAR CARDS
// ============================================

function mostrarFrutas(lista) {

    gradeFrutas.innerHTML = "";

    contadorFrutas.textContent =
        `${lista.length} fruta${lista.length === 1 ? "" : "s"} para conhecer`;


    if (lista.length === 0) {

        nenhumResultado.style.display = "block";

        return;
    }


    nenhumResultado.style.display = "none";


    lista.forEach(fruta => {

        const card =
            document.createElement("button");

        card.classList.add("card-fruta");

        card.type = "button";

        card.style.setProperty(
            "--cor-fruta",
            fruta.cor
        );


        card.innerHTML = `

            <div class="imagem-fruta">

                <img
                    src="imagens/${fruta.arquivo}"
                    alt="${fruta.nome}"
                >

                <span class="emoji-fallback">
                    ${fruta.emoji}
                </span>

            </div>

            <div class="nome-fruta">
                ${fruta.nome}
            </div>

            <div class="ver-mais">
                Toque para conhecer
            </div>
        `;


        const imagem =
            card.querySelector("img");

        const emoji =
            card.querySelector(".emoji-fallback");


        imagem.addEventListener("error", () => {

            imagem.style.display = "none";

            emoji.style.display = "block";

        });


        card.addEventListener("click", () => {

            abrirFruta(fruta);

        });


        gradeFrutas.appendChild(card);

    });

}


// ============================================
// PESQUISA + FILTRO
// ============================================

function filtrarFrutas() {

    const pesquisa =
        normalizarTexto(
            campoPesquisa.value.trim()
        );


    const resultado =
        frutas.filter(fruta => {

            const nomeNormalizado =
                normalizarTexto(fruta.nome);


            const correspondePesquisa =
                nomeNormalizado.includes(pesquisa);


            const correspondeCategoria =
                categoriaAtual === "todas"
                ||
                fruta.categorias.includes(
                    categoriaAtual
                );


            return (
                correspondePesquisa
                &&
                correspondeCategoria
            );

        });


    mostrarFrutas(resultado);

}


// ============================================
// CAMPO DE BUSCA
// ============================================

campoPesquisa.addEventListener(
    "input",
    filtrarFrutas
);


// ============================================
// BOTÕES DOS FILTROS
// ============================================

botoesFiltro.forEach(botao => {

    botao.addEventListener("click", () => {

        botoesFiltro.forEach(b => {

            b.classList.remove("ativo");

        });


        botao.classList.add("ativo");


        categoriaAtual =
            botao.dataset.categoria;


        filtrarFrutas();

    });

});


// ============================================
// ABRIR FRUTA
// ============================================

function abrirFruta(fruta) {

    const imagem =
        document.getElementById("modal-imagem");

    const emoji =
        document.getElementById("modal-emoji");


    imagem.style.display = "block";

    emoji.style.display = "none";


    imagem.src =
        `imagens/${fruta.arquivo}`;

    imagem.alt =
        fruta.nome;


    emoji.textContent =
        fruta.emoji;


    imagem.onerror = () => {

        imagem.style.display = "none";

        emoji.style.display = "block";

    };


    document.getElementById(
        "modal-nome"
    ).textContent = fruta.nome;


    document.getElementById(
        "modal-categoria"
    ).textContent = fruta.categoriaTexto;


    document.getElementById(
        "modal-descricao"
    ).textContent = fruta.descricao;


    document.getElementById(
        "modal-beneficios"
    ).textContent = fruta.beneficios;


    document.getElementById(
        "modal-nutrientes"
    ).textContent = fruta.nutrientes;


    document.getElementById(
        "modal-origem"
    ).textContent = fruta.origem;


    document.getElementById(
        "modal-epoca"
    ).textContent = fruta.epoca;


    document.getElementById(
        "modal-curiosidade"
    ).textContent = fruta.curiosidade;


    document.getElementById(
        "modal-dica"
    ).textContent = fruta.dica;


    modal.classList.add("aberto");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


// ============================================
// FECHAR MODAL
// ============================================

function fecharModal() {

    modal.classList.remove("aberto");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


fecharModalBtn.addEventListener(
    "click",
    fecharModal
);


btnFecharFinal.addEventListener(
    "click",
    fecharModal
);


modalFundo.addEventListener(
    "click",
    fecharModal
);


// ESC fecha

document.addEventListener(
    "keydown",
    evento => {

        if (
            evento.key === "Escape"
            &&
            modal.classList.contains("aberto")
        ) {

            fecharModal();

        }

    }
);


// ============================================
// VOLTAR
// ============================================



// ============================================
// INICIAR
// ============================================

mostrarFrutas(frutas);



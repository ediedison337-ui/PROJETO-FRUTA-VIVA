# 🎨 CSS - Propriedades mais usadas

| Propriedade       | O que faz                          | Exemplo |
|-------------------|------------------------------------|---------|
| `color`           | Cor do texto                       | `color: white;` |
| `background`      | Cor de fundo                       | `background: green;` |
| `background-color`| Cor de fundo                       | `background-color: yellow;` |
| `width`           | Define a largura                   | `width: 200px;` |
| `height`          | Define a altura                    | `height: 150px;` |
| `margin`          | Espaço fora da caixa               | `margin: 20px;` |
| `padding`         | Espaço dentro da caixa             | `padding: 15px;` |
| `border`          | Cria uma borda                     | `border: 2px solid black;` |
| `border-radius`   | Arredonda os cantos                | `border-radius: 50%;` |
| `font-size`       | Tamanho da letra                   | `font-size: 24px;` |
| `font-family`     | Tipo da fonte                      | `font-family: Arial, sans-serif;` |
| `text-align`      | Alinha o texto                     | `text-align: center;` |
| `display`         | Define como o elemento se comporta | `display: flex;` |
| `gap`             | Espaço entre elementos             | `gap: 20px;` |
| `cursor`          | Muda o cursor do mouse             | `cursor: pointer;` |
| `box-shadow`      | Cria sombra                        | `box-shadow: 0 0 10px gray;` |
| `transition`      | Cria animações suaves              | `transition: 0.3s;` |
| `opacity`         | Transparência                      | `opacity: 0.8;` |
| `overflow`        | Controla conteúdo que passa da caixa | `overflow: hidden;` |
| `position`        | Posicionamento do elemento         | `position: absolute;` |


# 🧠 Macetes CSS

# = id (único)
Exemplo:
#menu

. = class (vários elementos)
Exemplo:
.fruta

width = largura

height = altura

padding = espaço DENTRO da caixa

margin = espaço FORA da caixa

border = borda

border-radius = arredonda os cantos

background = fundo

color = cor do texto

# ✨ CSS - Pseudoclasses mais usadas

| Pseudoclasse | O que faz | Exemplo |
|--------------|-----------|---------|
| `:hover` | Quando o mouse passa sobre o elemento | `.fruta:hover { background: yellow; }` |
| `:active` | Enquanto o botão do mouse está pressionado | `button:active { background: green; }` |
| `:focus` | Quando o elemento recebe foco | `input:focus { border: 2px solid blue; }` |
| `:link` | Link ainda não visitado | `a:link { color: blue; }` |
| `:visited` | Link já visitado | `a:visited { color: purple; }` |
| `:first-child` | Seleciona o primeiro filho | `li:first-child { color: red; }` |
| `:last-child` | Seleciona o último filho | `li:last-child { color: green; }` |
| `:nth-child()` | Seleciona um filho específico | `li:nth-child(2) { color: orange; }` |
| `:checked` | Checkbox ou Radio selecionado | `input:checked { background: green; }` |
| `:disabled` | Elemento desabilitado | `input:disabled { opacity: 0.5; }` |

---

## DOM (Árvore do Documento)

No VS Code, as linhas verticais da indentação ajudam a visualizar a estrutura do HTML.

Elas mostram a hierarquia dos elementos.

Exemplo:

body
└── div
    ├── h1
    └── p

body = ancestral

div = pai

h1 e p = filhos da div

h1 e p = irmãos


# 🧠 Macetes

| Símbolo | Significado | Exemplo |
|---------|-------------|---------|
| `:` | Pseudoclasse | `:hover` |
| `::` | Pseudoelemento | `::before` |

---

# 🎯 As que mais vou usar no Fruta Viva

| Pseudoclasse | Onde vou usar |
|--------------|---------------|
| `:hover` | Quando passar o mouse sobre a fruta |
| `:active` | Quando clicar no botão |
| `:first-child` | Primeiro item da lista |
| `:last-child` | Último item da lista |

---

# 📌 Lembrete

| Tecnologia | Função |
|------------|--------|
| HTML | Cria a estrutura |
| CSS | Deixa bonito |
| Pseudoclasses | Mudam a aparência quando algo acontece |
| JavaScript | Executa ações e lógica |

| Seletor | Significado            | Exemplo     |
| ------- | ---------------------- | ----------- |
| espaço  | Descendente            | `.card p`   |
| `>`     | Filho direto           | `.card > p` |
| `+`     | Irmão logo abaixo      | `h2 + p`    |
| `~`     | Todos os irmãos abaixo | `h2 ~ p`    |

🧠 Macete para decorar

Imagine uma família.

Pai
│
├── Filho
│
└── Neto
espaço = conversa com toda a família 👨‍👩‍👦
> = conversa só com os filhos 👦
+ = conversa com o irmão que está do lado 👬
~ = conversa com todos os irmãos abaixo 👨‍👦‍👦

Essa imagem mental costuma fazer a diferença na hora da prova.

| Pseudoelemento   | O que faz                          |
| ---------------- | ---------------------------------- |
| `::first-letter` | Estiliza apenas a primeira letra   |
| `::first-line`   | Estiliza apenas a primeira linha   |
| `::before`       | Insere conteúdo antes do elemento  |
| `::after`        | Insere conteúdo depois do elemento |

Pensa assim:

: (uma bolinha) → estado do elemento.
:: (duas bolinhas) → parte do elemento.

Ou seja:

:hover → quando acontece alguma ação.
::before → cria algo antes.
::after → cria algo depois.

| Conceito         | Função                                                  | Exemplo               |
| ---------------- | ------------------------------------------------------- | --------------------- |
| `:`              | Pseudoclasse: altera o estado do elemento               | `:hover`              |
| `::`             | Pseudoelemento: estiliza uma parte ou adiciona conteúdo | `::before`, `::after` |
| `::first-letter` | Estiliza apenas a primeira letra                        | Texto                 |
| `::first-line`   | Estiliza apenas a primeira linha                        | Texto                 |
| `::before`       | Adiciona conteúdo antes do elemento                     | Emoji antes do texto  |
| `::after`        | Adiciona conteúdo depois do elemento                    | Emoji depois do texto |

# 🟦 Grid - Colunas e Linhas

## Criar um Grid

```css
.container{
    display: grid;
}
```

Transforma o elemento em um Grid.

---

## 📏 grid-template-columns

Define quantas colunas o Grid terá.

```css
.container{
    display: grid;
    grid-template-columns: 200px 1fr;
}
```

Resultado:

```
┌─────────┬────────────────────┐
│ 200px   │        1fr         │
└─────────┴────────────────────┘
```

Outro exemplo:

```css
grid-template-columns: 1fr 1fr;
```

```
┌──────────┬──────────┐
│   1fr    │   1fr    │
└──────────┴──────────┘
```

Outro exemplo:

```css
grid-template-columns: 1fr 2fr 1fr;
```

```
┌──────┬────────────┬──────┐
│ 1fr  │    2fr     │ 1fr  │
└──────┴────────────┴──────┘
```

---

## 📐 grid-template-rows

Define quantas linhas o Grid terá.

```css
.container{
    display: grid;
    grid-template-rows: 100px 300px;
}
```

Resultado:

```
┌──────────────────────┐
│      100px           │
├──────────────────────┤
│      300px           │
└──────────────────────┘
```

Outro exemplo:

```css
grid-template-rows: 1fr 1fr;
```

Divide a altura igualmente entre duas linhas.

---

## 🧠 Resumindo

| Propriedade | Faz o quê? |
|-------------|------------|
| `display: grid;` | Transforma o elemento em Grid |
| `grid-template-columns` | Cria as colunas |
| `grid-template-rows` | Cria as linhas |

---

## 🍈 Como lembrar

**Columns = Colunas (Vertical)**

```
│   │   │
│   │   │
│   │   │
```

**Rows = Linhas (Horizontal)**

```
──────────────
──────────────
──────────────
```

---

## ✔ Dica da Iris

Antes de escrever o Grid, pergunte:

**"O que eu quero dividir?"**

- Quero dividir em colunas? → `grid-template-columns`
- Quero dividir em linhas? → `grid-template-rows`

Nunca use Grid só porque ele existe.
Use quando precisar organizar caixas.

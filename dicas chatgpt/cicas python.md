| Informação | Vou fazer contas? | Tipo    |
| ---------- | ----------------- | ------- |
| Nome       | ❌ Não             | `str`   |
| CPF        | ❌ Não             | `str`   |
| Telefone   | ❌ Não             | `str`   |
| E-mail     | ❌ Não             | `str`   |
| Idade      | ✅ Sim             | `int`   |
| Peso       | ✅ Sim             | `float` |
| Altura     | ✅ Sim             | `float` |
| Salário    | ✅ Sim             | `float` |


#💡 Regras de Ouro

- Variável guarda informações.
- input() sempre retorna texto.
- int() transforma texto em número inteiro.
- float() transforma texto em número decimal.
- Nem todo número deve ser armazenado como número.
- Pergunta mágica: "Vou fazer cálculos com isso?"

🟢 print()

Mostra na tela o valor que está dentro da variável.

🟢 Variável

Guarda um valor.

🟢 for

Repete um número conhecido de vezes.

🟢 range(início, fim, passo)

Começa aqui, para antes do fim e anda de passo em passo.

🟢 while

Enquanto a condição for verdadeira, continua repetindo.

| Comando | O que é? | Quando usar | Exemplo | Sua analogia |
|----------|----------|-------------|----------|--------------|
| print() | Exibe algo na tela | Mostrar informações | print("Olá") | 📺 Falar com o usuário |
| input() | Recebe um valor do usuário | Quando precisar que o usuário digite algo | nome = input("Nome: ") | 💬 Fazer uma pergunta |
| = | Atribuição | Guardar um valor | idade = 20 | 📦 Colocar algo dentro da caixa |
| if | Condição | Quando quiser verificar algo | if idade >= 18: | 🚪 Porta: entra ou não entra |
| elif | Outra condição | Quando a primeira condição for falsa | elif idade >= 16: | 🚦 Segunda opção |
| else | Caso contrário | Quando nenhuma condição for verdadeira | else: | ❌ Última alternativa |
| and | Todas as condições devem ser verdadeiras | Verificar duas ou mais condições | idade >=18 and tem_cnh | 🤝 Os dois precisam concordar |
| or | Apenas uma condição precisa ser verdadeira | Quando basta uma condição | admin or gerente | 🔑 Uma chave já abre |
| while | Repetição com condição | Enquanto algo for verdadeiro | while x < 10: | 🔄 Continua trabalhando |
| for | Percorrer elementos | Listas, textos, range | for fruta in frutas: | 🚶 Passar por cada item |
| range() | Criar sequência | Repetições numéricas | range(1,11) | 🔢 Contador |
| % | Resto da divisão | Descobrir par, ímpar, múltiplos | numero % 2 == 0 | ⚖️ Ver o que sobrou |
| [] | Lista | Guardar vários valores | frutas = [] | 📦 Caixa com vários objetos |
| append() | Adicionar item | Colocar novo item na lista | frutas.append("Maçã") | ➕ Colocar mais uma fruta na caixa |
| def | Criar uma função | Quando uma tarefa será reutilizada | def mostrar_fruta(): | 👷 Criar um funcionário |
| () | Parâmetros | Receber informações | def mostrar(nome): | 📥 Entregar informações ao funcionário |
| return | Devolver um resultado | Quando a função precisa responder algo | return soma | 📤 Funcionário devolvendo o resultado |

Usuário

↓

input()

↓

Variável

↓

if

↓

for

↓

def

↓

return

↓

print()

| Problema                      | O que procurar |
| ----------------------------- | -------------- |
| Preciso guardar algo          | Variável       |
| Preciso perguntar algo        | input()        |
| Preciso decidir               | if             |
| Preciso repetir               | for / while    |
| Tenho vários dados            | Lista          |
| Vou reutilizar código         | def            |
| Preciso devolver um resultado | return         |

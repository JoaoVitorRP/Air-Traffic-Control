# Sistema de controle de tráfego aéreo

O objetivo geral deste trabalho é criar um sistema que auxilie os pilotos na montagem de seus planos de voo. Para tanto, o sistema é capaz de listar as rotas disponíveis para o deslocamento de um ponto a outro em uma determinada data e horário, além de ser capaz de validar os planos de voo submetidos pelos pilotos.<br>

Este programa faz uso das tecnologias: `NodeJS` e `JavaScript`

# Inicialização

Para começar a utilizar o programa, primeiramente será necessário abrir a pasta do programa no VSCode.<br>
Após isso, abra o terminal e execute o comando `npm i` para instalar as dependências.<br>
Tendo tudo instalado, basta executar o comando `node app.js` para rodar o programa no console.

# Funções

Ao rodar o programa, você irá se deparar com uma lista de funções disponíveis:<br>

<ol>
    <li>Listar todos os pilotos disponíveis ➡ mostra no console todos os pilotos que estão cadastrados no sistema
    <li> Buscar por um piloto através de sua matrícula ➡ ao digitar uma matrícula no console, o sistema busca por esse piloto e mostra o resultado no console ➡ Exemplo de matrícula válida: 9S5T1U4V
    <li> Listar todas as aeronaves ➡ mostra no console todas as aeronaves que estão cadastradas no sistema
    <li> Buscar por uma aerovia através da origem e destino ➡ ao digitar a sigla de um aeroporto de origem e de um de destino, o sistema busca por essa aerovia e mostra o resultado no console ➡ Exemplo de aerovia válida: origem POA e destino FLO
    <li> Verificar as altitudes livres de uma aerovia ➡ ao digitar o id da aerovia desejada, a data e a hora de consulta, mostra no console as altitudes livres para essa solicitação
    <li> Verificar se uma aerovia está ocupada para um determinado slot de tempo ➡ ao digitar o id da aerovia desejada, uma data para consulta, um slot e uma altitude, o sistema verifica se esse slot específico está livre e retorna uma mensagem dizendo o status
    <li> Validar um plano de voo ➡ serão solicitados vários campos referentes ao plano de voo ➡ o sistema faz a <a href="#validações-do-plano-de-voo"> validação</a> deles e, caso esteja tudo correto, registra esse plano e retorna com uma mensagem confirmando
    <li> Buscar um plano de voo através de seu id ➡ ao digitar o id do plano, o sistema faz a busca por esse plano e o retorna caso encontre
</ol>

O programa irá pedir para selecionar uma das opções. Basta digitar o número da opção correspondente quando solicitado e o sistema irá retornar com o que foi pedido. Os resultados serão mostrados no console.<br>
Caso seja necessário passsos adicionais (por exemplo, um número de matrícula para buscar pelo piloto), o programa irá solicitar. Basta seguir as instruções e escrever no terminal o que é pedido.

# Observações adicionais

O programa consta com alguns casos de erro e mensagens personalizadas para cada um deles. Caso deseje testá-los, é possível provocar erros, como por exemplo:

<ul>
    <li> Comentar alguma das funções que geram os mocks ➡ quando solicitados os dados correspondentes àquele mock, o programa retornará com Not Found
    <li> Buscar por um dado que não existe ou solicitar o uso de dados que não existem ➡ o programa retorna com Not Found ➡ Exemplo: solicitar um piloto através de uma matrícula não existente
    <li> Tentar adicionar à classe de Serviço uma instância que não a pertence ➡ o programa retorna com Bad Request
    <li> Mandar algum tipo de dado errado nos argumentos de funções ➡ gerará um erro através da utilização da biblioteca bycontract
    <li> Selecionar uma opção que não seja um número válido ➡ o programa pede que uma opção seja inserida novamente
    <li> Fazer alguma solicitação inválida (porém que existe) no plano de voo ➡ o programa retorna com Bad Request ➡ Exemplo: solicitar um piloto com a matrícula inativa
</ul>

# Validações do plano de voo

Durante a criação do plano de voo, programa irá validar se:

<ul>
    <li> O piloto existe
    <li> A habilitação do piloto está ativa
    <li> A aerovia solicitada existe
    <li> A aeronave solicitada existe
    <li> A aeronave solicitada possui autonomia 10% maior que o tamanho da via
    <li> A altitude solicitada é compátivel com a aeronave
    <li> O horário solicitado é válido para o tipo de aeronave
    <li> A data solicitada não é uma data passada
    <li> O slot de horário solicitado é um número no intervalo válido (entre 00h e 23h)
    <li> O slot solicitado já se encontra ocupado
    <li> O plano de voo a ser adicionado no array de planos é consistente (se é uma instância da classe PlanoDeVoo)
</ul>

<h3>Obrigado e faça bom uso!</h3>

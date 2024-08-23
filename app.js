import {
  AeronaveCarga,
  AeronaveParticular,
  AeronavePassageiros,
  Aerovia,
  Piloto,
  ServicoAeronaves,
  ServicoAerovias,
  ServicoPilotos,
} from "./classes/index.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync({ sigint: true });

//Inicializa todas as classes de serviço
const servicoPilotos = new ServicoPilotos();
const servicoAeronaves = new ServicoAeronaves();
const servicoAerovias = new ServicoAerovias();

//Cria os pilotos
function mockPilots() {
  servicoPilotos.criar(new Piloto("A3B5C7D9", "João Silva", true));
  servicoPilotos.criar(new Piloto("2F8G1H4J", "Maria Santos", false));
  servicoPilotos.criar(new Piloto("5K1L6M9N", "Pedro Oliveira", true));
  servicoPilotos.criar(new Piloto("7O3P8Q2R", "Ana Costa", false));
  servicoPilotos.criar(new Piloto("9S5T1U4V", "Carlos Almeida", true));
  servicoPilotos.criar(new Piloto("1W6X7Y8Z", "Juliana Pereira", true));
  servicoPilotos.criar(new Piloto("3A4B5C6D", "Luiz Rodrigues", false));
  servicoPilotos.criar(new Piloto("5E6F7G8H", "Rafaela Fernandes", true));
  servicoPilotos.criar(new Piloto("7I8J9K1L", "José Lima", true));
  servicoPilotos.criar(new Piloto("9M1N2O3P", "Paulo Souza", true));
}

//Cria as aeronaves
function mockAircrafts() {
  servicoAeronaves.criarAeronaveParticular(new AeronaveParticular("PR-XYZ123", 200, 1200, "AeroServiços"));
  servicoAeronaves.criarAeronaveParticular(new AeronaveParticular("PT-ABC456", 220, 1400, "AeroServiços"));
  servicoAeronaves.criarAeronaveCarga(new AeronaveCarga("PR-ABC", 850, 3900, "AeroCarga", 85000));
  servicoAeronaves.criarAeronaveCarga(new AeronaveCarga("PT-XYZ", 890, 7400, "AeroLogística", 65000));
  servicoAeronaves.criarAeronavePassageiros(new AeronavePassageiros("PR-DEF", 840, 5900, "XYZ Airlines", 180));
  servicoAeronaves.criarAeronavePassageiros(new AeronavePassageiros("PR-GHI", 850, 5700, "XYZ Airlines", 189));
  servicoAeronaves.criarAeronavePassageiros(new AeronavePassageiros("PT-JKL", 820, 3800, "ABC Airlines", 100));
}

//Cria as aerovias
function mockAirways() {
  servicoAerovias.criar(new Aerovia("R1", "POA", "FLO", 376));
  servicoAerovias.criar(new Aerovia("R2", "POA", "GRU", 853));
  servicoAerovias.criar(new Aerovia("R3", "GRU", "POA", 853));
  servicoAerovias.criar(new Aerovia("R4", "FLO", "CWB", 252));
  servicoAerovias.criar(new Aerovia("R5", "CWB", "FLO", 252));
  servicoAerovias.criar(new Aerovia("R6", "CWB", "GRU", 339));
  servicoAerovias.criar(new Aerovia("R7", "GRU", "CWB", 339));
  servicoAerovias.criar(new Aerovia("R8", "FLO", "POA", 376));
  servicoAerovias.criar(new Aerovia("R9", "POA", "FLO", 390));
}

//Chama todas as funções para que as instâncias sejam de fato criadas
mockPilots();
mockAircrafts();
mockAirways();

//Mostra no console todos os pilotos
function showPilots() {
  for (let pilot of servicoPilotos.todos()) {
    console.log(pilot.toString());
  }
}

//Mostra no console um piloto específico
function findPilot(matricula) {
  let pilot = servicoPilotos.recupera(matricula);

  console.log(pilot.toString());
}

//Mostra no console todas as aeronaves
function showAircrafts() {
  for (let aircraft of servicoAeronaves.todas()) {
    console.log("{");
    console.log(aircraft.toString());
    console.log("},");
  }
}

//Mostra no console uma aerovia específica
function findAirway(origem, destino) {
  let foundAirways = servicoAerovias.recupera(origem, destino);

  for (let airway of foundAirways) {
    console.log(airway.toString());
  }
}

//Aqui inicia o programa de fato
let option = "";

console.log("Bem-vindo(a)! Através desse programa você poderá montar seu plano de voo (WIP).");
console.log("Para iniciar, selecione uma das opções:");

//Mostra as opções de funções do programa
function showOptions() {
  console.log("> 1. Listar todos os pilotos disponíveis;");
  console.log("> 2. Buscar por um piloto através de sua matrícula;");
  console.log("> 3. Listar todas as aeronaves;");
  console.log("> 4. Buscar por uma aerovia através da origem e destino;");
  console.log("> 5. Encerrar a execução do programa.");
  option = prompt("Insira o número da opção desejada: ");

  //Se o número inserido não for válido, o programa pede para inserir um número válido
  if (Number(option) < 1 || Number(option) > 5) {
    console.log("\nNúmero inválido! Por favor, selecione uma das opções:");
    showOptions();
  }
}

showOptions();

//Caso o número seja válido (e diferente de 5), o programa executa as funções de acordo com o selecionado
while (Number(option) >= 1 && Number(option) <= 4) {
  console.log("");

  //Para cada uma das opções, chama a respectiva função
  //Caso seja encontrado um erro, mostra no console a mensagem de erro
  switch (Number(option)) {
    case 1:
      try {
        console.log("\nAqui está uma lista de todos os pilotos em nosso sistema:\n");
        showPilots();
      } catch (err) {
        console.log(`Erro: ${err.message}`);
      }

      break;
    case 2:
      const matricula = prompt("> Insira a matrícula do piloto: ");

      try {
        console.log("\nAqui está o piloto solicitado:\n");
        findPilot(matricula);
      } catch (err) {
        console.log(`Erro: ${err.message}`);
      }

      break;
    case 3:
      try {
        console.log("\nAqui está uma lista de todas as aeronaves em nosso sistema:\n");
        showAircrafts();
      } catch (err) {
        console.log(`Erro: ${err.message}`);
      }

      break;
    case 4:
      const origem = prompt("> Insira a sigla do aeroporto de origem: ");
      const destino = prompt("> Insira a sigla do aeroporto de destino: ");

      try {
        console.log("\nAqui está a aerovia solicitada:\n");
        findAirway(origem, destino);
      } catch (err) {
        console.log(`Erro: ${err.message}`);
      }

      break;
  }

  //Permite escolher uma opção novamente
  console.log("\nPara continuar, selecione uma das opções:");
  showOptions();
}

//Caso o número seja 5, encerra o programa com essa mensagem
console.log("\nObrigado! Encerrando programa...");

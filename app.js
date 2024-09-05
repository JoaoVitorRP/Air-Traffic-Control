import {
  AeronaveCarga,
  AeronaveParticular,
  AeronavePassageiros,
  Aerovia,
  OcupacaoAerovia,
  Piloto,
  PlanoDeVoo,
  ServicoAeronaves,
  ServicoAerovias,
  ServicoPilotos,
  ServicoPlanos,
} from "./classes/index.js";
import PromptSync from "prompt-sync";
import { BadRequestError } from "./errors/BadRequestError.js";

const prompt = PromptSync({ sigint: true });

//Inicializa todas as classes de serviço
const servicoPilotos = new ServicoPilotos();
const servicoAeronaves = new ServicoAeronaves();
const servicoAerovias = new ServicoAerovias();
const ocupacaoAerovia = new OcupacaoAerovia();
const servicoPlanos = new ServicoPlanos();

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

//Mostra no console uma aerovia específica
function findFreeHeights(airwayId, date) {
  servicoAerovias.recuperaPorId(airwayId);

  date = new Date(date);

  const foundHeights = ocupacaoAerovia.altitudesLivres(airwayId, date);

  console.log(foundHeights);
}

//Verifica se uma aerovia está ocupada para um slot de tempo em uma data
function findFreeSlot(airwayId, date, altitude, slot) {
  servicoAerovias.recuperaPorId(airwayId);

  date = new Date(date);

  const airwayOcupation = ocupacaoAerovia.isOcupada(airwayId, date, altitude, slot);

  return airwayOcupation;
}

//Verifica se um piloto é válido
function validatePilot(pilotRegistration) {
  //Verifica se o piloto soclitiado existe
  pilotRegistration = pilotRegistration.toUpperCase();
  const pilot = servicoPilotos.recupera(pilotRegistration);

  //Verifica se a habilitação do piloto solicitado está ativa
  if (!pilot.habilitacaoAtiva) {
    throw new BadRequestError("A habilitação deste piloto não está ativa!");
  }
}

//Verifica se a aerovia solicitada existe
function validateAirway(id) {
  id = id.toUpperCase();
  const airway = servicoAerovias.recuperaPorId(id);

  return airway;
}

//Valida a aeronave
function validateAircraft(aircraftPrefix, airway) {
  const aircraft = servicoAeronaves.recupera(aircraftPrefix);

  //Verifica se a autonomia da aeronave é 10% maior que o tamanho da aerovia
  if (aircraft.autonomia < 1.1 * airway.tamanho) {
    throw new BadRequestError("A aeronave não possui autonomia para fazer este trecho!");
  }

  return aircraft;
}

//Valida a altitude
function validateAltitude(aircraft, altitude) {
  //Caso seja uma aeronave de passageiros, verifica se a altitude é válida
  if (aircraft instanceof AeronavePassageiros && (altitude < 28000 || altitude > 35000)) {
    throw new BadRequestError("Aeronaves de passageiro devem voar entre 28000 e 35000 pés!");
  }

  //Caso seja uma aeronave particular, verifica se a altitude é válida
  if (aircraft instanceof AeronaveParticular && (altitude < 25000 || altitude > 27000)) {
    throw new BadRequestError("Aeronaves particulares devem voar entre 25000 e 27000 pés!");
  }

  //Caso seja uma aeronave de carga, verifica se a altitude é válida
  if (aircraft instanceof AeronaveCarga && (altitude < 25000 || altitude > 35000)) {
    throw new BadRequestError("Aeronaves de carga devem voar entre 25000 e 35000 pés!");
  }
}

//Reserva um slot
function reserveSlots(aircraft, airwayId, flightDate, arrivalDate, altitude) {
  //Adiciona uma hora ao arrivalDate
  //Isso irá permitir que o loop inclua o arrivalDate
  arrivalDate = new Date(arrivalDate.getTime() + 3600000);

  //Obtém apenas a hora do voo e da chegada
  const flightHour = flightDate.getHours();
  const arrivalHour = arrivalDate.getHours();

  //Obtém apenas o dia, mês e ano do voo
  let flightDay = flightDate.toISOString();
  flightDay = flightDay.split("T")[0];

  //A data atual inicial do slot será sempre o dia do voo, com a hora redonda
  let currentDate = new Date(`${flightDay}T${flightHour}:00:00`);

  //Faz um loop entre a hora do voo e a hora de chegada
  //Em cada iteração, adiciona o slot no array de slots
  let slots = [];
  for (let slot = flightHour; slot !== arrivalHour; slot++) {
    //Caso tenha passado das 23h, signifca que virou o dia
    //Portanto, reseta o slot para 0
    //Como trocou o dia, troca também a data atual do slot para um dia a mais
    if (slot > 23) {
      slot = 0;
      currentDate = new Date(currentDate.getTime() + 86400000);
    }

    //Caso seja uma aeronave de carga, verifica se o horário é válido
    if (aircraft instanceof AeronaveCarga && (slot < 0 || slot > 6)) {
      throw new BadRequestError("Aeronaves de carga devem voar entre 00h e 06h!");
    }

    //Tenta reservar o slot
    ocupacaoAerovia.ocupa(airwayId, currentDate, Number(altitude), slot);

    //Adiciona uma hora a data atual, para a próxima iteração
    currentDate = new Date(currentDate.getTime() + 3600000);

    slots.push(slot);
  }

  return slots;
}

//Busca um plano de voo pelo id
function findPlanById(id) {
  const plan = servicoPlanos.recupera(Number(id));

  console.log(plan.toString());
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
  console.log("> 5. Verificar as altitudes livres de uma aerovia;");
  console.log("> 6. Verificar se uma aerovia está ocupada para um determinado slot de tempo;");
  console.log("> 7. Validar um plano de voo;");
  console.log("> 8. Buscar um plano de voo através de seu id;");
  console.log("> 0. Encerrar a execução do programa.");
  option = prompt("Insira o número da opção desejada: ");

  //Se o número inserido não for válido, o programa pede para inserir um número válido
  if (Number(option) < 0 || Number(option) > 8) {
    console.log("\nNúmero inválido! Por favor, selecione uma das opções:");
    showOptions();
  }
}

showOptions();

//Caso o número seja válido (e diferente de 0), o programa executa as funções de acordo com o selecionado
while (Number(option) >= 1 && Number(option) <= 8) {
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

    case 5:
      const airwayIdFreeHeight = prompt("> Insira o id da aerovia desejada: ");

      console.log("\nMuito bem, agora será necessário inserir a data para consulta!\n");

      const dateFreeHeight = prompt("> Insira a data no formato 'YYYY-MM-DD': ");
      const hourFreeHeight = prompt("> Insira a hora para consulta no formato 'HH': ");

      try {
        console.log("\nAqui estão as altitudes livres da aerovia e horário solicitados:\n");

        findFreeHeights(airwayIdFreeHeight, `${dateFreeHeight}T${hourFreeHeight}:00:00`);
      } catch (err) {
        console.log(`Erro: ${err.message}`);
      }

      break;

    case 6:
      const airwayIdSlotFree = prompt("> Insira o id da aerovia desejada: ");

      console.log("\nMuito bem, agora será necessário inserir a data para consulta!\n");

      const dateSlotFree = prompt("> Insira a data no formato 'YYYY-MM-DD': ");

      console.log("");
      const slotFree = prompt("> Insira para qual slot de horário você deseja verificar (apenas o número): ");

      const altitudeSlotFree = prompt("> Insira para qual altitude você deseja verificar: ");

      try {
        const isOcupied = findFreeSlot(
          airwayIdSlotFree,
          `${dateSlotFree}T${slotFree}:00:00`,
          Number(altitudeSlotFree),
          Number(slotFree)
        );

        if (isOcupied) {
          console.log("O slot está ocupado!");
        } else {
          console.log("O slot está livre!");
        }
      } catch (err) {
        console.log(`Erro: ${err.message}`);
      }

      break;

    case 7:
      try {
        const pilotRegistration = prompt("> Insira a matrícula do piloto: ");
        validatePilot(pilotRegistration);

        const airwayId = prompt("> Insira o id da aerovia: ");
        const airway = validateAirway(airwayId);

        const aircraftPrefix = prompt("> Insira o prefixo da aeronave: ");
        const aircraft = validateAircraft(aircraftPrefix, airway);

        const altitude = prompt("> Insira a altitude que deseja ocupar: ");
        validateAltitude(aircraft, altitude);

        //Calcula o tempo tomado em minutos
        const timeTaken = 60 * (airway.tamanho / aircraft.velocidadeCruzeiro);

        const dateFlightPlan = prompt("> Insira a data no formato 'YYYY-MM-DD': ");
        const hourFlightPlan = prompt("> Insira a hora e os minutos no formato 'HH:MM': ");

        //Cria um objeto no formato Date para a data inserida
        const dateFlight = new Date(`${dateFlightPlan}T${hourFlightPlan}:00`);
        //Calcula a data que o voo irá ser finalizado e cria um objeto no formato Date
        const finalDate = new Date(dateFlight.getTime() + timeTaken * 60000);

        const slots = reserveSlots(aircraft, airwayId, dateFlight, finalDate, altitude);

        servicoPlanos.consiste(
          new PlanoDeVoo(pilotRegistration, aircraftPrefix, airwayId, dateFlight, Number(altitude), slots)
        );

        console.log("Plano de voo criado!");
      } catch (err) {
        console.log(`Erro: ${err.message}`);
      }

      break;

    case 8:
      try {
        const planId = prompt("> Insira o id do plano a ser consultado: ");

        findPlanById(planId);
      } catch (err) {
        console.log(`Erro: ${err.message}`);
      }

      break;
  }

  //Permite escolher uma opção novamente
  console.log("\nPara continuar, selecione uma das opções:");
  showOptions();
}

//Caso o número seja 0, encerra o programa com essa mensagem
console.log("\nObrigado! Encerrando programa...");

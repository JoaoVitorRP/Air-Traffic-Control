import { Aerovia } from "./Aerovia.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { validate } from "bycontract";

//Classe ServicoAerovias, responsável pelas funções de serviço
export class ServicoAerovias {
  #aerovias;

  //Construtor da classe, inicia a propriedade aerovias como um array vazio
  constructor() {
    this.#aerovias = [];
  }

  //Método que insere uma aerovia no array #aerovias
  criar(aerovia) {
    //Caso o argumento não seja uma instância de Aerovia, o programa retorna um erro
    if (!aerovia instanceof Aerovia) {
      throw new BadRequestError("O argumento não pertence à classe Aerovia!");
    }

    //Caso esteja tudo certo, o programa cria essa entrada no array e retorna true
    this.#aerovias.push(aerovia);

    return true;
  }

  //Método que retorna uma certa aerovia através de sua origem e destino
  recupera(origem, destino) {
    validate(arguments, ["string", "string"]);

    //Transforma os argumentos em caixa alta para evitar erros por digitação
    origem = origem.toUpperCase();
    destino = destino.toUpperCase();

    //Caso não haja nenhuma entrada no array, retorna um erro
    if (this.#aerovias.length <= 0) {
      throw new NotFoundError("Não há aerovias em nosso registro!");
    }

    //Itera pelo array #aerovias
    //Quando acha uma aerovia com essa origem e destino, a adiciona em outro um array
    let foundAirways = [];
    for (let aerovia of this.#aerovias) {
      if (aerovia.origem === origem && aerovia.destino === destino) {
        foundAirways.push(aerovia);
      }
    }

    //Caso não seja encontrada nenhuma aerovia que coincide com essa origem e destino, retorna um erro
    if (foundAirways.length === 0) {
      throw new NotFoundError("Aerovia não encontrada!");
    }

    return foundAirways;
  }

  //Método que retorna uma aerovia através de seu id
  recuperaPorId(id) {
    validate(id, "string");

    //Transforma os argumentos em caixa alta para evitar erros por digitação
    id = id.toUpperCase();

    //Itera pelo array #aerovias
    //Quando acha uma aerovia com esse id, retorna essa entrada
    for (let aerovia of this.#aerovias) {
      if (aerovia.id === id) {
        return aerovia;
      }
    }

    //Caso não seja encontrado nenhuma aerovia que coincide com esse id, retorna um erro
    throw new NotFoundError("Aerovia não encontrada!");
  }
}

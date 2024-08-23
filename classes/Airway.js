import { validate } from "bycontract";
import { BadRequestError, NotFoundError } from "../errors/index.js";

//Classe Aerovia
export class Aerovia {
  #id;
  #origem;
  #destino;
  #tamanho;

  //Construtor da classe, verifica se os argumentos estão no tipo certo e os associa com suas respectivas propriedades
  constructor(id, origem, destino, tamanho) {
    validate(arguments, ["string", "string", "string", "number"]);

    this.#id = id;
    this.#origem = origem;
    this.#destino = destino;
    this.#tamanho = tamanho;
  }

  //Método que retorna a origem
  get origem() {
    return this.#origem;
  }

  //Método que retorna o destino
  get destino() {
    return this.#destino;
  }

  //Método que retorna os valores da classe em formato string
  toString() {
    return `    {
      id: ${this.#id},
      origem: ${this.#origem},
      destino: ${this.#destino},
      tamanho: ${this.#tamanho},    
    }`;
  }
}

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
}

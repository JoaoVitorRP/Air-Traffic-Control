import { validate } from "bycontract";

//Classe PlanoDeVoo
export class PlanoDeVoo {
  #id;
  #matricPiloto;
  #prefixoAeronave;
  #idAerovia;
  #data;
  #altitude;
  #slots;
  #cancelado;

  //Inicia um gerador de ids;
  static #idGen = 0;

  //Construtor da classe, verifica se os argumentos estão no tipo certo e os associa com suas respectivas propriedades
  //Também adiciona +1 ao gerador de id e associa o plano a esse id
  constructor(matricPiloto, prefixoAeronave, idAerovia, data, altitude, slots, cancelado = false) {
    validate(arguments, ["string", "string", "string", "Date", "number", "Array.<number>"]);

    PlanoDeVoo.#idGen++;
    this.#id = PlanoDeVoo.#idGen;
    this.#matricPiloto = matricPiloto;
    this.#prefixoAeronave = prefixoAeronave;
    this.#idAerovia = idAerovia;
    this.#data = data;
    this.#altitude = altitude;
    this.#slots = slots;
    this.#cancelado = cancelado;
  }

  //Métodos que retornam o id, matrícula do piloto, prefixo da aeronave, id da aerovia, data, altitude e slots
  get id() {
    return this.#id;
  }

  get matricPiloto() {
    return this.#matricPiloto;
  }

  get prefixoAeronave() {
    return this.#prefixoAeronave;
  }

  get idAerovia() {
    return this.#idAerovia;
  }

  get data() {
    return this.#data;
  }

  get altitude() {
    return this.#altitude;
  }

  get slots() {
    return this.#slots;
  }

  //Método que retorna os valores da classe em formato string
  toString() {
    return `      id: ${this.#id},
      matricPiloto: ${this.#matricPiloto},
      prefixoAeronave: ${this.#prefixoAeronave},
      idAerovia: ${this.#idAerovia},
      data: ${this.#data},
      altitude: ${this.#altitude},
      slots: [${this.#slots}],
      cancelado: ${this.#cancelado}`;
  }
}

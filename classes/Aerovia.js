import { validate } from "bycontract";

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

  //Métodos que retornam o id, origem, o destino e o tamanho
  get id() {
    return this.#id;
  }

  get origem() {
    return this.#origem;
  }

  get destino() {
    return this.#destino;
  }

  get tamanho() {
    return this.#tamanho;
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

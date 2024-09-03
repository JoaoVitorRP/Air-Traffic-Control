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

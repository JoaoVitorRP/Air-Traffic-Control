import { validate } from "bycontract";

//Classe Piloto
export class Piloto {
  #matricula;
  #nome;
  #habilitacaoAtiva;

  //Construtor da classe, verifica se os argumentos estão no tipo certo e os associa com suas respectivas propriedades
  constructor(matricula, nome, habilitacaoAtiva) {
    validate(arguments, ["string", "string", "boolean"]);

    this.#matricula = matricula;
    this.#nome = nome;
    this.#habilitacaoAtiva = habilitacaoAtiva;
  }

  //Método que retorna a matrícula
  get matricula() {
    return this.#matricula;
  }

  //Método que retorna se a habilitação está ativa
  get habilitacaoAtiva() {
    return this.#habilitacaoAtiva;
  }

  //Método que retorna os valores da classe em formato string
  toString() {
    return `    {
      matricula: ${this.#matricula},
      nome: ${this.#nome},
      habilitacaoAtiva: ${this.#habilitacaoAtiva},
    },`;
  }
}

import { Piloto } from "./Piloto.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { validate } from "bycontract";

//Classe ServicoPilotos, responsável pelas funções de serviço
export class ServicoPilotos {
  #pilotos;

  //Construtor da classe, inicia a propriedade pilotos como um array vazio
  constructor() {
    this.#pilotos = [];
  }

  //Método que insere um piloto no array #pilotos
  criar(piloto) {
    //Caso o argumento não seja uma instância de Piloto, o programa retorna um erro
    if (!piloto instanceof Piloto) {
      throw new BadRequestError("O argumento não pertence à classe Piloto!");
    }

    //Caso esteja tudo certo, o programa cria essa entrada no array e retorna true
    this.#pilotos.push(piloto);

    return true;
  }

  //Método que retorna todos os valores do array #pilotos
  todos() {
    //Caso não haja nenhuma entrada no array, retorna um erro
    if (this.#pilotos.length <= 0) {
      throw new NotFoundError("Não há pilotos em nosso registro!");
    }

    return this.#pilotos.values();
  }

  //Método que retorna um piloto através de sua matrícula
  recupera(matricula) {
    validate(matricula, "string");

    //Transforma os argumentos em caixa alta para evitar erros por digitação
    matricula = matricula.toUpperCase();

    //Itera pelo array #pilotos
    //Quando acha um piloto com essa matrícula, retorna essa entrada
    for (let piloto of this.#pilotos) {
      if (piloto.matricula === matricula) {
        return piloto;
      }
    }

    //Caso não seja encontrado nenhum piloto que coincide com essa matrícula, retorna um erro
    throw new NotFoundError("Piloto não encontrado!");
  }
}

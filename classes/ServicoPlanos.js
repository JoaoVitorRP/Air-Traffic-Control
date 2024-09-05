import { PlanoDeVoo } from "./PlanoDeVoo.js";
import { BadRequestError } from "../errors/BadRequestError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { validate } from "bycontract";

//Classe ServicoPlanos, responsável pelas funções de serviço
export class ServicoPlanos {
  #planos;

  //Construtor da classe, inicia a propriedade planos como um array vazio
  constructor() {
    this.#planos = [];
  }

  //Método que verifica se um plano consiste
  consiste(plano) {
    //Se o argumento não for uma instância da classe PlanoDeVoo, retorna um erro
    if (!(plano instanceof PlanoDeVoo)) {
      throw new BadRequestError("O argumento não pertence a classe PlanoDeVoo!");
    }

    //Se estiver tudo certo, adiciona esse plano no array de planos e retorna true
    this.#planos.push(plano);
    return true;
  }

  //Método que retorna um plano através de seu id
  recupera(id) {
    validate(id, "number");

    //Itera pelo array #planos
    //Quando acha um plano com esse id, retorna essa entrada
    for (let plano of this.#planos) {
      if (plano.id === id) {
        return plano;
      }
    }

    //Caso não seja encontrado nenhum plano que coincide com esse id, retorna um erro
    throw new NotFoundError("Plano não encontrado!");
  }
}

import { AeronavePassageiros, AeronaveCarga, AeronaveParticular } from "./Aeronave.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { validate } from "bycontract";

//Classe ServicoAeronaves, responsável pelas funções de serviço
export class ServicoAeronaves {
  #aeronaves;

  //Construtor da classe, inicia a propriedade aeronaves como um array vazio
  constructor() {
    this.#aeronaves = [];
  }

  //Método que insere uma AeronaveParticular no array #aeronaves
  criarAeronaveParticular(aeronave) {
    //Caso o argumento não seja uma instância de AeronaveParticular, retorna um erro
    if (!(aeronave instanceof AeronaveParticular)) {
      throw new BadRequestError("O argumento não pertence à classe AeronaveParticular!");
    }

    //Caso esteja tudo certo, o programa cria essa entrada no array e retorna true
    this.#aeronaves.push(aeronave);

    return true;
  }

  //Método que insere uma AeronaveCarga no array #aeronaves
  criarAeronaveCarga(aeronave) {
    //Caso o argumento não seja uma instância de AeronaveCarga, retorna um erro
    if (!(aeronave instanceof AeronaveCarga)) {
      throw new BadRequestError("O argumento não pertence à classe AeronaveCarga!");
    }

    //Caso esteja tudo certo, o programa cria essa entrada no array e retorna true
    this.#aeronaves.push(aeronave);

    return true;
  }

  //Método que insere uma AeronavePassageiros no array #aeronaves
  criarAeronavePassageiros(aeronave) {
    //Caso o argumento não seja uma instância de AeronavePassageiros, retorna um erro
    if (!(aeronave instanceof AeronavePassageiros)) {
      throw new BadRequestError("O argumento não pertence à classe AeronavePassageiro!");
    }

    //Caso esteja tudo certo, o programa cria essa entrada no array e retorna true
    this.#aeronaves.push(aeronave);

    return true;
  }

  //Método que retorna uma aeronave através de seu prefixo
  recupera(prefixo) {
    validate(prefixo, "string");

    //Transforma os argumentos em caixa alta para evitar erros por digitação
    prefixo = prefixo.toUpperCase();

    //Itera pelo array #aeronaves
    //Quando acha uma aeronave com esse prefixo, retorna essa entrada
    for (let aeronave of this.#aeronaves) {
      if (aeronave.prefixo === prefixo) {
        return aeronave;
      }
    }

    //Caso não seja encontrado nenhuma aeronave que coincide com esse prefixo, retorna um erro
    throw new NotFoundError("Aeronave não encontrada!");
  }

  //Método que retorna todos os valores do array #aeronaves
  todas() {
    //Caso não haja nenhuma entrada no array, retorna um erro
    if (this.#aeronaves.length <= 0) {
      throw new NotFoundError("Não há aeronaves em nosso registro!");
    }

    return this.#aeronaves.values();
  }
}

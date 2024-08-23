import { validate } from "bycontract";
import { BadRequestError, NotFoundError } from "../errors/index.js";

//Classe Aeronave
class Aeronave {
  #prefixo;
  #velocidadeCruzeiro;
  #autonomia;

  //Construtor da classe, verifica se os argumentos estão no tipo certo e os associa com suas respectivas propriedades
  constructor(prefixo, velocidade, autonomia) {
    validate(arguments, ["string", "number", "number"]);

    this.#prefixo = prefixo;
    this.#velocidadeCruzeiro = velocidade;
    this.#autonomia = autonomia;
  }

  //Método que retorna os valores da classe em formato string
  toString() {
    return `      prefixo: ${this.#prefixo},
      velocidadeCruzeiro: ${this.#velocidadeCruzeiro},
      autonomia: ${this.#autonomia},`;
  }
}

//Classe AeronaveParticular, uma extensão da classe Aeronave
export class AeronaveParticular extends Aeronave {
  #respmanutencao;

  //Construtor da classe, verifica se os argumentos estão no tipo certo e os associa com suas respectivas propriedades
  constructor(prefixo, velocidade, autonomia, respmanutencao) {
    validate(arguments, ["string", "number", "number", "string"]);

    super(prefixo, velocidade, autonomia);
    this.#respmanutencao = respmanutencao;
  }

  //Método que retorna os valores da classe em formato string
  toString() {
    return (
      super.toString() +
      `
      respmanutencao: ${this.#respmanutencao},`
    );
  }
}

//Classe AeronaveComercial, uma extensão da classe Aeronave
class AeronaveComercial extends Aeronave {
  #nomeCIA;

  //Construtor da classe, verifica se os argumentos estão no tipo certo e os associa com suas respectivas propriedades
  constructor(prefixo, velocidade, autonomia, nomeCIA) {
    validate(arguments, ["string", "number", "number", "string"]);

    super(prefixo, velocidade, autonomia);
    this.#nomeCIA = nomeCIA;
  }

  //Método que retorna os valores da classe em formato string
  toString() {
    return (
      super.toString() +
      `
      nomeCIA: ${this.#nomeCIA},
      `
    );
  }
}

//Classe AeronavePassageiros, uma extensão da classe AeronaveComercial
export class AeronavePassageiros extends AeronaveComercial {
  #maxPassageiros;

  //Construtor da classe, verifica se os argumentos estão no tipo certo e os associa com suas respectivas propriedades
  constructor(prefixo, velocidade, autonomia, nomeCIA, maxPassageiros) {
    validate(arguments, ["string", "number", "number", "string", "number"]);

    super(prefixo, velocidade, autonomia, nomeCIA);
    this.#maxPassageiros = maxPassageiros;
  }

  //Método que retorna os valores da classe em formato string
  toString() {
    return super.toString() + `maxPassageiros: ${this.#maxPassageiros},`;
  }
}

//Classe AeronaveCarga, uma extensão da classe AeronaveComercial
export class AeronaveCarga extends AeronaveComercial {
  #pesoMax;

  //Construtor da classe, verifica se os argumentos estão no tipo certo e os associa com suas respectivas propriedades
  constructor(prefixo, velocidade, autonomia, nomeCIA, pesoMax) {
    validate(arguments, ["string", "number", "number", "string", "number"]);

    super(prefixo, velocidade, autonomia, nomeCIA);
    this.#pesoMax = pesoMax;
  }

  //Método que retorna os valores da classe em formato string
  toString() {
    return super.toString() + `pesoMax: ${this.#pesoMax},`;
  }
}

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

  //Método que retorna todos os valores do array #aeronaves
  todas() {
    //Caso não haja nenhuma entrada no array, retorna um erro
    if (this.#aeronaves.length <= 0) {
      throw new NotFoundError("Não há aeronaves em nosso registro!");
    }

    return this.#aeronaves.values();
  }
}

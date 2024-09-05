import { validate } from "bycontract";
import { BadRequestError, ConflictError } from "../errors/index.js";

//Classe OcupacaoAerovia, responsável por ocupar os slots de uma aerovia
export class OcupacaoAerovia {
  #ocupacoes;

  //Construtor da classe, inicia a propriedade ocupacoes como um array vazio
  constructor() {
    this.#ocupacoes = [];
  }

  //Método que retorna as altitudes livres de uma aerovia
  altitudesLivres(idAerovia, data) {
    validate(arguments, ["string", "Date"]);

    //Transforma o id da aerovia em caixa alta para evitar erros por digitação
    idAerovia === idAerovia.toUpperCase();

    //Filtra todos os elementos que correspondem a essa aerovia e a data solicitada
    const matchingOcupations = this.#ocupacoes.filter(
      (e) => e.idAerovia === idAerovia && e.data.toISOString() === data.toISOString()
    );

    //Adiciona as altitudes ocupadas dos elementos encontrados anteriormente a um array
    const takenAltitudes = [];
    matchingOcupations.forEach((e) => takenAltitudes.push(e.altitude));

    //Se não houverem altitudes ocupadas, retorna o próprio array de altitudes
    if (takenAltitudes.length === 0) {
      return OcupacaoAerovia.altitudes();
    }
    //Caso haja altitudes ocupadas, adiciona a um array de altitudes livres apenas aquelas que não são encontradas no array de altitudes ocupadas
    else {
      const freeAltitudes = [];
      for (let i = 0; i < OcupacaoAerovia.altitudes().length; i++) {
        for (let j = 0; j < takenAltitudes.length; j++) {
          if (OcupacaoAerovia.altitudes()[i] !== takenAltitudes[j]) {
            freeAltitudes.push(OcupacaoAerovia.altitudes()[i]);
          }
        }
      }

      return freeAltitudes;
    }
  }

  //Método que ocupa uma aerovia
  ocupa(idAerovia, data, altitude, slot) {
    validate(arguments, ["string", "Date", "number", "number"]);

    //Transforma o id da aerovia em caixa alta para evitar erros por digitação
    idAerovia = idAerovia.toUpperCase();

    //Não permite solicitar datas passadas
    if (data < Date.now()) {
      throw new BadRequestError("A data solicitada é inválida!");
    }

    //Valida se a altitude fornecida é permitida através do array do método estático de altitudes
    if (!OcupacaoAerovia.altitudes().includes(altitude)) {
      throw new BadRequestError("A altitude solicitada é inválida!");
    }

    //Verifica se o slot de horário solicitado está entre 00h e 24h
    //Cada slot ocupa 1h, portanto o horário máximo é 23h (que ocupa das 23h até 00h)
    if (slot < 0 || slot > 23) {
      throw new BadRequestError("O slot de horário solitictado é inválido!");
    }

    //Verifica se a aerovia já está ocupada
    //Se estiver, retorna um erro
    if (this.isOcupada(idAerovia, data, altitude, slot)) {
      throw new ConflictError("Aerovia já ocupada!");
    }
    //Caso não esteja, registra essa ocupação no array de ocupações e retorna true
    else {
      this.#ocupacoes.push({ idAerovia, data, altitude, slot });
      return true;
    }
  }

  //Método que verifica se uma aerovia está ocupada
  isOcupada(idAerovia, data, altitude, slot) {
    validate(arguments, ["string", "Date", "number", "number"]);

    //Transforma o id da aerovia em caixa alta para evitar erros por digitação
    idAerovia = idAerovia.toUpperCase();

    //Busca no array de ocupações um item que tenha os dados iguais aos passados por argumento
    const repeated = this.#ocupacoes.find(
      (e) =>
        e.idAerovia === idAerovia &&
        e.data.toISOString() === data.toISOString() &&
        e.altitude === altitude &&
        e.slot === slot
    );

    //Caso ache um item igual ao que está sendo solicitado, significa que aquela aerovia já está ocupada
    //Retorna true caso esteja ocupada, e false caso não esteja
    if (repeated) {
      return true;
    } else {
      return false;
    }
  }

  //Método estático contendo todas as altitudes possíveis
  static altitudes() {
    return [25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000];
  }
}

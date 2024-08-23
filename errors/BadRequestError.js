//Cria um erro BadRequest com a mensagem que vem por argumento
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
  }
}

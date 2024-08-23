//Cria um erro NotFound com a mensagem que vem por argumento
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

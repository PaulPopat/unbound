export class ParserError extends Error {
  readonly #line_number: number;
  readonly #column_number: number;
  readonly #message: string;

  constructor(line: number, column: number, message: string) {
    super(message);

    this.#line_number = line;
    this.#column_number = column;
    this.#message = message;
  }
}

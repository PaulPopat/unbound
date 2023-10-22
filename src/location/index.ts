export class Location {
  readonly #start_line: number;
  readonly #start_column: number;
  readonly #end_line: number;
  readonly #end_column: number;

  constructor(
    start_line: number,
    start_column: number,
    end_line: number,
    end_column: number
  ) {
    this.#start_line = start_line;
    this.#start_column = start_column;
    this.#end_line = end_line;
    this.#end_column = end_column;
  }

  get StartLine() {
    return this.#start_line;
  }

  get StartColumn() {
    return this.#start_column;
  }

  get EndLine() {
    return this.#end_line;
  }

  get EndColumn() {
    return this.#end_column;
  }

  get json() {
    return {
      start: { line: this.StartLine, column: this.StartColumn },
      last: { line: this.EndLine, column: this.EndColumn },
    };
  }

  toString() {
    return JSON.stringify(this.json, undefined, 2);
  }
}

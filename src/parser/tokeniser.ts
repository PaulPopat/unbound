import { ParserError } from "./error";

export class Token {
  readonly #line_number: number;
  readonly #column_number: number;
  readonly #text: string;

  constructor(line: number, column: number, text: string) {
    this.#line_number = line;
    this.#column_number = column;
    this.#text = text;
  }

  get LineNumber() {
    return this.#line_number;
  }

  get ColumnNumber() {
    return this.#column_number;
  }

  get Text() {
    return this.#text;
  }

  toString() {
    return JSON.stringify(
      {
        line: this.#line_number,
        column: this.#column_number,
        text: this.#text,
      },
      undefined,
      2
    );
  }
}

const is_word_character = /[a-zA-Z0-9_]/gm;
const is_quote_mark = /['"`]/gm;

export function* SplitTokens(code: string): Generator<Token> {
  let start_line = 0;
  let start_column = 0;
  let line = 0;
  let column = 0;
  let current = "";

  for (const char of code) {
    if (current[0]?.match(is_quote_mark)) {
      current += char;

      if (char === "\n" && current[0] !== "`")
        throw new ParserError(line, column, "Error: Unexpected new line");

      if (char === current[0]) {
        yield new Token(start_line, start_column, current.trim());
        current = "";
      }
    } else {
      if (!char.match(is_word_character)) {
        if (current.trim())
          yield new Token(start_line, start_column, current.trim());
        current = "";
      }

      if (!current.trim()) {
        start_line = line;
        start_column = column;
      }

      current += char;
    }

    switch (char) {
      case "\n":
        line += 1;
        column = 0;
        break;
      default:
        column += 1;
    }
  }

  if (current.trim()) yield new Token(start_line, start_column, current.trim());
}

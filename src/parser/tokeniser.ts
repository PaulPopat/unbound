import { Location } from "@location";
import { ParserError } from "./error";
import { Token } from "./token";

class StringTraversal {
  readonly #data: string;
  #index: number = 0;

  #line: number = 0;
  #column: number = 0;

  constructor(data: string) {
    this.#data = data;
  }

  get current() {
    return this.#data[this.#index] ?? "";
  }

  move() {
    this.#index += 1;

    switch (this.#data[this.#index]) {
      case "\n":
        this.#line += 1;
        this.#column = -1;
        break;
      default:
        this.#column += 1;
    }

    return this.#data[this.#index] ?? "";
  }

  get line() {
    return this.#line;
  }

  get column() {
    return this.#column;
  }
}

const is_symbol_character = /^[=\-\/\\+?*<>]+$/gm;
const is_word_character = /^[a-zA-Z0-9_]+$/gm;
const is_quote_mark = /^['"`]$/gm;

function VisitWord(data: StringTraversal): Token {
  let result = data.current;
  const start = { line: data.line, column: data.column };

  while (data.move().match(is_word_character)) {
    result += data.current;
  }

  return new Token(
    new Location(start.line, start.column, data.line, data.column),
    result
  );
}

function VisitString(data: StringTraversal): Token {
  let result = "";
  const start = { line: data.line, column: data.column };

  while (data.current !== result[0]) {
    if (data.current === "\n" && result[0] !== "`")
      throw new ParserError(
        new Location(start.line, start.column, data.line, data.column),
        "Unexpected new line"
      );

    result += data.current;
    data.move();
  }

  result += data.current;
  data.move();
  return new Token(
    new Location(start.line, start.column, data.line, data.column),
    result
  );
}

function VisitMaths(data: StringTraversal): Token {
  let result = data.current;
  const start = { line: data.line, column: data.column };

  while (data.move().match(is_symbol_character)) {
    result += data.current;
  }

  return new Token(
    new Location(start.line, start.column, data.line, data.column),
    result
  );
}

export function* SplitTokens(code: string): Generator<Token> {
  const data = new StringTraversal(code);

  while (data.current) {
    if (data.current.match(is_word_character)) yield VisitWord(data);
    else if (data.current.match(is_symbol_character)) yield VisitMaths(data);
    else if (data.current.match(is_quote_mark)) yield VisitString(data);
    else if (data.current.trim()) {
      yield new Token(
        new Location(data.line, data.column, data.line, data.column + 1),
        data.current.trim()
      );

      data.move();
    } else {
      data.move();
    }
  }
}

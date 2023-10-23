import { Location } from "@location";
import { ParserError } from "./error";
import { Token } from "./token";

const is_word_character = /^(?:[a-zA-Z0-9_]+|[=\-\/\\+?*<>]+)$/gm;
const is_quote_mark = /^['"`]$/gm;

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
        throw new ParserError(
          new Location(start_line, start_column, line, column),
          "Unexpected new line"
        );

      if (char === current[0]) {
        yield new Token(
          new Location(start_line, start_column, line, column + 1),
          current.trim()
        );
        current = "";
      }
    } else {
      if (!char.match(is_word_character) || !current.match(is_word_character)) {
        if (current.trim())
          yield new Token(
            new Location(start_line, start_column, line, column),
            current.trim()
          );
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

  if (current.trim())
    yield new Token(
      new Location(start_line, start_column, line, column),
      current.trim()
    );
}

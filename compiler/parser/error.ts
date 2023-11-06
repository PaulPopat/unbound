import { Location } from "@compiler/location";
import { Token } from "./token";

export class ParserError extends Error {
  readonly #location: Location;
  readonly #message: string;

  constructor(location: Location | undefined, message: string) {
    super(
      `Parsing Error:\n${message}\nFile: ${location?.FileName}\nLine: ${
        location?.StartLine ?? -1 + 1
      }\nColumn: ${location?.StartColumn ?? -1 + 1}`
    );

    this.#location = location ?? new Location("", -1, -1, -1, -1);
    this.#message = message;
  }

  static get EndOfFile() {
    return new ParserError(undefined, "Unexpected end of file");
  }

  static UnexpectedSymbol(received: Token, ...expected: Array<string>) {
    return new ParserError(
      received.Location,
      `Unexpected symbol. Expected one of ${expected
        .map((e) => `'${e}'`)
        .join(", ")} but received '${received.Text}'`
    );
  }
}

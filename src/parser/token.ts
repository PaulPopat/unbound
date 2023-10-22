import { Location } from "@location";

export class Token {
  readonly #location: Location;
  readonly #text: string;

  constructor(location: Location, text: string) {
    this.#location = location;
    this.#text = text;
  }

  get Location() {
    return this.#location;
  }

  get Text() {
    return this.#text;
  }

  toString() {
    return JSON.stringify(
      {
        location: this.#location.json,
        text: this.#text,
      },
      undefined,
      2
    );
  }
}

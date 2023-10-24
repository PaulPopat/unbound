import { Location } from "@compiler/location";

export class LinkerError extends Error {
  readonly #location: Location;
  readonly #message: string;

  constructor(location: Location | undefined, message: string) {
    super(
      `Parsing Error:\n${message}\nLine: ${location?.StartLine}\nColumn: ${location?.StartColumn}`
    );

    this.#location = location ?? new Location(-1, -1, -1, -1);
    this.#message = message;
  }
}

import { Location } from "@compiler/location";

export class LinkerError extends Error {
  readonly #location: Location;
  readonly #message: string;

  constructor(location: Location | undefined, message: string) {
    super(
      `Linking Error:\n${message}\nFile: ${location?.FileName}\nLine: ${
        location?.StartLine ?? -1 + 1
      }\nColumn: ${location?.StartColumn ?? -1 + 1}`
    );

    this.#location = location ?? new Location("", -1, -1, -1, -1);
    this.#message = message;
  }
}

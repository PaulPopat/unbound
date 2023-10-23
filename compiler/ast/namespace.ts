import { Location } from "@compiler/location";
import { Component, ComponentGroup } from "./base";
import { Entity } from "./entity";

export class Namespace extends Component {
  readonly #name: string;
  readonly #exported: boolean;
  readonly #contents: ComponentGroup<Entity>;

  constructor(
    ctx: Location,
    exported: boolean,
    name: string,
    contents: ComponentGroup<Entity>
  ) {
    super(ctx);
    this.#name = name;
    this.#exported = exported;
    this.#contents = contents;
  }

  get type_name() {
    return "namespace";
  }

  get extra_json() {
    return {
      name: this.#name,
      exported: this.#exported,
      contents: this.#contents.json,
    };
  }
}
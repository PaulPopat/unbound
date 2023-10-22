import { Location } from "@location";
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

  get Name() {
    return this.#name;
  }

  get Contents() {
    return this.#contents;
  }
}

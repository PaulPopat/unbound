import { Component, ComponentGroup, ComponentContext } from "./base";
import { Entity } from "./entity";

export class Namespace extends Component {
  readonly #name: string;
  readonly #contents: ComponentGroup<Entity>;

  constructor(
    ctx: ComponentContext,
    name: string,
    contents: ComponentGroup<Entity>
  ) {
    super(ctx);
    this.#name = name;
    this.#contents = contents;
  }

  get Name() {
    return this.#name;
  }

  get Contents() {
    return this.#contents;
  }
}

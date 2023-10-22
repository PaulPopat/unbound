import { Component, ComponentGroup, ComponentContext } from "./base";
import { Entity } from "./entity";

type NamespaceContext = ComponentContext & {
  exported: boolean;
};

export class Namespace extends Component {
  readonly #name: string;
  readonly #exported: boolean;
  readonly #contents: ComponentGroup<Entity>;

  constructor(
    ctx: NamespaceContext,
    name: string,
    contents: ComponentGroup<Entity>
  ) {
    super(ctx);
    this.#name = name;
    this.#exported = ctx.exported;
    this.#contents = contents;
  }

  get Name() {
    return this.#name;
  }

  get Contents() {
    return this.#contents;
  }
}

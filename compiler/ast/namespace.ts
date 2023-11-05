import { Location } from "@compiler/location";
import { Component, ComponentGroup, Visitor } from "./base";
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

  get Exported() {
    return this.#exported;
  }

  get Contents() {
    return this.#contents;
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

  inner_visited(visitor: Visitor): Component {
    return new Namespace(
      this.Location,
      this.#exported,
      this.#name,
      this.#contents.type_safe_visited(Entity, visitor)
    );
  }
}

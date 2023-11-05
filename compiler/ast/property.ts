import { Location } from "@compiler/location";
import { Component, Visitor } from "./base";

export class Property<TType extends Component> extends Component {
  readonly #name: string;
  readonly #type: TType;

  constructor(ctx: Location, name: string, type: TType) {
    super(ctx);
    this.#name = name;
    this.#type = type;
  }

  get type_name() {
    return "property";
  }

  get extra_json() {
    return {
      name: this.#name,
      type: this.#type.json,
    };
  }

  inner_visited(visitor: Visitor): Component {
    return new Property(this.Location, this.#name, this.#type.visited(visitor));
  }
}

export class FunctionParameter<TType extends Component> extends Component {
  readonly #name: string;
  readonly #type?: TType;

  constructor(ctx: Location, name: string, type: TType | undefined) {
    super(ctx);
    this.#name = name;
    this.#type = type;
  }

  get type_name() {
    return "function_parameter";
  }

  get extra_json() {
    return {
      name: this.#name,
      type: this.#type?.json ?? null,
    };
  }

  inner_visited(visitor: Visitor): Component {
    return new FunctionParameter(
      this.Location,
      this.#name,
      this.#type?.visited(visitor)
    );
  }
}

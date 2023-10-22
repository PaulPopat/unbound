import { Component, ComponentContext } from "./base";

export class Property<TType extends Component> extends Component {
  readonly #name: string;
  readonly #type: TType;

  constructor(ctx: ComponentContext, name: string, type: TType) {
    super(ctx);
    this.#name = name;
    this.#type = type;
  }

  get Name() {
    return this.#name;
  }

  get Type() {
    return this.#type;
  }
}

export class FunctionParameter<TType extends Component> extends Component {
  readonly #name: string;
  readonly #type: TType | undefined;

  constructor(ctx: ComponentContext, name: string, type: TType | undefined) {
    super(ctx);
    this.#name = name;
    this.#type = type;
  }

  get Name() {
    return this.#name;
  }

  get Type() {
    return this.#type;
  }
}

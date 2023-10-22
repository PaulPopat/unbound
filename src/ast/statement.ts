import { Component, ComponentContext } from "./base";
import { Expression } from "./expression";

export class Statement extends Component {}

export class StoreStatement extends Statement {
  readonly #name: string;
  readonly #equals: Expression;

  constructor(ctx: ComponentContext, name: string, equals: Expression) {
    super(ctx);
    this.#name = name;
    this.#equals = equals;
  }

  get Name() {
    return this.#name;
  }
}

export class ReturnStatement extends Statement {
  readonly #value: Expression;

  constructor(ctx: ComponentContext, value: Expression) {
    super(ctx);
    this.#value = value;
  }
}

export class AssignStatement extends Statement {
  readonly #name: string;
  readonly #equals: Expression;

  constructor(ctx: ComponentContext, name: string, equals: Expression) {
    super(ctx);
    this.#name = name;
    this.#equals = equals;
  }

  get Name() {
    return this.#name;
  }
}

export class PanicStatement extends Statement {
  readonly #value: Expression;

  constructor(ctx: ComponentContext, value: Expression) {
    super(ctx);
    this.#value = value;
  }
}

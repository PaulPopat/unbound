import { Location } from "@location";
import { Component } from "./base";
import { Expression } from "./expression";

export abstract class Statement extends Component {}

export class StoreStatement extends Statement {
  readonly #name: string;
  readonly #equals: Expression;

  constructor(ctx: Location, name: string, equals: Expression) {
    super(ctx);
    this.#name = name;
    this.#equals = equals;
  }

  get type_name() {
    return "store_statement";
  }

  get extra_json() {
    return {
      name: this.#name,
      equals: this.#equals.json,
    };
  }
}

export class ReturnStatement extends Statement {
  readonly #value: Expression;

  constructor(ctx: Location, value: Expression) {
    super(ctx);
    this.#value = value;
  }

  get type_name() {
    return "return_statement";
  }

  get extra_json() {
    return {
      value: this.#value.json,
    };
  }
}

export class AssignStatement extends Statement {
  readonly #name: string;
  readonly #equals: Expression;

  constructor(ctx: Location, name: string, equals: Expression) {
    super(ctx);
    this.#name = name;
    this.#equals = equals;
  }

  get type_name() {
    return "assign_statement";
  }

  get extra_json() {
    return {
      name: this.#name,
      equals: this.#equals.json,
    };
  }
}

export class PanicStatement extends Statement {
  readonly #value: Expression;

  constructor(ctx: Location, value: Expression) {
    super(ctx);
    this.#value = value;
  }

  get type_name() {
    return "panic_statement";
  }

  get extra_json() {
    return {
      value: this.#value.json,
    };
  }
}

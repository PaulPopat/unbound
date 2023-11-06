import { Location } from "@compiler/location";
import { Component, Visitor } from "./base";
import { Expression } from "./expression";
import { Type } from "./type";

export abstract class Statement extends Component {}

export class StoreStatement extends Statement {
  readonly #name: string;
  readonly #equals: Expression;
  readonly #type?: Type;

  constructor(ctx: Location, name: string, equals: Expression, type?: Type) {
    super(ctx);
    this.#name = name;
    this.#equals = equals;
    this.#type = type;
  }

  get Name() {
    return this.#name;
  }

  get Equals() {
    return this.#equals;
  }

  get type_name() {
    return "store_statement";
  }

  get extra_json() {
    return {
      name: this.#name,
      equals: this.#equals.json,
      type: this.#type?.json,
    };
  }

  inner_visited(visitor: Visitor): Component {
    return new StoreStatement(
      this.Location,
      this.#name,
      this.#equals.type_safe_visited(Expression, visitor),
      this.#type
    );
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

  inner_visited(visitor: Visitor): Component {
    return new ReturnStatement(
      this.Location,
      this.#value.type_safe_visited(Expression, visitor)
    );
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

  inner_visited(visitor: Visitor): Component {
    return new AssignStatement(
      this.Location,
      this.#name,
      this.#equals.type_safe_visited(Expression, visitor)
    );
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

  inner_visited(visitor: Visitor): Component {
    return new PanicStatement(
      this.Location,
      this.#value.type_safe_visited(Expression, visitor)
    );
  }
}

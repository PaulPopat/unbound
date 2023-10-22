import { Location } from "@location";
import { Component, ComponentGroup } from "./base";
import { FunctionParameter, Property } from "./property";

export abstract class Type extends Component {}

export class SchemaType extends Type {
  readonly #name: string;
  readonly #properties: ComponentGroup<Property<Type>>;

  constructor(
    ctx: Location,
    name: string,
    properties: ComponentGroup<Property<Type>>
  ) {
    super(ctx);
    this.#name = name;
    this.#properties = properties;
  }

  get Name() {
    return this.#name;
  }
}

export class ReferenceType extends Type {
  readonly #name: string;

  constructor(ctx: Location, name: string) {
    super(ctx);
    this.#name = name;
  }

  get Name() {
    return this.#name;
  }
}

export class IterableType extends Type {
  readonly #type: Type;

  constructor(ctx: Location, type: Type) {
    super(ctx);
    this.#type = type;
  }
}

export class FunctionType extends Type {
  readonly #parameters: ComponentGroup<FunctionParameter<Type>>;
  readonly #returns: Type;

  constructor(
    ctx: Location,
    parameters: ComponentGroup<FunctionParameter<Type>>,
    returns: Type
  ) {
    super(ctx);
    this.#parameters = parameters;
    this.#returns = returns;
  }
}

export class UseType extends Type {
  readonly #name: string;
  readonly #constraints: ComponentGroup<Type>;

  constructor(ctx: Location, name: string, constraints: ComponentGroup<Type>) {
    super(ctx);
    this.#name = name;
    this.#constraints = constraints;
  }

  get Name() {
    return this.#name;
  }
}

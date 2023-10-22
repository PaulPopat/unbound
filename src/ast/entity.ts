import { Component, ComponentGroup, ComponentContext } from "./base";
import { FunctionParameter, Property } from "./property";
import { Type } from "./type";

export abstract class Entity extends Component {}

export class Function extends Entity {
  readonly #name: string;
  readonly #parameters: ComponentGroup<FunctionParameter<Type>>;
  readonly #returns: Type | undefined;

  constructor(
    ctx: ComponentContext,
    name: string,
    parameters: ComponentGroup<FunctionParameter<Type>>,
    returns: Type | undefined
  ) {
    super(ctx);
    this.#name = name;
    this.#parameters = parameters;
    this.#returns = returns;
  }

  get Name() {
    return this.#name;
  }
}

export class Struct extends Entity {
  readonly #name: string;
  readonly #properties: ComponentGroup<Property<Type>>;

  constructor(
    ctx: ComponentContext,
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

export class Schema extends Entity {
  readonly #name: string;
  readonly #properties: ComponentGroup<Property<Type>>;

  constructor(
    ctx: ComponentContext,
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

export class Using extends Entity {
  readonly #name: string;

  constructor(ctx: ComponentContext, name: string) {
    super(ctx);
    this.#name = name;
  }

  get Name() {
    return this.#name;
  }
}

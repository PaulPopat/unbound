import { Location } from "@compiler/location";
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

  get type_name() {
    return "schema_type";
  }

  get extra_json() {
    return {
      name: this.#name,
      properties: this.#properties.json,
    };
  }
}

export class ReferenceType extends Type {
  readonly #name: string;

  constructor(ctx: Location, name: string) {
    super(ctx);
    this.#name = name;
  }

  get type_name() {
    return "reference_type";
  }

  get extra_json() {
    return {
      name: this.#name,
    };
  }
}

export class IterableType extends Type {
  readonly #type: Type;

  constructor(ctx: Location, type: Type) {
    super(ctx);
    this.#type = type;
  }

  get type_name() {
    return "iterable_type";
  }

  get extra_json() {
    return {
      type: this.#type.json,
    };
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

  get type_name() {
    return "function_type";
  }

  get extra_json() {
    return {
      parameters: this.#parameters.json,
      returns: this.#returns.json,
    };
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

  get type_name() {
    return "function_type";
  }

  get extra_json() {
    return {
      name: this.#name,
      constraints: this.#constraints.json,
    };
  }
}

import { Location } from "@compiler/location";
import { Component, ComponentGroup, Visitor } from "./base";
import { FunctionParameter, Property } from "./property";
import { StructEntity } from ".";

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

  inner_visited(visitor: Visitor): Component {
    return new SchemaType(
      this.Location,
      this.#name,
      this.#properties.type_safe_visited(Property<Type>, visitor)
    );
  }
}

export class ReferenceType extends Type {
  readonly #name: string;
  readonly #references?: Type;

  constructor(ctx: Location, name: string, references?: Type) {
    super(ctx);
    this.#name = name;
    this.#references = references;
  }

  get Name() {
    return this.#name;
  }

  get type_name() {
    return "reference_type";
  }

  get extra_json() {
    return {
      name: this.#name,
      references: this.#references?.json,
    };
  }

  inner_visited(visitor: Visitor): Component {
    return new ReferenceType(this.Location, this.#name, this.#references);
  }
}

export const PrimitiveNames = [
  "int",
  "char",
  "double",
  "float",
  "bool",
  "long",
  "any",
] as const;

export type PrimitiveName = (typeof PrimitiveNames)[number];

export function IsPrimitiveName(input: string): input is PrimitiveName {
  return PrimitiveNames.includes(input as any);
}

export class PrimitiveType extends Type {
  readonly #name: PrimitiveName;

  constructor(ctx: Location, name: PrimitiveName) {
    super(ctx);
    this.#name = name;
  }

  get type_name() {
    return "primitive_type";
  }

  get extra_json() {
    return {
      name: this.#name,
    };
  }

  inner_visited(visitor: Visitor): Component {
    return new PrimitiveType(this.Location, this.#name);
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

  inner_visited(visitor: Visitor): Component {
    return new IterableType(
      this.Location,
      this.#type.type_safe_visited(Type, visitor)
    );
  }
}

export class FunctionType extends Type {
  readonly #parameters: ComponentGroup<FunctionParameter<Type>>;
  readonly #returns: Type | StructEntity;

  constructor(
    ctx: Location,
    parameters: ComponentGroup<FunctionParameter<Type>>,
    returns: Type | StructEntity
  ) {
    super(ctx);
    this.#parameters = parameters;
    this.#returns = returns;
  }

  get Returns() {
    return this.#returns;
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

  inner_visited(visitor: Visitor): Component {
    return new FunctionType(
      this.Location,
      this.#parameters.type_safe_visited(FunctionParameter<Type>, visitor),
      this.#returns.type_safe_visited(Type, visitor)
    );
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

  get type_name() {
    return "function_type";
  }

  get extra_json() {
    return {
      name: this.#name,
      constraints: this.#constraints.json,
    };
  }

  inner_visited(visitor: Visitor): Component {
    return new UseType(
      this.Location,
      this.#name,
      this.#constraints.type_safe_visited(Type, visitor)
    );
  }
}

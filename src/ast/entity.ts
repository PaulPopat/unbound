import { Component, ComponentGroup } from "./base";
import { FunctionParameter, Property } from "./property";
import { Type } from "./type";
import { Statement } from "./statement";
import { Location } from "@location";

export abstract class Entity extends Component {
  readonly #exported: boolean;

  constructor(ctx: Location, exported: boolean) {
    super(ctx);
    this.#exported = exported;
  }
}

export class FunctionEntity extends Entity {
  readonly #name: string;
  readonly #parameters: ComponentGroup<FunctionParameter<Type>>;
  readonly #returns: Type | undefined;
  readonly #content: ComponentGroup<Statement>;

  constructor(
    ctx: Location,
    exported: boolean,
    name: string,
    parameters: ComponentGroup<FunctionParameter<Type>>,
    returns: Type | undefined,
    content: ComponentGroup<Statement>
  ) {
    super(ctx, exported);
    this.#name = name;
    this.#parameters = parameters;
    this.#returns = returns;
    this.#content = content;
  }

  get Name() {
    return this.#name;
  }
}

export class StructEntity extends Entity {
  readonly #name: string;
  readonly #properties: ComponentGroup<Property<Type>>;

  constructor(
    ctx: Location,
    exported: boolean,
    name: string,
    properties: ComponentGroup<Property<Type>>
  ) {
    super(ctx, exported);
    this.#name = name;
    this.#properties = properties;
  }

  get Name() {
    return this.#name;
  }
}

export class SchemaEntity extends Entity {
  readonly #name: string;
  readonly #properties: ComponentGroup<Property<Type>>;

  constructor(
    ctx: Location,
    exported: boolean,
    name: string,
    properties: ComponentGroup<Property<Type>>
  ) {
    super(ctx, exported);
    this.#name = name;
    this.#properties = properties;
  }

  get Name() {
    return this.#name;
  }
}

export class UsingEntity extends Entity {
  readonly #name: string;

  constructor(ctx: Location, exported: boolean, name: string) {
    super(ctx, exported);
    this.#name = name;
  }

  get Name() {
    return this.#name;
  }
}

export class ExternalFunctionEntity extends Entity {
  readonly #name: string;
  readonly #parameters: ComponentGroup<FunctionParameter<Type>>;
  readonly #returns: Type;

  constructor(
    ctx: Location,
    exported: boolean,
    name: string,
    parameters: ComponentGroup<FunctionParameter<Type>>,
    returns: Type
  ) {
    super(ctx, exported);
    this.#name = name;
    this.#parameters = parameters;
    this.#returns = returns;
  }

  get Name() {
    return this.#name;
  }
}

export class LibEntity extends Entity {
  readonly #name: string;
  readonly #content: ComponentGroup<ExternalFunctionEntity>;

  constructor(
    ctx: Location,
    exported: boolean,
    name: string,
    content: ComponentGroup<ExternalFunctionEntity>
  ) {
    super(ctx, exported);
    this.#name = name;
    this.#content = content;
  }

  get Name() {
    return this.#name;
  }
}

export class SystemEntity extends Entity {
  readonly #content: ComponentGroup<ExternalFunctionEntity>;

  constructor(
    ctx: Location,
    exported: boolean,
    content: ComponentGroup<ExternalFunctionEntity>
  ) {
    super(ctx, exported);
    this.#content = content;
  }
}

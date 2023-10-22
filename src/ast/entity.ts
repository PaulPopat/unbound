import { Component, ComponentGroup, ComponentContext } from "./base";
import { FunctionParameter, Property } from "./property";
import { Type } from "./type";
import { Statement } from "./statement";

type EntityContext = ComponentContext & {
  exported: boolean;
};

export abstract class Entity extends Component {
  readonly #exported: boolean;

  constructor(ctx: EntityContext) {
    super(ctx);
    this.#exported = ctx.exported;
  }
}

export class FunctionEntity extends Entity {
  readonly #name: string;
  readonly #parameters: ComponentGroup<FunctionParameter<Type>>;
  readonly #returns: Type | undefined;
  readonly #content: ComponentGroup<Statement>;

  constructor(
    ctx: EntityContext,
    name: string,
    parameters: ComponentGroup<FunctionParameter<Type>>,
    returns: Type | undefined,
    content: ComponentGroup<Statement>
  ) {
    super(ctx);
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
    ctx: EntityContext,
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

export class SchemaEntity extends Entity {
  readonly #name: string;
  readonly #properties: ComponentGroup<Property<Type>>;

  constructor(
    ctx: EntityContext,
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

export class UsingEntity extends Entity {
  readonly #name: string;

  constructor(ctx: EntityContext, name: string) {
    super(ctx);
    this.#name = name;
  }

  get Name() {
    return this.#name;
  }
}

export class ExternalFunctionEntity extends Entity {
  readonly #name: string;
  readonly #parameters: ComponentGroup<FunctionParameter<Type>>;
  readonly #returns: Type | undefined;

  constructor(
    ctx: EntityContext,
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

export class LibEntity extends Entity {
  readonly #name: string;
  readonly #content: ComponentGroup<ExternalFunctionEntity>;

  constructor(
    ctx: EntityContext,
    name: string,
    content: ComponentGroup<ExternalFunctionEntity>
  ) {
    super(ctx);
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
    ctx: EntityContext,
    content: ComponentGroup<ExternalFunctionEntity>
  ) {
    super(ctx);
    this.#content = content;
  }
}

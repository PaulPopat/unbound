import { Component, ComponentGroup } from "./base";
import { FunctionParameter, Property } from "./property";
import { Type } from "./type";
import { Statement } from "./statement";
import { Location } from "@compiler/location";
import { Expression } from "./expression";

export abstract class Entity extends Component {
  readonly #exported: boolean;

  constructor(ctx: Location, exported: boolean) {
    super(ctx);
    this.#exported = exported;
  }

  get Exported() {
    return this.#exported;
  }

  abstract get more_json(): Record<never, never>;

  get extra_json() {
    return {
      ...this.more_json,
      exported: this.#exported,
    };
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

  get type_name() {
    return "function_entity";
  }

  get more_json() {
    return {
      name: this.#name,
      parameters: this.#parameters.json,
      returns: this.#returns?.json ?? null,
      content: this.#content.json,
    };
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

  get type_name() {
    return "struct_entity";
  }

  get more_json() {
    return {
      name: this.#name,
      properties: this.#properties.json,
    };
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

  get type_name() {
    return "schema_entity";
  }

  get more_json() {
    return {
      name: this.#name,
      properties: this.#properties.json,
    };
  }
}

export class UsingEntity extends Entity {
  readonly #name: string;

  constructor(ctx: Location, exported: boolean, name: string) {
    super(ctx, exported);
    this.#name = name;
  }

  get type_name() {
    return "using_entity";
  }

  get more_json() {
    return {
      name: this.#name,
    };
  }
}

export class ExternalFunctionDeclaration extends Component {
  readonly #name: string;
  readonly #parameters: ComponentGroup<FunctionParameter<Type>>;
  readonly #returns: Type;

  constructor(
    ctx: Location,
    name: string,
    parameters: ComponentGroup<FunctionParameter<Type>>,
    returns: Type
  ) {
    super(ctx);
    this.#name = name;
    this.#parameters = parameters;
    this.#returns = returns;
  }

  get type_name() {
    return "external_function_declaration";
  }

  get extra_json() {
    return {
      name: this.#name,
      parameters: this.#parameters.json,
      returns: this.#returns.json,
    };
  }
}

export class LibEntity extends Entity {
  readonly #name: Expression;
  readonly #content: ComponentGroup<ExternalFunctionDeclaration>;

  constructor(
    ctx: Location,
    exported: boolean,
    name: Expression,
    content: ComponentGroup<ExternalFunctionDeclaration>
  ) {
    super(ctx, exported);
    this.#name = name;
    this.#content = content;
  }

  get Name() {
    return this.#name;
  }

  get type_name() {
    return "lib_entity";
  }

  get more_json() {
    return {
      name: this.#name,
      content: this.#content.json,
    };
  }
}

export class SystemEntity extends Entity {
  readonly #content: ComponentGroup<ExternalFunctionDeclaration>;

  constructor(
    ctx: Location,
    exported: boolean,
    content: ComponentGroup<ExternalFunctionDeclaration>
  ) {
    super(ctx, exported);
    this.#content = content;
  }

  get type_name() {
    return "system_entity";
  }

  get more_json() {
    return {
      content: this.#content.json,
    };
  }
}

import {
  AstItem,
  Component,
  ComponentGroup,
  ComponentStore,
  WriterContext,
} from "./base";
import { FunctionParameter, Property } from "./property";
import { Type } from "./type";
import { Location } from "#compiler/location";
import { Expression, LiteralExpression } from "./expression";
import { WriterError } from "./error";
import { AsyncLocalStorage } from "node:async_hooks";

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

@AstItem
export class FunctionEntity extends Entity {
  readonly #name: string;
  readonly #parameters: ComponentGroup;
  readonly #returns: number | undefined;
  readonly #content: ComponentGroup;

  constructor(
    ctx: Location,
    exported: boolean,
    name: string,
    parameters: ComponentGroup,
    returns: Type | undefined,
    content: ComponentGroup
  ) {
    super(ctx, exported);
    this.#name = name;
    this.#parameters = parameters;
    this.#returns = returns?.Index;
    this.#content = content;
  }

  get Name() {
    return this.#name;
  }

  get Parameters() {
    return this.#parameters;
  }
  get Returns() {
    return this.#returns ? ComponentStore.Get(this.#returns) : undefined;
  }

  get Content() {
    return this.#content;
  }

  get type_name() {
    return "function_entity";
  }

  get more_json() {
    return {
      name: this.#name,
      parameters: this.#parameters.json,
      returns: this.#returns,
      content: this.#content.json,
    };
  }

  toC(ctx: WriterContext): string {
    const returns = this.Returns;
    if (!returns)
      throw new WriterError(
        this.Location,
        "Currently, explicit returns must be provided."
      );

    const locals: Array<string> = [];
    return `void ${this.#name} (${returns.toC({
      ...ctx,
      data: {
        ...ctx.data,
        locals,
      },
    })}* c_returns, ${this.#parameters.toC(",", {
      ...ctx,
      data: {
        ...ctx.data,
        locals,
      },
    })}) {${this.#content.toC(";", {
      ...ctx,
      data: {
        ...ctx.data,
        locals,
      },
    })}}`;
  }
}

@AstItem
export class StructEntity extends Entity {
  readonly #name: string;
  readonly #properties: ComponentGroup;

  constructor(
    ctx: Location,
    exported: boolean,
    name: string,
    properties: ComponentGroup
  ) {
    super(ctx, exported);
    this.#name = name;
    this.#properties = properties;
  }

  get Name() {
    return this.#name;
  }

  get Properties() {
    return this.#properties;
  }

  HasKey(key: string) {
    for (const property of this.#properties.iterator())
      if (property instanceof Property) if (property.Name === key) return true;

    return false;
  }

  GetKey(key: string) {
    for (const property of this.#properties.iterator())
      if (property instanceof Property)
        if (property.Name === key) return property;

    return undefined;
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

  toC(ctx: any): string {
    return `struct ${this.#name} {${this.#properties.toC(";", ctx)}}`;
  }
}

@AstItem
export class SchemaEntity extends Entity {
  readonly #name: string;
  readonly #properties: ComponentGroup;

  constructor(
    ctx: Location,
    exported: boolean,
    name: string,
    properties: ComponentGroup
  ) {
    super(ctx, exported);
    this.#name = name;
    this.#properties = properties;
  }

  get Name() {
    return this.#name;
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

  toC(): string {
    return "";
  }
}

@AstItem
export class UsingEntity extends Entity {
  readonly #name: string;

  constructor(ctx: Location, exported: boolean, name: string) {
    super(ctx, exported);
    this.#name = name;
  }

  get Name() {
    return this.#name;
  }

  get type_name() {
    return "using_entity";
  }

  get more_json() {
    return {
      name: this.#name,
    };
  }

  toC(): string {
    return "";
  }
}

function NameFromPath(path: string) {
  return path.replace(/\//gm, "_").replace(/\\/gm, "_").replace(/./gm, "__");
}

const external_function_context = new AsyncLocalStorage<
  { type: "lib"; path: string } | { type: "system" }
>();

@AstItem
export class ExternalFunctionDeclaration extends Component {
  readonly #name: string;
  readonly #parameters: ComponentGroup;
  readonly #returns: number;

  constructor(
    ctx: Location,
    name: string,
    parameters: ComponentGroup,
    returns: Type
  ) {
    super(ctx);
    this.#name = name;
    this.#parameters = parameters;
    this.#returns = returns.Index;
  }

  get Name() {
    return this.#name;
  }

  get Returns() {
    return ComponentStore.Get(this.#returns);
  }

  get type_name() {
    return "external_function_declaration";
  }

  get extra_json() {
    return {
      name: this.#name,
      parameters: this.#parameters.json,
      returns: this.#returns,
    };
  }

  toC(ctx: WriterContext): string {
    if (!ctx.data.extern)
      throw new WriterError(
        this.Location,
        "An external function declaration must be in a lib or system entity"
      );

    switch (ctx.data.extern.type) {
      case "lib":
        switch (ctx.target) {
          case "unix":
          case "darwin":
            return `void ${this.#name} (${this.Returns.toC(
              ctx
            )}* c_returns, ${this.#parameters.toC(",", ctx)}) {
              init_${NameFromPath(ctx.data.extern.path)}();

              ${this.Returns.toC(ctx)} (*implementation)(
                ${this.#parameters.toC(",", ctx)}
              );

              implementation = dlsym(
                ${NameFromPath(ctx.data.extern.path)},
                "${this.#name}"
              );
    
              c_returns[0] = (*implementation)(${[
                ...this.#parameters.iterator(),
              ]
                .map((p) => {
                  if (!(p instanceof FunctionParameter))
                    throw new WriterError(
                      p.Location,
                      "Expected a function parameter"
                    );

                  return p.Name;
                })
                .join(",")})
            }`;
          case "win":
            return `void ${this.#name} (${this.Returns.toC(
              ctx
            )}* c_returns, ${this.#parameters.toC(",", ctx)}) {
              init_${NameFromPath(ctx.data.extern.path)}();

              ${this.Returns.toC(ctx)} (*implementation)(
                ${this.#parameters.toC(",", ctx)}
              );

              implementation = GetProcAddress(
                ${NameFromPath(ctx.data.extern.path)},
                "${this.#name}"
              );

              c_returns[0] = (*implementation)(${[
                ...this.#parameters.iterator(),
              ]
                .map((p) => {
                  if (!(p instanceof FunctionParameter))
                    throw new WriterError(
                      p.Location,
                      "Expected a function parameter"
                    );

                  return p.Name;
                })
                .join(",")})
            }`;
        }
      case "system":
        throw new WriterError(
          this.Location,
          "Looks like this may not be needed"
        );
    }

    throw new WriterError(
      this.Location,
      "This is definitely a bug with the compiler"
    );
  }
}

@AstItem
export class LibEntity extends Entity {
  readonly #name: number;
  readonly #content: ComponentGroup;

  constructor(
    ctx: Location,
    exported: boolean,
    name: Expression,
    content: ComponentGroup
  ) {
    super(ctx, exported);
    this.#name = name.Index;
    this.#content = content;
  }

  get Name() {
    return ComponentStore.Get(this.#name);
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

  toC(ctx: WriterContext): string {
    const name = this.Name;
    if (!(name instanceof LiteralExpression) || name.Type !== "string")
      throw new WriterError(
        this.Location,
        "Only literal strings may be used to load a lib"
      );

    const path = name.Value;

    switch (ctx.target) {
      case "unix":
      case "darwin":
        ctx.add("#include <dlfcn.h>");

        return `
          void* ${NameFromPath(path)}

          void init_${NameFromPath(path)}() {
            if (!${NameFromPath(path)}) {
              ${NameFromPath} = dlopen ("${path}", RTLD_LAZY);
            }
          }

          ${external_function_context.run({ type: "lib", path: path }, () =>
            this.#content.toC("\n", ctx)
          )}
        `;
      case "win":
        ctx.add("<windows.h>");

        return `
          HINSTANCE ${NameFromPath(path)};

          void init_${NameFromPath(path)}() {
            if (!${NameFromPath(path)}) {
              ${NameFromPath(path)} = LoadLibrary("${path}");
            }
          }

          ${external_function_context.run({ type: "lib", path: path }, () =>
            this.#content.toC("\n", ctx)
          )}
        `;
    }
  }
}

@AstItem
export class SystemEntity extends Entity {
  readonly #content: ComponentGroup;

  constructor(ctx: Location, exported: boolean, content: ComponentGroup) {
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

  toC(): string {
    throw new WriterError(this.Location, "Looks like this may not be needed");
  }
}

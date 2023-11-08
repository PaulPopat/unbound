import { Location } from "#compiler/location";
import { AstItem, Component, ComponentStore, WriterContext } from "./base";
import { WriterError } from "./error";
import { Expression, LiteralExpression } from "./expression";
import { Type } from "./type";

export abstract class Statement extends Component {}

@AstItem
export class StoreStatement extends Statement {
  readonly #name: string;
  readonly #equals: number;
  readonly #type?: number;

  constructor(ctx: Location, name: string, equals: Expression, type?: Type) {
    super(ctx);
    this.#name = name;
    this.#equals = equals.Index;
    this.#type = type?.Index;
  }

  get Name() {
    return this.#name;
  }

  get Equals() {
    return ComponentStore.Get(this.#equals);
  }

  get Type() {
    return this.#type ? ComponentStore.Get(this.#type) : undefined;
  }

  get type_name() {
    return "store_statement";
  }

  get extra_json() {
    return {
      name: this.#name,
      equals: this.#equals,
      type: this.#type,
    };
  }

  toC(ctx: WriterContext): string {
    const type = this.Type;
    if (!type)
      throw new WriterError(
        this.Location,
        "We should have the type by now. This is definitely a bug with the compiler"
      );

    ctx.add("#include <stdlib.h>");
    ctx.data.locals.push(this.#name);
    return `${type.toC(ctx)}* ${this.#name} = malloc(sizeof(${type.toC(ctx)}));
    ${this.Equals.toC({
      ...ctx,
      data: {
        ...ctx.data,
        current_store: this.#name,
      },
    })}`;
  }
}

@AstItem
export class ReturnStatement extends Statement {
  readonly #value: number;

  constructor(ctx: Location, value: Expression) {
    super(ctx);
    this.#value = value.Index;
  }

  get Value() {
    return ComponentStore.Get(this.#value);
  }

  get type_name() {
    return "return_statement";
  }

  get extra_json() {
    return {
      value: this.#value,
    };
  }

  toC(ctx: WriterContext): string {
    ctx.add("#include <stdlib.h>");
    return `${this.Value.toC({
      ...ctx,
      data: {
        ...ctx.data,
        current_store: "c_returns",
      },
    })};
    ${ctx.data.locals.map((l: string) => `free(${l})`).join(";")}`;
  }
}

@AstItem
export class AssignStatement extends Statement {
  readonly #name: string;
  readonly #equals: number;

  constructor(ctx: Location, name: string, equals: Expression) {
    super(ctx);
    this.#name = name;
    this.#equals = equals.Index;
  }

  get Name() {
    return this.#name;
  }

  get Equals() {
    return ComponentStore.Get(this.#equals);
  }

  get type_name() {
    return "assign_statement";
  }

  get extra_json() {
    return {
      name: this.#name,
      equals: this.#equals,
    };
  }

  toC(ctx: WriterContext): string {
    const struct = ctx.data.current_make;
    if (typeof struct !== "string")
      throw new WriterError(
        this.Location,
        "Attempting to call an assign from outside of a make"
      );

    return this.Equals.toC({
      ...ctx,
      data: {
        ...ctx.data,
        current_store: `${struct}[0]->${this.#name}`,
      },
    });
  }
}

@AstItem
export class PanicStatement extends Statement {
  readonly #value: number;

  constructor(ctx: Location, value: Expression) {
    super(ctx);
    this.#value = value.Index;
  }

  get Value() {
    return ComponentStore.Get(this.#value);
  }

  get type_name() {
    return "panic_statement";
  }

  get extra_json() {
    return {
      value: this.#value,
    };
  }

  toC(ctx: WriterContext): string {
    const name = this.Value;
    if (!(name instanceof LiteralExpression) || name.Type !== "string")
      throw new WriterError(
        this.Location,
        "Only literal strings may be used to load a lib"
      );

    ctx.add("#include <stdio.h>");
    ctx.add("#include <stdlib.h>");

    return `printf("${name.Value}");exit(1);`;
  }
}

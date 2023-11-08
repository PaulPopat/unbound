import { Location } from "#compiler/location";
import { AstItem, Component, ComponentStore, WriterContext } from "./base";
import { WriterError } from "./error";
import { Type } from "./type";

@AstItem
export class Property extends Component {
  readonly #name: string;
  readonly #type: number;

  constructor(ctx: Location, name: string, type: Type) {
    super(ctx);
    this.#name = name;
    this.#type = type.Index;
  }

  get Name() {
    return this.#name;
  }

  get Type() {
    return ComponentStore.Get(this.#type);
  }

  get type_name() {
    return "property";
  }

  get extra_json() {
    return {
      name: this.#name,
      type_name: this.#type,
    };
  }

  toC(ctx: WriterContext): string {
    return `${this.Type.toC(ctx)} ${this.#name}`;
  }
}

@AstItem
export class FunctionParameter extends Component {
  readonly #name: string;
  readonly #type?: number;

  constructor(ctx: Location, name: string, type: Type | undefined) {
    super(ctx);
    this.#name = name;
    this.#type = type?.Index;
  }

  get Name() {
    return this.#name;
  }

  get Type() {
    return this.#type != null ? ComponentStore.Get(this.#type) : undefined;
  }

  get type_name() {
    return "function_parameter";
  }

  get extra_json() {
    return {
      name: this.#name,
      type_name: this.#type ?? null,
    };
  }

  toC(ctx: WriterContext): string {
    const type = this.Type;
    if (!type)
      throw new WriterError(
        this.Location,
        "For now, we require function argument types in all places"
      );
    return `${type.toC(ctx)} ${this.#name}`;
  }
}

import {
  Component,
  FunctionEntity,
  StoreStatement,
  StructEntity,
  Visitor,
} from "#compiler/ast";
import { PatternMatch } from "../pattern-match";

const name_chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export class NameFlatteningVisitor extends Visitor {
  #index: number = -1;

  #get_name() {
    let name = "";
    let current = this.#index;

    while (current >= 0) {
      name += name_chars[current];
      current -= name_chars.length;
    }

    this.#index += 1;
    return name;
  }

  constructor() {
    super();
  }

  get OperatesOn(): (new (...args: any[]) => Component)[] {
    return [FunctionEntity, StructEntity, StoreStatement];
  }

  Visit(target: Component) {
    return PatternMatch(FunctionEntity, StructEntity, StoreStatement)(
      (func) => ({
        result: new FunctionEntity(
          func.Location,
          func.Exported,
          this.#get_name(),
          func.Parameters,
          func.Returns,
          func.Content
        ) as Component,
        cleanup: () => {},
      }),
      (struct) => ({
        result: new StructEntity(
          struct.Location,
          struct.Exported,
          this.#get_name(),
          struct.Properties
        ),
        cleanup: () => {},
      }),
      (store) => ({
        result: new StoreStatement(
          store.Location,
          this.#get_name(),
          store.Equals,
          store.Type
        ),
        cleanup: () => {},
      })
    )(target);
  }
}

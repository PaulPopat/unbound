import {
  Component,
  FunctionEntity,
  StoreStatement,
  StructEntity,
  Visitor,
} from "#compiler/ast";
import { Namer } from "#compiler/location";
import { PatternMatch } from "../pattern-match";

export class NameFlatteningVisitor extends Visitor {
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
          Namer.GetName(),
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
          Namer.GetName(),
          struct.Properties
        ),
        cleanup: () => {},
      }),
      (store) => ({
        result: new StoreStatement(
          store.Location,
          Namer.GetName(),
          store.Equals,
          store.Type
        ),
        cleanup: () => {},
      })
    )(target);
  }
}

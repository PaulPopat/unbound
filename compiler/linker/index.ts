import {
  Ast,
  Component,
  ComponentGroup,
  FunctionEntity,
  Namespace,
} from "@compiler/ast";
import { Linked } from "./linked";

function LinkSymbol(ast: Ast<Namespace>, symbol: Component): Array<Linked> {}

export function LinkUnbound(ast: Ast<Namespace>): Array<Linked> {
  for (const namespace of ast.iterator()) {
    if (namespace.Name === "App") {
      for (const func of namespace.Contents.iterator()) {
        if (!(func instanceof FunctionEntity) || func.Name !== "main") continue;

        return LinkSymbol(ast, func);
      }
    }

    if (namespace.Exported) {
      const result = [];
      for (const func of namespace.Contents.iterator()) {
        if (!(func instanceof FunctionEntity) || !func.Exported) continue;

        result.push(...LinkSymbol(ast, func));
      }

      return result;
    }
  }

  throw new Error('Could not find')
}

export { Linked };

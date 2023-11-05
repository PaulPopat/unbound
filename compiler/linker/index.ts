import { Ast, Component, FunctionEntity, Namespace } from "@compiler/ast";
import { Linked } from "./linked";

function LinkSymbol(ast: Ast<Namespace>, symbol: Component): Linked {}

export function* LinkUnbound(ast: Ast<Namespace>): Generator<Linked> {
  for (const namespace of ast.iterator())
    if (namespace.Name === "App")
      for (const func of namespace.Contents.iterator())
        if (!(func instanceof FunctionEntity) || func.Name !== "main") continue;
        else yield LinkSymbol(ast, func);
    else if (namespace.Exported)
      for (const func of namespace.Contents.iterator())
        if (!(func instanceof FunctionEntity) || !func.Exported) continue;
        else yield LinkSymbol(ast, func);
}

export { Linked };

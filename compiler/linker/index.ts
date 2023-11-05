import { Ast, Component } from "@compiler/ast";
import { FunctionCollectingVisitor } from "./visitor/function-collecting-visitor";
import { TypeCollectingVisitor } from "./visitor/type-collecting-visitor";
import { ReferenceExpressionVisitor } from "./visitor/reference-expression-visitor";
import { ReferenceTypeVisitor } from "./visitor/reference-type-visitor";

export function LinkUnbound(ast: Ast<Component>) {
  const function_collector = new FunctionCollectingVisitor();
  const type_collector = new TypeCollectingVisitor();

  return ast
    .visited(function_collector)
    .visited(type_collector)
    .visited(new ReferenceExpressionVisitor(function_collector.Functions))
    .visited(new ReferenceTypeVisitor(type_collector.Types));
}

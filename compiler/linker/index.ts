import { Ast, Component } from "#compiler/ast";
import { FunctionCollectingVisitor } from "./visitor/function-collecting-visitor";
import { TypeNameIndexingVisitor } from "./visitor/type-name-indexing-visitor";
import { ReferenceExpressionVisitor } from "./visitor/reference-expression-visitor";
import { ReferenceTypeVisitor } from "./visitor/reference-type-visitor";
import { FunctionFlatteningVisitor } from "./visitor/function-flattening-visitor";
import { StoreTypeVisitor } from "./visitor/store-type-visitor";
import { NameFlatteningVisitor } from "./visitor/name-flattening-visitor";

export function LinkUnbound(ast: Ast) {
  const function_collector = new FunctionCollectingVisitor();
  const type_collector = new TypeNameIndexingVisitor();

  return ast
    .visited(function_collector)
    .visited(type_collector)
    .visited(new ReferenceExpressionVisitor(function_collector.Functions))
    .visited(new ReferenceTypeVisitor(type_collector.Types))
    .visited(new FunctionFlatteningVisitor(function_collector.Functions))
    .visited(new StoreTypeVisitor(type_collector.Types))
    .visited(new NameFlatteningVisitor());
}

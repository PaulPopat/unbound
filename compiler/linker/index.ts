import { Ast, ComponentGroup } from "#compiler/ast";
import { FunctionCollectingVisitor } from "./visitor/function-collecting-visitor";
import { TypeNameIndexingVisitor } from "./visitor/type-name-indexing-visitor";
import { ReferenceExpressionVisitor } from "./visitor/reference-expression-visitor";
import { ReferenceTypeVisitor } from "./visitor/reference-type-visitor";
import { FunctionFlatteningVisitor } from "./visitor/function-flattening-visitor";
import { StoreTypeVisitor } from "./visitor/store-type-visitor";
import { NameFlatteningVisitor } from "./visitor/name-flattening-visitor";
import { PartialInvokationVisitor } from "./visitor/partial-invokation-visitor";
import { LambdaVisitor } from "./visitor/lambda-visitor";

export function LinkUnbound(ast: Ast) {
  const function_collector = new FunctionCollectingVisitor();
  const type_collector = new TypeNameIndexingVisitor();

  ast = ast
    .visited(function_collector)
    .visited(type_collector)
    .visited(new ReferenceExpressionVisitor(function_collector.Functions))
    .visited(new ReferenceTypeVisitor(type_collector.Types))
    .visited(new FunctionFlatteningVisitor(function_collector.Functions))
    .visited(new StoreTypeVisitor(type_collector.Types))
    .visited(new NameFlatteningVisitor())
    .visited(new PartialInvokationVisitor());

  const lambda_visitor = new LambdaVisitor(function_collector.Functions);

  ast = ast.visited(lambda_visitor);

  return new Ast(
    new ComponentGroup(...ast.iterator(), lambda_visitor.Namespace)
  );
}

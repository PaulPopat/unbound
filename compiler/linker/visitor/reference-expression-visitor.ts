import {
  Component,
  FunctionEntity,
  FunctionParameter,
  LambdaExpression,
  MakeExpression,
  Namespace,
  ReferenceExpression,
  StoreStatement,
  Type,
  UsingEntity,
  Visitor,
} from "@compiler/ast";

export class ReferenceExpressionVisitor extends Visitor {
  #functions: Record<string, FunctionEntity> = {};
  #parameters: Record<string, FunctionParameter<Type>> = {};
  #locals: Array<Record<string, StoreStatement>> = [];

  get OperatesOn(): (new (...args: any[]) => Component)[] {
    return [
      UsingEntity,
      FunctionEntity,
      LambdaExpression,
      StoreStatement,
      Namespace,
      ReferenceExpression,
      MakeExpression,
    ];
  }

  Visit(target: Component) {
    if (target instanceof Namespace)
      return {
        result: undefined,
        cleanup: () => {
          this.#functions = {};
          this.#parameters = {};
        },
      };

    throw new Error("Component is not a recognised type");
  }
}

import {
  Component,
  ExternalFunctionDeclaration,
  FunctionEntity,
  ReferenceExpression,
} from "#compiler/ast";
import { LinkerError } from "../error";
import { ReferenceCollectorVisitor } from "./reference-collector-visitor";

export class ReferenceExpressionVisitor extends ReferenceCollectorVisitor {
  constructor(
    functions: Record<string, FunctionEntity | ExternalFunctionDeclaration>
  ) {
    super(functions);
  }

  get OperatesOn(): (new (...args: any[]) => Component)[] {
    return [...super.OperatesOn, ReferenceExpression];
  }

  Visit(target: Component) {
    if (target instanceof ReferenceExpression) {
      const map = this.find(target.Name);
      if (!map) {
        throw new LinkerError(
          target.Location,
          `Could not resolve symbol ${target.Name}`
        );
      }

      return {
        result: new ReferenceExpression(target.Location, target.Name, map),
        cleanup: () => {},
      };
    }

    return super.Visit(target);
  }
}

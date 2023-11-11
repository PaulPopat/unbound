import {
  Component,
  ComponentGroup,
  FunctionEntity,
  FunctionParameter,
  InvokationExpression,
  LambdaExpression,
  ReferenceExpression,
  Visitor,
} from "#compiler/ast";
import { LinkerError } from "../error";
import { PatternMatch } from "../pattern-match";
import { ResolveExpression } from "./expression";

export class PartialInvokationVisitor extends Visitor {
  constructor() {
    super();
  }

  get OperatesOn(): (new (...args: any[]) => Component)[] {
    return [InvokationExpression];
  }

  Visit(target: Component) {
    return PatternMatch(InvokationExpression)((invoke) => {
      const functione = ResolveExpression(invoke.Subject);
      if (!(functione instanceof FunctionEntity))
        return {
          result: undefined,
          cleanup: () => {},
        };

      if (invoke.Parameters.Length === functione.Parameters.Length)
        return {
          result: undefined,
          cleanup: () => {},
        };

      let parameters: Array<FunctionParameter> = [];
      let index = 0;
      for (const parameter of functione.Parameters.iterator()) {
        if (!(parameter instanceof FunctionParameter))
          throw new LinkerError(
            parameter.Location,
            "Invalid function parameter"
          );
        if (functione.Parameters.Length - index > invoke.Parameters.Length) {
          parameters.push(parameter);
        }

        index++;
      }

      return {
        result: new LambdaExpression(
          invoke.Location,
          new ComponentGroup(...parameters),
          new InvokationExpression(
            invoke.Location,
            new ReferenceExpression(invoke.Location, functione.Name, functione),
            new ComponentGroup(
              ...parameters.map(
                (p) => new ReferenceExpression(invoke.Location, p.Name, p)
              ),
              ...invoke.Parameters.iterator()
            )
          )
        ),
        cleanup: () => {},
      };
    })(target);
  }
}

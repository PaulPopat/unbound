import {
  Component,
  ComponentGroup,
  ComponentStore,
  InvokationExpression,
  LambdaExpression,
  ReturnStatement,
  StoreStatement,
  StructEntity,
} from "#compiler/ast";
import { PatternMatch } from "#compiler/location";
import { ContextBuildingVisitor } from "./context-building-visitor";
import { ResolveExpression } from "./expression";

export class LambdaVisitor extends ContextBuildingVisitor {
  get OperatesOn(): (new (...args: any[]) => Component)[] {
    return [...super.OperatesOn, InvokationExpression, LambdaExpression];
  }

  Visit(target: Component): {
    result: Component | undefined;
    cleanup: () => void;
  } {
    return PatternMatch(InvokationExpression, LambdaExpression, Component)(
      (invoke) => {
        const store = ResolveExpression(invoke.Subject);
        if (!(store instanceof StoreStatement))
          return {
            result: undefined,
            cleanup: () => {},
          };

        const stored = store.Type;
        if (!(stored instanceof StructEntity))
          return {
            result: undefined,
            cleanup: () => {},
          };

        const func = this.FindExecutors(stored);

        return {
          result: this.BuildInvokation(invoke.Location, store, stored, func, [
            ...invoke.Parameters.iterator(),
          ]),
          cleanup: () => {},
        };
      },
      (lambda) => {
        const input = this.BuildContext(
          lambda.Location,
          lambda.Parameters,
          ResolveExpression(lambda.Expression),
          new ComponentGroup(
            new ReturnStatement(
              lambda.Location,
              ComponentStore.Visit(lambda.Expression, this)
            )
          )
        );

        return {
          result: input.make,
          cleanup: () => {},
        };
      },
      super.Visit.bind(this)
    )(target);
  }
}

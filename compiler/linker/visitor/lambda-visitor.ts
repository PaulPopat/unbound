import {
  AccessExpression,
  AssignStatement,
  Component,
  ComponentGroup,
  CountExpression,
  FunctionEntity,
  FunctionParameter,
  InvokationExpression,
  IterateExpression,
  LambdaExpression,
  MakeExpression,
  Namespace,
  PrimitiveType,
  Property,
  ReferenceExpression,
  ReferenceType,
  ReturnStatement,
  StoreStatement,
  StructEntity,
  Visitor,
} from "#compiler/ast";
import { Location, Namer } from "#compiler/location";
import { LinkerError } from "../error";
import { PatternMatch } from "../pattern-match";
import { ResolveExpression } from "./expression";
import { ReferenceNameIndexingVisitor } from "./reference-name-indexing-visitor";

export class LambdaVisitor extends ReferenceNameIndexingVisitor {
  #lambdas: Array<{ func: FunctionEntity; struct: StructEntity }> = [];

  get Namespace() {
    return new Namespace(
      new Location("lambdas", -1, -1, -1, -1),
      false,
      "__CompiledLambdas",
      new ComponentGroup(...this.#lambdas.flatMap((l) => [l.struct, l.func]))
    );
  }

  #get_lambda(subject: StructEntity) {
    for (const { func, struct } of this.#lambdas)
      if (struct === subject) return func;

    throw new LinkerError(subject.Location, "Could not find lambda");
  }

  get OperatesOn(): (new (...args: any[]) => Component)[] {
    return [...super.OperatesOn, InvokationExpression, LambdaExpression];
  }

  Visit(target: Component) {
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

        const func = this.#get_lambda(stored);

        return {
          result: new InvokationExpression(
            invoke.Location,
            new ReferenceExpression(invoke.Location, func.Name, func),
            new ComponentGroup(
              ...[...stored.Properties.iterator()].map((p) => {
                if (!(p instanceof Property))
                  throw new LinkerError(p.Location, "Invalid property type");
                return new AccessExpression(
                  p.Location,
                  new ReferenceExpression(p.Location, stored.Name, store),
                  p.Name
                );
              }),
              ...invoke.Parameters.iterator()
            )
          ),
          cleanup: () => {},
        };
      },
      (lambda) => {
        const ensure = (subject: Component | undefined) => {
          if (!subject)
            throw new LinkerError(lambda.Location, "Missing property");

          return subject;
        };

        const input = {
          func: new FunctionEntity(
            lambda.Location,
            false,
            Namer.GetName(),
            new ComponentGroup(
              ...this.locals.map(([n, v]) =>
                PatternMatch(
                  StoreStatement,
                  CountExpression,
                  IterateExpression,
                  FunctionParameter
                )(
                  (store) =>
                    new FunctionParameter(
                      store.Location,
                      n,
                      ensure(store.Type)
                    ),
                  (count) =>
                    new FunctionParameter(
                      count.Location,
                      n,
                      new PrimitiveType(count.Location, "int")
                    ),
                  (iterate) =>
                    new FunctionParameter(
                      iterate.Location,
                      n,
                      ResolveExpression(iterate.Over)
                    ),
                  (parameter) =>
                    new FunctionParameter(
                      parameter.Location,
                      n,
                      ensure(parameter.Type)
                    )
                )(v)
              ),
              ...lambda.Parameters.iterator()
            ),
            ResolveExpression(lambda.Expression),
            new ComponentGroup(
              new ReturnStatement(lambda.Location, lambda.Expression)
            )
          ),
          struct: new StructEntity(
            lambda.Location,
            false,
            Namer.GetName(),
            new ComponentGroup(
              ...this.locals.map(([n, v]) =>
                PatternMatch(
                  StoreStatement,
                  CountExpression,
                  IterateExpression,
                  FunctionParameter
                )(
                  (store) =>
                    new Property(store.Location, n, ensure(store.Type)),
                  (count) =>
                    new Property(
                      count.Location,
                      n,
                      new PrimitiveType(count.Location, "int")
                    ),
                  (iterate) =>
                    new Property(
                      iterate.Location,
                      n,
                      ResolveExpression(iterate.Over)
                    ),
                  (parameter) =>
                    new Property(parameter.Location, n, ensure(parameter.Type))
                )(v)
              )
            )
          ),
        };

        this.#lambdas.push(input);

        return {
          result: new MakeExpression(
            lambda.Location,
            input.struct.Name,
            new ComponentGroup(
              ...this.locals.map(
                ([n, v]) =>
                  new AssignStatement(
                    v.Location,
                    n,
                    new ReferenceExpression(lambda.Location, n, v)
                  )
              )
            ),
            input.struct
          ),
          cleanup: () => {},
        };
      },
      super.Visit.bind(this)
    )(target);
  }
}

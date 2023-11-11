import {
  AccessExpression,
  AssignStatement,
  Component,
  ComponentGroup,
  ComponentStore,
  CountExpression,
  FunctionParameter,
  FunctionType,
  InvokationExpression,
  LambdaExpression,
  LiteralExpression,
  MakeExpression,
  Namespace,
  OperatorExpression,
  PrimitiveType,
  Property,
  ReferenceExpression,
  ReturnStatement,
  StoreStatement,
  StructEntity,
  Visitor,
} from "#compiler/ast";
import { Location, Namer } from "#compiler/location";
import { LinkerError } from "../error";
import { ResolveBlock, ResolveExpression } from "./resolve";

const EmptyLocation = new Location("generated", -1, -1, -1, -1);

class CountStoreVisitor extends Visitor {
  readonly #loop: CountExpression;
  readonly #target: FunctionParameter;

  constructor(loop: CountExpression, target: FunctionParameter) {
    super();
    this.#loop = loop;
    this.#target = target;
  }

  get OperatesOn() {
    return [ReferenceExpression];
  }

  Visit(target: Component) {
    if (target instanceof ReferenceExpression) {
      if (target.References !== this.#loop)
        return { result: undefined, cleanup: () => {} };

      return {
        result: new ReferenceExpression(
          target.Location,
          target.Name,
          this.#target
        ),
        cleanup: () => {},
      };
    }

    throw new LinkerError(
      target.Location,
      "Component is not a recognised type"
    );
  }
}

export class CountExpressionVisitor extends Visitor {
  #data: Array<StructEntity> = [];

  get Namespace() {
    return new Namespace(
      EmptyLocation,
      false,
      "__Compiled__Code__",
      new ComponentGroup(...this.#data)
    );
  }

  get OperatesOn(): (new (...args: any[]) => Component)[] {
    return [CountExpression];
  }

  Visit(target: Component) {
    if (target instanceof CountExpression) {
      const ctx = new StructEntity(
        target.Location,
        false,
        Namer.GetName(),
        new ComponentGroup(
          new Property(
            target.Location,
            "ctx",
            new PrimitiveType(target.Location, "int")
          ),
          new Property(target.Location, "result", ResolveBlock(target.Body)),
          new Property(
            target.Location,
            "continue",
            new PrimitiveType(target.Location, "bool")
          )
        )
      );

      this.#data.push(ctx);

      const main = new StructEntity(
        target.Location,
        false,
        Namer.GetName(),
        new ComponentGroup(
          new Property(
            target.Location,
            "next",
            new FunctionType(
              target.Location,
              new ComponentGroup(
                new FunctionParameter(target.Location, "ctx", ctx)
              ),
              ResolveBlock(target.Body)
            )
          ),
          new Property(
            target.Location,
            "init",
            new FunctionType(
              target.Location,
              new ComponentGroup(),
              ResolveBlock(target.Body)
            )
          )
        )
      );

      this.#data.push(main);

      const ctx_parameter = new FunctionParameter(
        target.Location,
        Namer.GetName(),
        ctx
      );

      const main_parameter = new FunctionParameter(
        target.Location,
        target.As,
        new PrimitiveType(target.Location, "int")
      );

      const parameter_visitor = new CountStoreVisitor(target, main_parameter);

      const main_lambda = new LambdaExpression(
        target.Location,
        new ComponentGroup(main_parameter),
        new ComponentGroup(
          ...[...target.Body.iterator()].map((b) =>
            ComponentStore.Visit(b, parameter_visitor)
          )
        )
      );

      const main_store = new StoreStatement(
        target.Location,
        Namer.GetName(),
        main_lambda,
        ResolveExpression(main_lambda)
      );

      return {
        result: new MakeExpression(
          target.Location,
          main.Name,
          new ComponentGroup(
            new AssignStatement(
              target.Location,
              "next",
              new LambdaExpression(
                target.Location,
                new ComponentGroup(ctx_parameter),
                new ComponentGroup(
                  main_store,
                  new ReturnStatement(
                    target.Location,
                    new MakeExpression(
                      target.Location,
                      ctx.Name,
                      new ComponentGroup(
                        new AssignStatement(
                          target.Location,
                          "ctx",
                          new OperatorExpression(
                            target.Location,
                            new AccessExpression(
                              target.Location,
                              new ReferenceExpression(
                                target.Location,
                                ctx_parameter.Name,
                                ctx_parameter
                              ),
                              "ctx"
                            ),
                            "+",
                            new LiteralExpression(target.Location, "int", "1i")
                          )
                        ),
                        new AssignStatement(
                          target.Location,
                          "result",
                          new InvokationExpression(
                            target.Location,
                            new ReferenceExpression(
                              target.Location,
                              main_store.Name,
                              main_store
                            ),
                            new ComponentGroup(
                              new AccessExpression(
                                target.Location,
                                new ReferenceExpression(
                                  target.Location,
                                  ctx_parameter.Name,
                                  ctx_parameter
                                ),
                                "ctx"
                              )
                            )
                          )
                        ),
                        new AssignStatement(
                          target.Location,
                          "continue",
                          new OperatorExpression(
                            target.Location,
                            new AccessExpression(
                              target.Location,
                              new ReferenceExpression(
                                target.Location,
                                ctx_parameter.Name,
                                ctx_parameter
                              ),
                              "ctx"
                            ),
                            "<",
                            new ReferenceExpression(
                              target.Location,
                              "target",
                              target.To
                            )
                          )
                        )
                      ),
                      ctx
                    )
                  )
                )
              )
            ),
            new AssignStatement(
              target.Location,
              "init",
              new LambdaExpression(
                target.Location,
                new ComponentGroup(),
                new ComponentGroup(
                  main_store,
                  new ReturnStatement(
                    target.Location,
                    new MakeExpression(
                      target.Location,
                      ctx.Name,
                      new ComponentGroup(
                        new AssignStatement(
                          target.Location,
                          "ctx",
                          new LiteralExpression(target.Location, "int", "1i")
                        ),
                        new AssignStatement(
                          target.Location,
                          "result",
                          new InvokationExpression(
                            target.Location,
                            new ReferenceExpression(
                              target.Location,
                              main_store.Name,
                              main_store
                            ),
                            new ComponentGroup()
                          )
                        ),
                        new AssignStatement(
                          target.Location,
                          "continue",
                          new OperatorExpression(
                            target.Location,
                            new LiteralExpression(target.Location, "int", "1i"),
                            "<",
                            new ReferenceExpression(
                              target.Location,
                              "target",
                              target.To
                            )
                          )
                        )
                      ),
                      ctx
                    )
                  )
                )
              )
            )
          ),
          main
        ),
        cleanup: () => {},
      };
    }

    throw new LinkerError(
      target.Location,
      "Component is not a recognised type"
    );
  }
}

import {
  AccessExpression,
  AssignStatement,
  Component,
  ComponentGroup,
  ComponentStore,
  FunctionParameter,
  FunctionType,
  InvokationExpression,
  IterateExpression,
  LambdaExpression,
  MakeExpression,
  Namespace,
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

class IterateStoreVisitor extends Visitor {
  readonly #loop: IterateExpression;
  readonly #target: FunctionParameter;

  constructor(loop: IterateExpression, target: FunctionParameter) {
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

export class IterateExpressionVisitor extends Visitor {
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
    return [IterateExpression];
  }

  Visit(target: Component) {
    if (target instanceof IterateExpression) {
      const store = ResolveExpression(target.Over);
      if (
        !(store instanceof StoreStatement) &&
        !(store instanceof FunctionParameter)
      )
        return {
          result: undefined,
          cleanup: () => {},
        };

      const stored = store.Type;
      if (!stored)
        return {
          result: undefined,
          cleanup: () => {},
        };

      const ctx = new StructEntity(
        target.Location,
        false,
        Namer.GetName(),
        new ComponentGroup(
          new Property(target.Location, "ctx", stored),
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
              ctx
            )
          ),
          new Property(
            target.Location,
            "init",
            new FunctionType(target.Location, new ComponentGroup(), ctx)
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
        stored
      );

      const parameter_visitor = new IterateStoreVisitor(target, main_parameter);

      const main_block = new ComponentGroup(
        ...[...target.Body.iterator()].map((b) =>
          ComponentStore.Visit(b, parameter_visitor)
        )
      );

      const main_store = new StoreStatement(
        target.Location,
        Namer.GetName(),
        new LambdaExpression(
          target.Location,
          new ComponentGroup(main_parameter),
          main_block
        ),
        ResolveBlock(main_block)
      );

      const next_invokation = new InvokationExpression(
        target.Location,
        new AccessExpression(target.Location, stored, "next"),
        new ComponentGroup(
          new AccessExpression(target.Location, ctx_parameter, "ctx")
        )
      );

      const next_result = new StoreStatement(
        target.Location,
        Namer.GetName(),
        next_invokation,
        ResolveExpression(next_invokation)
      );

      const init_invokation = new InvokationExpression(
        target.Location,
        new AccessExpression(target.Location, stored, "init"),
        new ComponentGroup()
      );

      const init_result = new StoreStatement(
        target.Location,
        Namer.GetName(),
        init_invokation,
        ResolveExpression(init_invokation)
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
                  next_result,
                  new ReturnStatement(
                    target.Location,
                    new MakeExpression(
                      target.Location,
                      ctx.Name,
                      new ComponentGroup(
                        new AssignStatement(
                          target.Location,
                          "ctx",
                          new AccessExpression(
                            target.Location,
                            new ReferenceExpression(
                              target.Location,
                              next_result.Name,
                              next_result
                            ),
                            "ctx"
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
                                  next_result.Name,
                                  next_result
                                ),
                                "ctx"
                              )
                            )
                          )
                        ),
                        new AssignStatement(
                          target.Location,
                          "continue",
                          new AccessExpression(
                            target.Location,
                            new ReferenceExpression(
                              target.Location,
                              next_result.Name,
                              next_result
                            ),
                            "continue"
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
                  init_result,
                  new ReturnStatement(
                    target.Location,
                    new MakeExpression(
                      target.Location,
                      ctx.Name,
                      new ComponentGroup(
                        new AssignStatement(
                          target.Location,
                          "ctx",
                          new AccessExpression(
                            target.Location,
                            new ReferenceExpression(
                              target.Location,
                              init_result.Name,
                              init_result
                            ),
                            "ctx"
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
                                  init_result.Name,
                                  init_result
                                ),
                                "ctx"
                              )
                            )
                          )
                        ),
                        new AssignStatement(
                          target.Location,
                          "continue",
                          new AccessExpression(
                            target.Location,
                            new ReferenceExpression(
                              target.Location,
                              init_result.Name,
                              init_result
                            ),
                            "continue"
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

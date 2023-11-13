import {
  AssignStatement,
  Component,
  ComponentGroup,
  ComponentStore,
  CountExpression,
  FunctionParameter,
  LambdaExpression,
  LiteralExpression,
  MakeExpression,
  Namespace,
  NextExpression,
  OperatorExpression,
  PrimitiveType,
  ReferenceExpression,
  ReturnStatement,
  StoreStatement,
  StructEntity,
  Visitor,
} from "#compiler/ast";
import { Location, Namer } from "#compiler/location";
import { LinkerError } from "../error";
import { IteratorStruct } from "./utils";

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
    return [ReferenceExpression, NextExpression];
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
      const returns = new PrimitiveType(target.Location, "int");
      const { main, after_init, main_function_type, init_function_type } =
        IteratorStruct(returns);

      this.#data.push(main);
      this.#data.push(after_init);

      const main_store_name = Namer.GetName();

      const target_store = new StoreStatement(
        target.Location,
        Namer.GetName(),
        target.To
      );

      const main_store_reference = new ReferenceExpression(
        target.Location,
        main_store_name
      );

      const main_store_parameter = new FunctionParameter(
        returns.Location,
        "ctx",
        returns
      );

      const main_store = new StoreStatement(
        target.Location,
        main_store_name,
        new LambdaExpression(
          target.Location,
          new ComponentGroup(main_store_parameter),
          new ComponentGroup(
            new ReturnStatement(
              target.Location,
              new MakeExpression(
                target.Location,
                main.Name,
                new ComponentGroup(
                  new AssignStatement(
                    target.Location,
                    "done",
                    new OperatorExpression(
                      target.Location,
                      new OperatorExpression(
                        target.Location,
                        new ReferenceExpression(
                          target.Location,
                          target_store.Name,
                          target_store
                        ),
                        "+",
                        new LiteralExpression(target.Location, "int", "1i")
                      ),
                      "==",
                      new ReferenceExpression(
                        target.Location,
                        main_store_parameter.Name,
                        main_store_parameter
                      )
                    )
                  ),
                  new AssignStatement(
                    target.Location,
                    "next",
                    main_store_reference
                  ),
                  new AssignStatement(
                    target.Location,
                    "result",
                    new OperatorExpression(
                      target.Location,
                      new ReferenceExpression(
                        target.Location,
                        target_store.Name,
                        target_store
                      ),
                      "+",
                      new LiteralExpression(target.Location, "int", "1i")
                    )
                  )
                ),
                main
              )
            )
          )
        ),
        main_function_type
      );

      ComponentStore.Replace(
        main_store_reference,
        new ReferenceExpression(target.Location, main_store_name, main_store)
      );

      return {
        result: new LambdaExpression(
          target.Location,
          new ComponentGroup(),
          new ComponentGroup(
            target_store,
            main_store,
            new ReturnStatement(
              target.Location,
              new MakeExpression(
                target.Location,
                after_init.Name,
                new ComponentGroup(
                  new AssignStatement(
                    target.Location,
                    "done",
                    new OperatorExpression(
                      target_store.Location,
                      target_store,
                      "==",
                      new LiteralExpression(target.Location, "int", "0i")
                    )
                  ),
                  new AssignStatement(
                    target.Location,
                    "next",
                    new ReferenceExpression(
                      target.Location,
                      main_store.Name,
                      main_store
                    )
                  )
                ),
                after_init
              )
            )
          )
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

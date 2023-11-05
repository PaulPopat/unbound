import {
  Component,
  CountExpression,
  ExternalFunctionDeclaration,
  FunctionEntity,
  FunctionParameter,
  IfExpression,
  IterateExpression,
  LinkedReferenceExpression,
  MakeExpression,
  Namespace,
  ReferenceExpression,
  StoreStatement,
  Type,
  UsingEntity,
  Visitor,
} from "@compiler/ast";
import { LinkerError } from "../error";

export class ReferenceExpressionVisitor extends Visitor {
  readonly #functions: Record<
    string,
    FunctionEntity | ExternalFunctionDeclaration
  >;
  #namespace: string = "";
  #using: Array<string> = [];
  #parameters: Record<string, FunctionParameter<Type>> = {};
  #locals: Array<Record<string, StoreStatement>> = [];

  constructor(functions: Record<string, FunctionEntity>) {
    super();
    this.#functions = functions;
  }

  #find(name: string) {
    for (const layer of this.#locals) if (layer[name]) return layer[name];

    if (this.#parameters[name]) return this.#parameters[name];

    for (const area of this.#using) {
      const full = `${area}.${name}`;
      const possible = this.#functions[full];
      if (!possible) continue;

      if (
        area === this.#namespace ||
        possible instanceof ExternalFunctionDeclaration
      )
        return possible;

      if (possible.Exported) return possible;
    }

    return undefined;
  }

  #add_local(name: string, statement: StoreStatement) {
    this.#locals[this.#locals.length - 1][name] = statement;
  }

  #drop() {
    this.#locals = this.#locals.slice(0, this.#locals.length - 1);
  }

  #raise() {
    this.#locals = [...this.#locals, {}];
  }

  get OperatesOn(): (new (...args: any[]) => Component)[] {
    return [
      Namespace,
      UsingEntity,
      FunctionEntity,
      StoreStatement,
      MakeExpression,
      IfExpression,
      CountExpression,
      IterateExpression,
      ReferenceExpression,
    ];
  }

  Visit(target: Component) {
    if (target instanceof Namespace) {
      this.#namespace = target.Name;
      this.#using = [target.Name];
      return {
        result: undefined,
        cleanup: () => {
          this.#using = [];
          this.#parameters = {};
          this.#locals = [];
          this.#namespace = "";
        },
      };
    } else if (target instanceof UsingEntity) {
      this.#using = [...this.#using, target.Name];
      return {
        result: undefined,
        cleanup: () => {},
      };
    } else if (target instanceof FunctionEntity) {
      this.#parameters = [...target.Parameters.iterator()]
        .map((p) => {
          if (!p.Type)
            throw new LinkerError(
              p.Location,
              "Top level functions must have parameter types"
            );

          return [p.Name, p] as const;
        })
        .reduce(
          (c, [n, t]) => ({ ...c, [n]: t }),
          {} as Record<string, FunctionParameter<Type>>
        );

      return {
        result: undefined,
        cleanup: () => {
          this.#parameters = {};
          this.#locals = [];
        },
      };
    } else if (target instanceof StoreStatement) {
      this.#add_local(target.Name, target);
    } else if (
      target instanceof IfExpression ||
      target instanceof CountExpression ||
      target instanceof IterateExpression
    ) {
      this.#raise();
      return {
        result: undefined,
        cleanup: () => this.#drop(),
      };
    } else if (target instanceof ReferenceExpression) {
      const map = this.#find(target.Name);
      if (!map)
        throw new LinkerError(
          target.Location,
          `Could not resolve symbol ${target.Name}`
        );

      return {
        result: new LinkedReferenceExpression(
          target.Location,
          target.Name,
          map
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

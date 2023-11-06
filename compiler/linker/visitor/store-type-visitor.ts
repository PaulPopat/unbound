import {
  AccessExpression,
  BracketsExpression,
  Component,
  CountExpression,
  Expression,
  FunctionEntity,
  FunctionType,
  IfExpression,
  InvokationExpression,
  IsExpression,
  IterableType,
  IterateExpression,
  LambdaExpression,
  LiteralExpression,
  MakeExpression,
  NextExpression,
  OperatorExpression,
  PrimitiveType,
  ReferenceExpression,
  ReturnStatement,
  SchemaEntity,
  StoreStatement,
  StructEntity,
  Type,
} from "@compiler/ast";
import { TypeCollectorVisitor } from "./type-collector-visitor";
import { PatternMatch } from "../pattern-match";
import { LinkerError } from "../error";

export class StoreTypeVisitor extends TypeCollectorVisitor {
  constructor(types: Record<string, StructEntity | SchemaEntity>) {
    super(types);
  }

  get OperatesOn(): (new (...args: any[]) => Component)[] {
    return [...super.OperatesOn, StoreStatement];
  }

  #resolve_expression(expression: Expression): Type | StructEntity {
    return PatternMatch(
      LiteralExpression,
      NextExpression,
      OperatorExpression,
      IfExpression,
      CountExpression,
      IterateExpression,
      MakeExpression,
      IsExpression,
      ReferenceExpression,
      BracketsExpression,
      LambdaExpression,
      InvokationExpression,
      AccessExpression
    )(
      (literal): Type | StructEntity => {
        if (literal.Type === "string") {
          return new IterableType(
            literal.Location,
            new PrimitiveType(literal.Location, "char")
          );
        }

        return new PrimitiveType(
          literal.Location,
          literal.Type === "char"
            ? "char"
            : literal.Type === "double"
            ? "double"
            : literal.Type === "float"
            ? "float"
            : literal.Type === "int"
            ? "int"
            : literal.Type === "long"
            ? "long"
            : literal.Type === "bool"
            ? "bool"
            : "any"
        );
      },
      (next) => {
        return new PrimitiveType(next.Location, "any");
      },
      (operator) => {
        return this.#resolve_expression(operator.Right);
      },
      (if_) => {
        for (const statement of if_.If.iterator())
          if (statement instanceof ReturnStatement)
            return this.#resolve_expression(statement.Value);

        throw new LinkerError(
          if_.Location,
          "If statements must have a return value"
        );
      },
      (count) => {
        for (const statement of count.Body.iterator())
          if (statement instanceof ReturnStatement)
            return this.#resolve_expression(statement.Value);

        throw new LinkerError(count.Location, "Loops must have a return value");
      },
      (iterate) => {
        for (const statement of iterate.Body.iterator())
          if (statement instanceof ReturnStatement)
            return this.#resolve_expression(statement.Value);

        throw new LinkerError(
          iterate.Location,
          "Loops must have a return value"
        );
      },
      (make) => {
        const entity = make.StructEntity;
        if (!entity)
          throw new LinkerError(make.Location, "Could not resolve struct");
        return entity;
      },
      (is) => {
        return new PrimitiveType(is.Location, "bool");
      },
      (reference) => {
        if (!reference.References)
          throw new LinkerError(reference.Location, "Unresolved reference");

        return reference.References;
      },
      (bracket) => {
        return this.#resolve_expression(bracket.Expression);
      },
      (lambda) => {
        return new FunctionType(
          lambda.Location,
          lambda.Parameters,
          this.#resolve_expression(lambda.Expression)
        );
      },
      (invoke) => {
        const subject = this.#resolve_expression(invoke.Subject);

        if (subject instanceof FunctionEntity) {
          const result = subject.Returns;

          if (!result)
            throw new LinkerError(
              invoke.Location,
              "Functions must currently return a type. Inference to come."
            );

          return result;
        }

        if (subject instanceof FunctionType) {
          return subject.Returns;
        }

        if (subject instanceof LambdaExpression) {
          return this.#resolve_expression(subject.Expression);
        }

        throw new Error("Attempting to invoke a none function");
      },
      (access) => {
        const references = this.#resolve_expression(access.Subject);

        if (!(references instanceof StructEntity))
          throw new LinkerError(
            access.Location,
            "Attempting to access a none struct"
          );

        const property = references.GetKey(access.Target);
        if (!property)
          throw new LinkerError(access.Location, "Target has no key");

        return property.Type;
      }
    )(expression);
  }

  Visit(target: Component) {
    if (target instanceof StoreStatement) {
      return {
        result: new StoreStatement(
          target.Location,
          target.Name,
          target.Equals,
          this.#resolve_expression(target.Equals)
        ),
        cleanup: () => {},
      };
    }

    return super.Visit(target);
  }
}

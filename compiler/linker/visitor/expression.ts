import {
  Expression,
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
  AccessExpression,
  StructEntity,
  FunctionEntity,
  ReturnStatement,
  Type,
  IterableType,
  PrimitiveType,
  FunctionType,
} from "#compiler/ast";
import { PatternMatch } from "#compiler/location";
import { LinkerError } from "../error";

export function ResolveExpression(
  expression: Expression
): Type | StructEntity | FunctionEntity {
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
      return ResolveExpression(operator.Right);
    },
    (if_) => {
      for (const statement of if_.If.iterator())
        if (statement instanceof ReturnStatement)
          return ResolveExpression(statement.Value);

      throw new LinkerError(
        if_.Location,
        "If statements must have a return value"
      );
    },
    (count) => {
      for (const statement of count.Body.iterator())
        if (statement instanceof ReturnStatement)
          return ResolveExpression(statement.Value);

      throw new LinkerError(count.Location, "Loops must have a return value");
    },
    (iterate) => {
      for (const statement of iterate.Body.iterator())
        if (statement instanceof ReturnStatement)
          return ResolveExpression(statement.Value);

      throw new LinkerError(iterate.Location, "Loops must have a return value");
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
      return ResolveExpression(bracket.Expression);
    },
    (lambda) => {
      return new FunctionType(
        lambda.Location,
        lambda.Parameters,
        ResolveExpression(lambda.Expression)
      );
    },
    (invoke) => {
      const subject = ResolveExpression(invoke.Subject);

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
        return ResolveExpression(subject.Expression);
      }

      throw new Error("Attempting to invoke a none function");
    },
    (access) => {
      const references = ResolveExpression(access.Subject);

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

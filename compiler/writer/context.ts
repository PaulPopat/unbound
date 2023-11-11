import {
  Component,
  CountExpression,
  Expression,
  IfExpression,
  LiteralExpression,
  NextExpression,
  OperatorExpression,
} from "#compiler/ast";
import { PatternMatch } from "../location/pattern-match";

export abstract class Variable {
  readonly #input: Component;

  constructor(input: Component) {
    this.#input = input;
  }

  get Component() {
    return this.#input;
  }

  abstract Create(): string;

  abstract Free(): string;
}

export abstract class Closure {
  add(input: Variable) {}
}

export class ExpressionClosure {
  readonly #input: Expression;

  constructor(input: Expression) {
    this.#input = input;
  }

  toString() {
    return PatternMatch(
      LiteralExpression,
      NextExpression,
      OperatorExpression,
      IfExpression,
      CountExpression
    );
  }
}

import { Component, ComponentGroup } from "./base";
import { FunctionParameter } from "./property";
import { Type } from "./type";
import { Location } from "@location";

export class Expression extends Component {}

export type LiteralType = "string" | "raw_int";

export class LiteralExpression extends Expression {
  readonly #type: LiteralType;
  readonly #value: string;

  constructor(ctx: Location, type: LiteralType, value: string) {
    super(ctx);
    this.#type = type;
    this.#value = value;
  }
}

export const Operators = ["+", "-"] as const;
export type Operator = (typeof Operators)[number];

export class OperatorExpression extends Expression {
  readonly #left: Expression;
  readonly #operator: Operator;
  readonly #right: Expression;

  constructor(
    ctx: Location,
    left: Expression,
    operator: Operator,
    right: Expression
  ) {
    super(ctx);
    this.#left = left;
    this.#operator = operator;
    this.#right = right;
  }
}

export class IfExpression<TStatement extends Component> extends Expression {
  readonly #check: Expression;
  readonly #if: ComponentGroup<TStatement>;
  readonly #else: ComponentGroup<TStatement>;

  constructor(
    ctx: Location,
    check: Expression,
    on_if: ComponentGroup<TStatement>,
    on_else: ComponentGroup<TStatement>
  ) {
    super(ctx);
    this.#check = check;
    this.#if = on_if;
    this.#else = on_else;
  }
}

export class CountExpression<TStatement extends Component> extends Expression {
  readonly #to: Expression;
  readonly #as: string;
  readonly #using: ComponentGroup<TStatement>;

  constructor(
    ctx: Location,
    to: Expression,
    as: string,
    using: ComponentGroup<TStatement>
  ) {
    super(ctx);
    this.#to = to;
    this.#as = as;
    this.#using = using;
  }
}

export class IterateExpression<
  TStatement extends Component
> extends Expression {
  readonly #over: Expression;
  readonly #as: string;
  readonly #using: ComponentGroup<TStatement>;

  constructor(
    ctx: Location,
    over: Expression,
    as: string,
    using: ComponentGroup<TStatement>
  ) {
    super(ctx);
    this.#over = over;
    this.#as = as;
    this.#using = using;
  }
}

export class MakeExpression<TStatement extends Component> extends Expression {
  readonly #struct: string;
  readonly #using: ComponentGroup<TStatement>;

  constructor(
    ctx: Location,
    struct: string,
    using: ComponentGroup<TStatement>
  ) {
    super(ctx);
    this.#struct = struct;
    this.#using = using;
  }
}

export class IsExpression extends Expression {
  readonly #left: Expression;
  readonly #right: Type;

  constructor(ctx: Location, left: Expression, right: Type) {
    super(ctx);
    this.#left = left;
    this.#right = right;
  }
}

export class ReferenceExpression extends Expression {
  readonly #name: string;

  constructor(ctx: Location, name: string) {
    super(ctx);
    this.#name = name;
  }
}

export class BracketsExpression extends Expression {
  readonly #expression: Expression;

  constructor(ctx: Location, expression: Expression) {
    super(ctx);
    this.#expression = expression;
  }
}

export class LambdaExpression extends Expression {
  readonly #parameters: ComponentGroup<FunctionParameter<Type>>;
  readonly #expression: Expression;

  constructor(
    ctx: Location,
    parameters: ComponentGroup<FunctionParameter<Type>>,
    expression: Expression
  ) {
    super(ctx);
    this.#parameters = parameters;
    this.#expression = expression;
  }
}

export class InvokationExpression extends Expression {
  readonly #expression: Expression;
  readonly #parameters: ComponentGroup<Expression>;

  constructor(
    ctx: Location,
    expression: Expression,
    parameters: ComponentGroup<Expression>
  ) {
    super(ctx);
    this.#expression = expression;
    this.#parameters = parameters;
  }
}

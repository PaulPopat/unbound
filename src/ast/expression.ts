import { Component, ComponentGroup } from "./base";
import { FunctionParameter } from "./property";
import { Type } from "./type";
import { Location } from "@location";

export abstract class Expression extends Component {}

export type LiteralType = "string" | "int" | "char" | "float" | "double";

export class LiteralExpression extends Expression {
  readonly #type: LiteralType;
  readonly #value: string;

  constructor(ctx: Location, type: LiteralType, value: string) {
    super(ctx);
    this.#type = type;
    this.#value = value;
  }

  get type_name() {
    return "literal_expression";
  }

  get extra_json() {
    return {
      type: this.#type,
      value: this.#value,
    };
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

  get type_name() {
    return "operator_expression";
  }

  get extra_json() {
    return {
      left: this.#left.json,
      operator: this.#operator,
      right: this.#right.json,
    };
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

  get type_name() {
    return "if_expression";
  }

  get extra_json() {
    return {
      check: this.#check.json,
      if: this.#if.json,
      else: this.#else.json,
    };
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

  get type_name() {
    return "count_expression";
  }

  get extra_json() {
    return {
      to: this.#to.json,
      as: this.#as,
      using: this.#using.json,
    };
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

  get type_name() {
    return "iterate_expression";
  }

  get extra_json() {
    return {
      over: this.#over.json,
      as: this.#as,
      using: this.#using.json,
    };
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

  get type_name() {
    return "make_expression";
  }

  get extra_json() {
    return {
      struct: this.#struct,
      using: this.#using.json,
    };
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

  get type_name() {
    return "is_expression";
  }

  get extra_json() {
    return {
      left: this.#left.json,
      right: this.#right.json,
    };
  }
}

export class ReferenceExpression extends Expression {
  readonly #name: string;

  constructor(ctx: Location, name: string) {
    super(ctx);
    this.#name = name;
  }

  get type_name() {
    return "reference_expression";
  }

  get extra_json() {
    return {
      name: this.#name,
    };
  }
}

export class BracketsExpression extends Expression {
  readonly #expression: Expression;

  constructor(ctx: Location, expression: Expression) {
    super(ctx);
    this.#expression = expression;
  }

  get type_name() {
    return "brackets_expression";
  }

  get extra_json() {
    return {
      expression: this.#expression.json,
    };
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

  get type_name() {
    return "lambda_expression";
  }

  get extra_json() {
    return {
      parameters: this.#parameters.json,
      expression: this.#expression.json,
    };
  }
}

export class InvokationExpression extends Expression {
  readonly #subject: Expression;
  readonly #parameters: ComponentGroup<Expression>;

  constructor(
    ctx: Location,
    subject: Expression,
    parameters: ComponentGroup<Expression>
  ) {
    super(ctx);
    this.#subject = subject;
    this.#parameters = parameters;
  }

  get type_name() {
    return "invokation_expression";
  }

  get extra_json() {
    return {
      subject: this.#subject.json,
      parameters: this.#parameters.json,
    };
  }
}

export class AccessExpression extends Expression {
  readonly #subject: Expression;
  readonly #target: string;

  constructor(ctx: Location, subject: Expression, target: string) {
    super(ctx);
    this.#subject = subject;
    this.#target = target;
  }

  get type_name() {
    return "invokation_expression";
  }

  get extra_json() {
    return {
      subject: this.#subject.json,
      target: this.#target,
    };
  }
}

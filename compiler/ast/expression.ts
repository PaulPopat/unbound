import {
  ExternalFunctionDeclaration,
  FunctionEntity,
  Statement,
  StoreStatement,
  StructEntity,
} from ".";
import { Component, ComponentGroup, Visitor } from "./base";
import { FunctionParameter } from "./property";
import { Type } from "./type";
import { Location } from "@compiler/location";

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
      type_name: this.#type,
      value: this.#value,
    };
  }

  inner_visited(visitor: Visitor): Component {
    return new LiteralExpression(this.Location, this.#type, this.#value);
  }
}

export class NextExpression extends Expression {
  constructor(ctx: Location) {
    super(ctx);
  }

  get type_name() {
    return "next_expression";
  }

  get extra_json() {
    return {};
  }

  inner_visited(visitor: Visitor): Component {
    return new NextExpression(this.Location);
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

  inner_visited(visitor: Visitor): Component {
    return new OperatorExpression(
      this.Location,
      this.#left.type_safe_visited(Expression, visitor),
      this.#operator,
      this.#right.type_safe_visited(Expression, visitor)
    );
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

  inner_visited(visitor: Visitor): Component {
    return new IfExpression(
      this.Location,
      this.#check.type_safe_visited(Expression, visitor),
      this.#if.visited(visitor),
      this.#else.visited(visitor)
    );
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

  get As() {
    return this.#as;
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

  inner_visited(visitor: Visitor): Component {
    return new CountExpression(
      this.Location,
      this.#to.type_safe_visited(Expression, visitor),
      this.#as,
      this.#using.visited(visitor)
    );
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

  get As() {
    return this.#as;
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

  inner_visited(visitor: Visitor): Component {
    return new IterateExpression(
      this.Location,
      this.#over.type_safe_visited(Expression, visitor),
      this.#as,
      this.#using.visited(visitor)
    );
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

  inner_visited(visitor: Visitor): Component {
    return new MakeExpression(
      this.Location,
      this.#struct,
      this.#using.visited(visitor)
    );
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

  inner_visited(visitor: Visitor): Component {
    return new IsExpression(
      this.Location,
      this.#left.type_safe_visited(Expression, visitor),
      this.#right.type_safe_visited(Type, visitor)
    );
  }
}

export class ReferenceExpression extends Expression {
  readonly #name: string;

  constructor(ctx: Location, name: string) {
    super(ctx);
    this.#name = name;
  }

  get Name() {
    return this.#name;
  }

  get type_name() {
    return "reference_expression";
  }

  get extra_json() {
    return {
      name: this.#name,
    };
  }

  inner_visited(visitor: Visitor): Component {
    return new ReferenceExpression(this.Location, this.#name);
  }
}

type PossibleReferences =
  | StoreStatement
  | StructEntity
  | FunctionEntity
  | FunctionParameter<Type>
  | ExternalFunctionDeclaration
  | CountExpression<Statement>
  | IterateExpression<Statement>;

export class LinkedReferenceExpression extends Expression {
  readonly #name: string;
  readonly #references: PossibleReferences;

  constructor(ctx: Location, name: string, references: PossibleReferences) {
    super(ctx);
    this.#name = name;
    this.#references = references;
  }

  get type_name() {
    return "linked_reference_expression";
  }

  get extra_json() {
    return {
      name: this.#name,
      references: this.#references.json,
    };
  }

  inner_visited(visitor: Visitor): Component {
    return new LinkedReferenceExpression(
      this.Location,
      this.#name,
      this.#references
    );
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

  inner_visited(visitor: Visitor): Component {
    return new BracketsExpression(
      this.Location,
      this.#expression.type_safe_visited(Expression, visitor)
    );
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

  inner_visited(visitor: Visitor): Component {
    return new LambdaExpression(
      this.Location,
      this.#parameters.type_safe_visited(FunctionParameter<Type>, visitor),
      this.#expression.type_safe_visited(Expression, visitor)
    );
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

  inner_visited(visitor: Visitor): Component {
    return new InvokationExpression(
      this.Location,
      this.#subject.type_safe_visited(Expression, visitor),
      this.#parameters.type_safe_visited(Expression, visitor)
    );
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
    return "access_expression";
  }

  get extra_json() {
    return {
      subject: this.#subject.json,
      target: this.#target,
    };
  }

  inner_visited(visitor: Visitor): Component {
    return new AccessExpression(
      this.Location,
      this.#subject.type_safe_visited(Expression, visitor),
      this.#target
    );
  }
}

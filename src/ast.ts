type ComponentContext = {
  line: number;
  column: number;
};

export abstract class Component {
  readonly #line_number: number;
  readonly #column_number: number;

  constructor(ctx: ComponentContext) {
    this.#line_number = ctx.line;
    this.#column_number = ctx.column;
  }

  get LineNumber() {
    return this.#line_number;
  }

  get ColumnNumber() {
    return this.#column_number;
  }
}

export class ComponentGroup<TComponent extends Component> {
  readonly #components: Array<TComponent>;

  constructor(...components: Array<TComponent>) {
    this.#components = components;
  }
}

export abstract class Type extends Component {}

export class SchemaType extends Type {
  readonly #name: string;
  readonly #properties: ComponentGroup<Property>;

  constructor(
    ctx: ComponentContext,
    name: string,
    properties: ComponentGroup<Property>
  ) {
    super(ctx);
    this.#name = name;
    this.#properties = properties;
  }

  get Name() {
    return this.#name;
  }
}

export class ReferenceType extends Type {
  readonly #name: string;

  constructor(ctx: ComponentContext, name: string) {
    super(ctx);
    this.#name = name;
  }

  get Name() {
    return this.#name;
  }
}

export class IterableType extends Type {
  readonly #type: Type;

  constructor(ctx: ComponentContext, type: Type) {
    super(ctx);
    this.#type = type;
  }
}

export class FunctionType extends Type {
  readonly #parameters: ComponentGroup<FunctionParameter>;
  readonly #returns: Type;

  constructor(
    ctx: ComponentContext,
    parameters: ComponentGroup<FunctionParameter>,
    returns: Type
  ) {
    super(ctx);
    this.#parameters = parameters;
    this.#returns = returns;
  }
}

export class UseType extends Type {
  readonly #name: string;
  readonly #constraints: ComponentGroup<Type>;

  constructor(
    ctx: ComponentContext,
    name: string,
    constraints: ComponentGroup<Type>
  ) {
    super(ctx);
    this.#name = name;
    this.#constraints = constraints;
  }

  get Name() {
    return this.#name;
  }
}

export class FunctionParameter extends Component {
  readonly #name: string;
  readonly #type: Type | undefined;

  constructor(ctx: ComponentContext, name: string, type: Type | undefined) {
    super(ctx);
    this.#name = name;
    this.#type = type;
  }

  get Name() {
    return this.#name;
  }

  get Type() {
    return this.#type;
  }
}

export class Expression extends Component {}

export type Operator = "+" | "-";

export class OperatorExpression extends Expression {
  readonly #left: Expression;
  readonly #operator: Operator;
  readonly #right: Expression;

  constructor(
    ctx: ComponentContext,
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

export class IfExpression extends Expression {
  readonly #check: Expression;
  readonly #if: ComponentGroup<Statement>;
  readonly #else: ComponentGroup<Statement>;

  constructor(
    ctx: ComponentContext,
    check: Expression,
    on_if: ComponentGroup<Statement>,
    on_else: ComponentGroup<Statement>
  ) {
    super(ctx);
    this.#check = check;
    this.#if = on_if;
    this.#else = on_else;
  }
}

export class CountExpression extends Expression {
  readonly #to: Expression;
  readonly #as: string;
  readonly #using: ComponentGroup<Statement>;

  constructor(
    ctx: ComponentContext,
    to: Expression,
    as: string,
    using: ComponentGroup<Statement>
  ) {
    super(ctx);
    this.#to = to;
    this.#as = as;
    this.#using = using;
  }
}

export class IterateExpression extends Expression {
  readonly #over: Expression;
  readonly #as: string;
  readonly #using: ComponentGroup<Statement>;

  constructor(
    ctx: ComponentContext,
    over: Expression,
    as: string,
    using: ComponentGroup<Statement>
  ) {
    super(ctx);
    this.#over = over;
    this.#as = as;
    this.#using = using;
  }
}

export class MakeExpression extends Expression {
  readonly #struct: string;
  readonly #using: ComponentGroup<Statement>;

  constructor(
    ctx: ComponentContext,
    struct: string,
    using: ComponentGroup<Statement>
  ) {
    super(ctx);
    this.#struct = struct;
    this.#using = using;
  }
}

export class IsExpression extends Expression {
  readonly #left: Expression;
  readonly #right: Type;

  constructor(ctx: ComponentContext, left: Expression, right: Type) {
    super(ctx);
    this.#left = left;
    this.#right = right;
  }
}

export class ReferenceExpression extends Expression {
  readonly #name: string;

  constructor(ctx: ComponentContext, name: string) {
    super(ctx);
    this.#name = name;
  }
}

export class BracketsExpression extends Expression {
  readonly #expression: Expression;

  constructor(ctx: ComponentContext, expression: Expression) {
    super(ctx);
    this.#expression = expression;
  }
}

export class LambdaExpression extends Expression {
  readonly #parameters: ComponentGroup<FunctionParameter>;
  readonly #expression: Expression;

  constructor(
    ctx: ComponentContext,
    parameters: ComponentGroup<FunctionParameter>,
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
    ctx: ComponentContext,
    expression: Expression,
    parameters: ComponentGroup<FunctionParameter>
  ) {
    super(ctx);
    this.#expression = expression;
    this.#parameters = parameters;
  }
}

export class Statement extends Component {}

export class StoreStatement extends Statement {
  readonly #name: string;
  readonly #equals: Expression;

  constructor(ctx: ComponentContext, name: string, equals: Expression) {
    super(ctx);
    this.#name = name;
    this.#equals = equals;
  }

  get Name() {
    return this.#name;
  }
}

export class ReturnStatement extends Statement {
  readonly #value: Expression;

  constructor(ctx: ComponentContext, value: Expression) {
    super(ctx);
    this.#value = value;
  }
}

export class AssignStatement extends Statement {
  readonly #name: string;
  readonly #equals: Expression;

  constructor(ctx: ComponentContext, name: string, equals: Expression) {
    super(ctx);
    this.#name = name;
    this.#equals = equals;
  }

  get Name() {
    return this.#name;
  }
}

export abstract class Entity extends Component {}

export class Function extends Entity {
  readonly #name: string;
  readonly #parameters: ComponentGroup<FunctionParameter>;
  readonly #returns: Type | undefined;

  constructor(
    ctx: ComponentContext,
    name: string,
    parameters: ComponentGroup<FunctionParameter>,
    returns: Type | undefined
  ) {
    super(ctx);
    this.#name = name;
    this.#parameters = parameters;
    this.#returns = returns;
  }

  get Name() {
    return this.#name;
  }
}

export class Property extends Component {
  readonly #name: string;
  readonly #type: Type;

  constructor(ctx: ComponentContext, name: string, type: Type) {
    super(ctx);
    this.#name = name;
    this.#type = type;
  }

  get Name() {
    return this.#name;
  }

  get Type() {
    return this.#type;
  }
}

export class Struct extends Entity {
  readonly #name: string;
  readonly #properties: ComponentGroup<Property>;

  constructor(
    ctx: ComponentContext,
    name: string,
    properties: ComponentGroup<Property>
  ) {
    super(ctx);
    this.#name = name;
    this.#properties = properties;
  }

  get Name() {
    return this.#name;
  }
}

export class Schema extends Entity {
  readonly #name: string;
  readonly #properties: ComponentGroup<Property>;

  constructor(
    ctx: ComponentContext,
    name: string,
    properties: ComponentGroup<Property>
  ) {
    super(ctx);
    this.#name = name;
    this.#properties = properties;
  }

  get Name() {
    return this.#name;
  }
}

export class Using extends Entity {
  readonly #name: string;

  constructor(ctx: ComponentContext, name: string) {
    super(ctx);
    this.#name = name;
  }

  get Name() {
    return this.#name;
  }
}

export class Namespace extends Component {
  readonly #name: string;
  readonly #contents: ComponentGroup<Entity>;

  constructor(
    ctx: ComponentContext,
    name: string,
    contents: ComponentGroup<Entity>
  ) {
    super(ctx);
    this.#name = name;
    this.#contents = contents;
  }

  get Name() {
    return this.#name;
  }

  get Contents() {
    return this.#contents;
  }
}

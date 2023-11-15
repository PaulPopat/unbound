import { Component, ComponentGroup } from "./base";
import { Type } from "./type";
import { Location } from "#compiler/location";
export declare abstract class Expression extends Component {
}
export type LiteralType = "string" | "int" | "char" | "float" | "double" | "long" | "bool";
export declare class LiteralExpression extends Expression {
    #private;
    constructor(ctx: Location, type: LiteralType, value: string);
    get Type(): LiteralType;
    get Value(): string;
    get type_name(): string;
    get extra_json(): {
        type_name: LiteralType;
        value: string;
    };
}
export declare class NextExpression extends Expression {
    constructor(ctx: Location);
    get type_name(): string;
    get extra_json(): {};
}
export declare const Operators: readonly ["+", "-", "/", "*", "==", "!=", "<", ">", "<=", ">="];
export type Operator = (typeof Operators)[number];
export declare class OperatorExpression extends Expression {
    #private;
    constructor(ctx: Location, left: Expression, operator: Operator, right: Expression);
    get Left(): Component;
    get Operator(): "+" | "-" | "/" | "*" | "==" | "!=" | "<" | ">" | "<=" | ">=";
    get Right(): Component;
    get type_name(): string;
    get extra_json(): {
        left: number;
        operator: "+" | "-" | "/" | "*" | "==" | "!=" | "<" | ">" | "<=" | ">=";
        right: number;
    };
}
export declare class IfExpression<TStatement extends Component> extends Expression {
    #private;
    constructor(ctx: Location, check: Expression, on_if: ComponentGroup, on_else: ComponentGroup);
    get Check(): Component;
    get If(): ComponentGroup;
    get Else(): ComponentGroup;
    get type_name(): string;
    get extra_json(): {
        check: number;
        if: number[];
        else: number[];
    };
}
export declare class CountExpression extends Expression {
    #private;
    constructor(ctx: Location, to: Expression, as: string, using: ComponentGroup);
    get To(): Component;
    get As(): string;
    get Body(): ComponentGroup;
    get type_name(): string;
    get extra_json(): {
        to: number;
        as: string;
        using: number[];
    };
}
export declare class IterateExpression extends Expression {
    #private;
    constructor(ctx: Location, over: Expression, as: string, using: ComponentGroup);
    get Over(): Component;
    get As(): string;
    get Body(): ComponentGroup;
    get type_name(): string;
    get extra_json(): {
        over: number;
        as: string;
        using: number[];
    };
}
export declare class MakeExpression extends Expression {
    #private;
    constructor(ctx: Location, struct: string, using: ComponentGroup, struct_entity?: Component);
    get Struct(): string;
    get Using(): ComponentGroup;
    get StructEntity(): Component | undefined;
    get type_name(): string;
    get extra_json(): {
        struct: string;
        using: number[];
    };
}
export declare class IsExpression extends Expression {
    #private;
    constructor(ctx: Location, left: Expression, right: Type);
    get Left(): Component;
    get Right(): Component;
    get type_name(): string;
    get extra_json(): {
        left: number;
        right: number;
    };
}
export declare class ReferenceExpression extends Expression {
    #private;
    constructor(ctx: Location, name: string, references?: Component);
    get Name(): string;
    get References(): Component | undefined;
    get type_name(): string;
    get extra_json(): {
        name: string;
        references: number | undefined;
    };
}
export declare class BracketsExpression extends Expression {
    #private;
    constructor(ctx: Location, expression: Expression);
    get Expression(): Component;
    get type_name(): string;
    get extra_json(): {
        expression: number;
    };
}
export declare class LambdaExpression extends Expression {
    #private;
    constructor(ctx: Location, parameters: ComponentGroup, expression: Expression);
    get Parameters(): ComponentGroup;
    get Expression(): Component;
    get type_name(): string;
    get extra_json(): {
        parameters: number[];
        expression: number;
    };
}
export declare class InvokationExpression extends Expression {
    #private;
    constructor(ctx: Location, subject: Expression, parameters: ComponentGroup);
    get Subject(): Component;
    get Parameters(): ComponentGroup;
    get type_name(): string;
    get extra_json(): {
        subject: number;
        parameters: number[];
    };
}
export declare class AccessExpression extends Expression {
    #private;
    constructor(ctx: Location, subject: Expression, target: string);
    get Subject(): Component;
    get Target(): string;
    get type_name(): string;
    get extra_json(): {
        subject: number;
        target: string;
    };
}
//# sourceMappingURL=expression.d.ts.map
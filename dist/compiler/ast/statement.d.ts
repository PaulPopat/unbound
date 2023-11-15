import { Location } from "#compiler/location";
import { Component } from "./base";
import { Expression } from "./expression";
import { Type } from "./type";
export declare abstract class Statement extends Component {
}
export declare class StoreStatement extends Statement {
    #private;
    constructor(ctx: Location, name: string, equals: Expression, type?: Type);
    get Name(): string;
    get Equals(): Component;
    get Type(): Component | undefined;
    get type_name(): string;
    get extra_json(): {
        name: string;
        equals: number;
        store_type: number | undefined;
    };
}
export declare class ReturnStatement extends Statement {
    #private;
    constructor(ctx: Location, value: Expression);
    get Value(): Component;
    get type_name(): string;
    get extra_json(): {
        value: number;
    };
}
export declare class AssignStatement extends Statement {
    #private;
    constructor(ctx: Location, name: string, equals: Expression);
    get Name(): string;
    get Equals(): Component;
    get type_name(): string;
    get extra_json(): {
        name: string;
        equals: number;
    };
}
export declare class PanicStatement extends Statement {
    #private;
    constructor(ctx: Location, value: Expression);
    get Value(): Component;
    get type_name(): string;
    get extra_json(): {
        value: number;
    };
}
//# sourceMappingURL=statement.d.ts.map